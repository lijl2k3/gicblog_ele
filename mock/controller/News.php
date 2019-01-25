<?php

namespace app\api\controller;

class News extends Common
{

    public $datas;

    /*------------------ 接口方法 -------------------*/

    /**
     * [体验活动详情获取]
     * @return [json]       [返回获取成功或失败信息及数据]
     */
    public function details(){
        $this->datas=$this->params;
        if(!isset($this->datas['id'])){
            $this->returnMsg(400,'Fail to find the record!','No record id');
        }
        $this->datas['deleted']=0;
        $res = db('news')->where($this->datas)->find();

        if (!empty($res)) {
            if(!empty($res['pic_path'])){
                $files=$this->listdir($res['pic_path']);
                if($files!=false){
                    $res['pics']=$files;
                }
            }
            $this->returnMsg(200, 'Succeed in searching the record!', 'Succeed in searching the record!',$res);
        } else {
            $this->returnMsg(400, 'Fail to search the record!', 'No record found');
        }
    }


    /**
     * [体验活动发布]
     * @post activity 各字段. 'images'为通过ajax上传的图片的路径集合，前端组合为字符串形式后传给后端，后端通过explode解析，
     * @return [json]       [返回发布成功或失败信息及活动id] 如果活动添加成功而图片集合没有添加成功，则返回code 201
     */
    public function addact(){
        $this->datas=$this->params;
        if(!isset($this->datas['user_id'])){
            $this->returnMsg(400,'添加活动记录失败！','用户id缺失');
        }
        if(!$this->findExistOne('user',['id'=>$this->datas['user_id'],'deleted'=>0,'leader'=>1])){
            $this->returnMsg(400,'添加活动记录失败！','未找到该用户或该用户不是引领者');
        }
        if(isset($this->datas['start_date'])&&!empty($this->datas['start_date'])){
            $this->datas['start_date']=strtotime($this->datas['start_date']);
        }
        if(isset($this->datas['end_date'])&&!empty($this->datas['end_date'])){
            $this->datas['end_date']=strtotime($this->datas['end_date']);
        }
        if(isset($this->datas['images'])&& !empty($this->datas['images'])){
            $images=explode(',',$this->datas['images']);
            unset($this->datas['images']);

        }

        $this->datas['published']=1;
        $this->datas['create_time']=$this->datas['update_time']=time();
        if($id=db('activity')->insertGetId($this->datas)){
            if($images){
                $arr=[];
                foreach ($images as $image){
                    $arr[]=['act_id'=>$id,'path'=>$image];
                }
                $affected=db('act_img')->insertAll($arr);
                if(!$affected){
                    $this->returnMsg(201, '添加图片失败', '添加活动记录成功，图片写入数据库失败',['id'=>$id]);
                }
            }
            $this->returnMsg(200, '添加活动记录成功！', '添加活动记录成功',['id'=>$id]);
        }else{
            $this->returnMsg(400, '添加活动记录失败！', '插入数据库失败');
        }
    }

    /**
     * [用户收藏的体验活动筛选]
     * @post fav_id(与activity表关联的activity_fav的fav_id,为该用户的id), [title,address,city_id,start_date,end_date,price, unit,user_id](activity 查询字段作为筛选条件）， [min_price, max_price](确定筛选的价格范围)
     * @return [json]       [返回查询成功或失败信息及查询记录集合]
     */
    public function favact(){
        $this->datas=$this->params;
        $this->setPageParam();
        if(!isset($this->datas['fav_id'])){
            $this->returnMsg(400,'查询用户收藏的体验活动失败！','用户id不存在！');
        }
        if(!$this->findExistOne('user',['id'=>$this->datas['fav_id'],'deleted'=>0])){
            $this->returnMsg(400,'查询用户收藏的体验活动失败！', '用户不存在！');
        }
        $fav_id=$this->datas['fav_id'];
        unset($this->datas['fav_id']);
        if(isset($this->datas['title'])&&!empty($this->datas['title'])){
            $this->datas['title']=['like','%'.$this->datas['title'].'%'];
        }
        if(isset($this->datas['address'])&&!empty($this->datas['address'])){
            $this->datas['address']=['like','%'.$this->datas['address'].'%'];
        }
        if(isset($this->datas['start_date'])&&!empty($this->datas['start_date'])){
            $this->datas['start_date']=['>=',strtotime($this->datas['start_date'])];
        }
        if(isset($this->datas['end_date'])&&!empty($this->datas['end_date'])){
            $this->datas['end_date']=['<=',strtotime($this->datas['end_date'])];
        }

        if(isset($this->datas['min_price'])&&!empty($this->datas['min_price'])){
            if(isset($this->datas['max_price'])&&!empty($this->datas['max_price'])){
                $this->datas['price']=['between',$this.datas['min_price'].','.$this->datas['max_price']];
                unset($this->datas['max_price']);
            }else{
                $this->datas['price']=['>=',$this->datas['min_price']];
            }
            unset($this->datas['min_price']);
        }
        elseif(isset($this->datas['max_price'])&&!empty($this->datas['max_price'])){
            $this->datas['price']=['<=',$this->datas['max_price']];
            unset($this->datas['max_price']);
        }


        if(isset($this->datas['user_id'])&&!empty($this->datas['user_id'])){
            $this->datas['a.user_id']=$this->datas['user_id'];
            unset($this->datas['user_id']);
        }
        $this->datas['published']=1;
        $this->datas['deleted']=0;
        $res=db('activity')->alias('a')->join('activity_fav f','a.id=f.act_id')->join('city c','a.city_id=c.id')->where('f.user_id',$fav_id)->where($this->datas)->limit($this->pagestart,$this->pagecount)->select();
        if(!empty($res)){
            $this->returnMsg(200,'查询用户收藏的体验活动成功！','查询用户收藏的体验活动成功！',$res);
        }else{
            $this->returnMsg(400,'查询用户收藏的体验活动失败！','没有查到任何记录！');
        }

    }


    /**
     * [活动体验详情信息]
     * @param get filter:筛选条件（'label':标签Id/'user':用户Id）, id:与筛选条件对应的id值)
     * @return [json]       [返回查询信息，code,title, msg, data:查询记录集合]
     */

    public function actlist($filter='all',$id=0)
    {
        $this->datas=$this->params;
        $this->setPageParam();
        $fields='a.id, a.title, a.intro, a.desc, a.file, a.address, c.city_name, a.start_date, a.end_date, a.persons, a.targetpersons, a.price, a.unit';
        switch($filter){
            case 'label':
                $res=db('activity')->alias('a')->join('activity_label l','a.id=l.act_id')->join('city c','a.city_id=c.id')->where(['l.label_id'=>$id, 'a.deleted'=>0, 'a.published'=>1])->field($fields)->limit($this->pagestart,$this->pagecount)->select();
                break;
            case 'user':
                $res=db('activity')->alias('a')->join('activity_fav f','a.id=f.act_id')->join('city c','a.city_id=c.id')->where(['f.user_id'=>$id, 'a.deleted'=>0, 'a.published'=>1])->field($fields)->limit($this->pagestart,$this->pagecount)->select();
                break;
            default:
                $res=db('activity')->alias('a')->join('city c','a.city_id=c.id')->where(['deleted'=>0,'published'=>1])->field($fields)->limit($this->pagestart,$this->pagecount)->select();
        }
        if($res){
            $this->returnMsg(200,'查询成功！','体验活动详情查询成功！',$res);
        }
        $this->returnMsg(400,'查询失败！','未找到体验活动详情记录！');
    }





}