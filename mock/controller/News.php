<?php

namespace app\index\controller;

use think\Session;

class News extends Common
{

    public $datas;

    /*------------------ 接口方法 -------------------*/

    /**
     * [体验活动详情获取]
     * @return [json]       [返回获取成功或失败信息及数据]
     */
    public function details($my=0){
        $this->datas=$this->params;

        if(!isset($this->datas['id'])){
            $this->returnMsg(400,'Fail to find the record!','No record id');
        }
        $map['id']=$this->datas['id'];
        $map['deleted']=0;
        $res = db('news')->where($map)->find();

        if (!empty($res)) {
            if($my==1){
                if(!$this->checkUser($res)){
                    $this->returnMsg(400,'User Identification Error','You have no right to edit this news!');
                }
            }
            if(!empty($res['pic_path'])){
                $pics=$this->listdir(ROOT_PATH . 'public' . DS . 'static' . DS . 'images' . DS .$res['pic_path']);
                if($pics!=false){
                    $res['pics']=$pics;
                }
            }

            if(!empty($res['file_path'])){
                $files=$this->listdir(ROOT_PATH . 'public' . DS . 'static' . DS . 'files' . DS .$res['file_path']);
                if($files!=false){
                    $res['files']=$files;
                }
            }
            $res['contents']=htmlspecialchars_decode($res['contents']);
            //$res['contents']=str_replace('""','\"');
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
    public function addnews(){
        $this->datas=$this->params;
        $this->datas['create_time']=$this->datas['update_time']=time();
        $this->datas['author_id']=Session::get('uid');
        if(!empty($this->datas['pics'])) {
            $pics = ($this->datas['pics']);
            $path=Session::get('uid') . '_' . $this->datas['create_time'];
            $pic_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'images' . DS . $path;
            mkdir($pic_path);
            mkdir($pic_path.DS.'thumb');
            $this->datas['pic_path']=$path;
            unset($this->datas['pics']);
            foreach ($pics as $pic) {
                $oldpic = ROOT_PATH . 'public' . DS . 'uploads' . DS . $pic['path'] . DS . $pic['name'];
                $oldpic=iconv('UTF-8','GB2312',$oldpic);
                $oldthumb = ROOT_PATH . 'public' . DS . 'thumbnail' . DS . $pic['path'] . DS . $pic['name'];
                $oldthumb=iconv('UTF-8','GB2312',$oldthumb);
                $newpic=$pic_path.DS.$pic['name'];
                $newthumb=$pic_path.DS.'thumb'.DS.$pic['name'];
                rename($oldpic,iconv("utf-8", "gb2312", $newpic));
                rename($oldthumb,iconv("utf-8", "gb2312", $newthumb));
            }
        }
        if(!empty($this->datas['files'])) {
            $files = ($this->datas['files']);
            $path=Session::get('uid') . '_' . $this->datas['create_time'];
            $file_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'files' . DS . $path;
            mkdir($file_path);
            mkdir($file_path.DS.'thumb');
            $this->datas['file_path']=$path;
            unset($this->datas['files']);
            foreach ($files as $file) {
                $oldfile = ROOT_PATH . 'public' . DS . 'uploads' . DS . $file['path'] . DS . $file['name'];
                $oldfile=iconv('UTF-8','GB2312',$oldfile);
                $newfile=$file_path.DS.$file['name'];
                rename($oldfile,iconv("utf-8", "gb2312", $newfile));
            }
        }
        if($id=db('news')->insertGetId($this->datas)){
            $this->returnMsg(200, 'succeed in add news', 'succeed in add news',['id'=>$id,'contents'=>$this->datas['contents']]);
        }else{
            $this->returnMsg(400, 'fail to add news', 'fail to insert to database');
        }
    }

    public function editnews(){
        $this->datas=$this->params;
        $id=$this->datas['id'];
        unset($this->datas['id']);
        $map['id']=$id;
        $map['deleted']=0;
        $news = db('news')->where($map)->find();
        if (!empty($news)) {
            if(!$this->checkUser($news)){
                $this->returnMsg(400,'User Identification Error','You have no right to edit this news!');
            }
        }else{
            $this->returnMsg(400,'fail to edit news','record not found!');
        }
        $this->datas['update_time']=time();
        if(!empty($this->datas['pics'])) {
            $pics = ($this->datas['pics']);
            if($news['pic_path']!=null) {
                $path = $news['pic_path'];
                $pic_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'images' . DS . $path;
            }else{
                $path=Session::get('uid') . '_' .time();
                $pic_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'images' . DS . $path;
                mkdir($pic_path);
                mkdir($pic_path.DS.'thumb');
                }
            $this->datas['pic_path']=$path;
            unset($this->datas['pics']);
            foreach ($pics as $pic) {
                $oldpic = ROOT_PATH . 'public' . DS . 'uploads' . DS . $pic['path'] . DS . $pic['name'];
                $oldpic=iconv('UTF-8','GB2312',$oldpic);
                $oldthumb = ROOT_PATH . 'public' . DS . 'thumbnail' . DS . $pic['path'] . DS . $pic['name'];
                $oldthumb=iconv('UTF-8','GB2312',$oldthumb);
                $newpic=$pic_path.DS.$pic['name'];
                $newthumb=$pic_path.DS.'thumb'.DS.$pic['name'];
                rename($oldpic,iconv("utf-8", "gb2312", $newpic));
                rename($oldthumb,iconv("utf-8", "gb2312", $newthumb));
            }
        }
        if(!empty($this->datas['hidePics'])){
            $oldpics=$this->datas['hidePics'];
            unset($this->datas['hidePics']);
            $pic_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'images' . DS . $news['pic_path'].DS;
            $thumb_path=ROOT_PATH . 'public' . DS . 'static' . DS . 'images' . DS . $news['pic_path'].DS.'thumb'.DS;
            foreach($oldpics as $pic){
                $oldpic=iconv('UTF-8','GB2312',$pic);
                unlink($pic_path.$oldpic);
                unlink($thumb_path.$oldpic);
            }
        }

        if(!empty($this->datas['files'])) {
            $files = ($this->datas['files']);
            if($news['file_path']!=null) {
                $path = $news['file_path'];
                $file_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'files' . DS . $path;
            }else{
                $path=Session::get('uid') . '_' .time();
                $file_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'files' . DS . $path;
                mkdir($file_path);
            }
            $this->datas['file_path']=$path;
            unset($this->datas['files']);
            foreach ($files as $file) {
                $oldfile = ROOT_PATH . 'public' . DS . 'uploads' . DS . $file['path'] . DS . $file['name'];
                $oldfile=iconv('UTF-8','GB2312',$oldfile);
                $newfile=$file_path.DS.$file['name'];
                rename($oldfile,iconv("utf-8", "gb2312", $newfile));
            }
        }
        if(!empty($this->datas['hideFiles'])){
            $oldfiles=$this->datas['hideFiles'];
            unset($this->datas['hideFiles']);
            $file_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'files' . DS . $news['file_path'].DS;
            foreach($oldfiles as $file){
                $oldfile=iconv('UTF-8','GB2312',$file);
                unlink($file_path.$oldfile);

            }
        }
        if($id=db('news')->where($map)->update(($this->datas))){
            $this->returnMsg(200, 'succeed in edit news', 'succeed in edit news');
        }else{
            $this->returnMsg(400, 'fail to edit news', 'fail to insert to database');
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

//    public function newslist($filter='all',$id=0)
//    {
//        $this->datas=$this->params;
//        $this->setPageParam();
//        $fields='a.id, a.title, a.intro, a.desc, a.file, a.address, c.city_name, a.start_date, a.end_date, a.persons, a.targetpersons, a.price, a.unit';
//        switch($filter){
//            case 'label':
//                $res=db('activity')->alias('a')->join('activity_label l','a.id=l.act_id')->join('city c','a.city_id=c.id')->where(['l.label_id'=>$id, 'a.deleted'=>0, 'a.published'=>1])->field($fields)->limit($this->pagestart,$this->pagecount)->select();
//                break;
//            case 'user':
//                $res=db('activity')->alias('a')->join('activity_fav f','a.id=f.act_id')->join('city c','a.city_id=c.id')->where(['f.user_id'=>$id, 'a.deleted'=>0, 'a.published'=>1])->field($fields)->limit($this->pagestart,$this->pagecount)->select();
//                break;
//            default:
//                $res=db('activity')->alias('a')->join('city c','a.city_id=c.id')->where(['deleted'=>0,'published'=>1])->field($fields)->limit($this->pagestart,$this->pagecount)->select();
//        }
//        if($res){
//            $this->returnMsg(200,'查询成功！','体验活动详情查询成功！',$res);
//        }
//        $this->returnMsg(400,'查询失败！','未找到体验活动详情记录！');
//    }

    public  function newslist($my=0){
        $this->datas=$this->params;
        $this->setPageParam();
        $map=[];
        if(isset($this->datas['author']) && !empty($this->datas['author'])){
            $map['u.uname']=[ 'like', "%".$this->datas['author']."%"];
        }
        if($my==1){
            $uid=Session::get('uid');
            if(!$uid){
                $this->returnMsg(400,'Fail to find records!','No User Id');
            }
            if(!$this->findExistOne('user',['id'=>$uid])){
                $this->returnMsg(400,'Fail to find records!','No User found');
            }else{
                $map['n.author_id']=['=',$uid];
                if(isset($map['u.uname'])){
                    unset($map['u.uname']);
                }
            }
        }
        if(isset($this->datas['title']) && !empty($this->datas['title'])){
            $map['n.title']=[ 'like', "%".$this->datas['title']."%"];
        }
        if(isset($this->datas['contents']) && !empty($this->datas['contents'])){
            $map['n.contents']=[ 'like', "%".$this->datas['contents']."%"];
        }
        if(isset($this->datas['startDate']) && !empty($this->datas['startDate'])){
            $start=1;
        }else{
            $start=0;
        }
        if(isset($this->datas['endDate']) && !empty($this->datas['endDate'])){
            $end=2;
        }else{
            $end=0;
        }
        $timecase=$start+$end;
        $map['n.deleted']=['=',0];
        $fields='n.id, n.title, n.create_time,u.uname';
        switch($timecase){
            case 0:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->limit($this->pagestart,$this->pagecount)->select();
                break;
            case 1:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->where('n.create_time','>=',strtotime($this->datas['startDate']))->limit($this->pagestart,$this->pagecount)->select();
                break;
            case 2:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->where('n.create_time','<=',strtotime($this->datas['endDate']))->limit($this->pagestart,$this->pagecount)->select();
                break;
            case 3:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->where('n.create_time','>=',strtotime($this->datas['startDate']))->where('n.create_time','<=',strtotime($this->datas['endDate']))->limit($this->pagestart,$this->pagecount)->select();
        }
        //$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->where($map)->field($fields)->limit($this->pagestart,$this->pagecount)->select();
        if($res){
           $this->returnMsg(200,'succeed in searching records','succeed in searching records！',$res);
        }
        $this->returnMsg(400,'fail to search record！','record not found！');
    }

    public  function total($my=0){
        $this->datas=$this->params;
        $map=[];
        if(isset($this->datas['author']) && !empty($this->datas['author'])){
            $map['u.uname']=[ 'like', "%".$this->datas['author']."%"];
        }
        if($my==1){
            $uid=Session::get('uid');
            if(!$uid){
                $this->returnMsg(400,'Fail to find records!','No User Id');
            }
            if(!$this->findExistOne('user',['id'=>$uid])){
                $this->returnMsg(400,'Fail to find records!','No User found');
            }else{
                $map['n.author_id']=['=',$uid];
                if(isset($map['u.uname'])){
                    unset($map['u.uname']);
                }
            }
        }
        if(isset($this->datas['title']) && !empty($this->datas['title'])){
            $map['n.title']=[ 'like', "%".$this->datas['title']."%"];
        }
        if(isset($this->datas['contents']) && !empty($this->datas['contents'])){
            $map['n.contents']=[ 'like', "%".$this->datas['contents']."%"];
        }
        if(isset($this->datas['startDate']) && !empty($this->datas['startDate'])){
           $start=1;
        }else{
            $start=0;
        }
        if(isset($this->datas['endDate']) && !empty($this->datas['endDate'])){
            $end=2;
        }else{
            $end=0;
        }
        $timecase=$start+$end;
        $map['n.deleted']=['=',0];
        switch($timecase){
            case 0:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->where($map)->count();
                break;
            case 1:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->where($map)->where('n.create_time','>=',strtotime($this->datas['startDate']))->count();
                break;
            case 2:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->where($map)->where('n.create_time','<=',strtotime($this->datas['endDate']))->count();
                break;
            case 3:$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->where($map)->where('n.create_time','>=',strtotime($this->datas['startDate']))->where('n.create_time','<=',strtotime($this->datas['endDate']))->count();
        }

        if($res){
            $this->returnMsg(200,'succeed in getting records count','succeed in getting records count',$res);
        }
        $this->returnMsg(400,'fail to get record count！','records not found！');
    }

    public function delete(){
        $this->datas=$this->params;
        if(!isset($this->datas['id']) | empty($this->datas['id'])){
            $this->returnMsg(400,'Delete fails','No Id found');
        }
        $id=$this->datas['id'];
        $res=db('news')->where('id',$id)->where('deleted',0)->find();
        if(!$res){
            $this->returnMsg(400,'Delete fails','No Record found');
        }
        if($this->checkUser($res)){
            if(db('news')->where('id',$id)->update(['deleted'=>1])) {
                $this->returnMsg(200, 'Delete succeed', 'Record Deleted');
            }
            $this->returnMsg(400,'Delete fails','Record not deleted in database');
        }else{
            $this->returnMsg(400,'User Identification Error','You have no right to edit this news!');
        }
    }







}