<?php

namespace app\index\controller;
use think\Session;

class Events extends Common
{
    public function addevents(){
        $this->datas=$this->params;
        $this->datas['create_time']=$this->datas['update_time']=time();
        $this->datas['author_id']=Session::get('uid');
        $this->datas['start_date']=strtotime($this->datas['start_date']);
        $this->datas['end_date']=strtotime($this->datas['end_date']);

        //test

//        if(!empty($this->datas['attendees'])){
//            $attendees=$this->datas['attendees'];
//            foreach($attendees as $one){
//                $arr[]=$one['pic'];
//            }
//            //$this->returnMsg(200, 'test in add events', 'test in add events',$arr);
//        }

        if(!empty($this->datas['attendees'])) {
            $attendees = ($this->datas['attendees']);
            $path=Session::get('uid') . '_' . $this->datas['create_time'];
            $pic_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'attendees' . DS . $path;
            mkdir($pic_path);
            mkdir($pic_path.DS.'thumb');
            $this->datas['pic_path']=$path;

            foreach ($attendees as $one) {
                $oldpic = ROOT_PATH . 'public' . DS . 'uploads' . DS . $one['pic']['path'] . DS . $one['pic']['name'];
                $oldpic=iconv('UTF-8','GB2312',$oldpic);
                $oldthumb = ROOT_PATH . 'public' . DS . 'thumbnail' . DS . $one['pic']['path'] . DS . $one['pic']['name'];
                $oldthumb=iconv('UTF-8','GB2312',$oldthumb);
                $newpic=$pic_path.DS.$one['pic']['name'];
                $newthumb=$pic_path.DS.'thumb'.DS.$one['pic']['name'];
                rename($oldpic,iconv("utf-8", "gb2312", $newpic));
                rename($oldthumb,iconv("utf-8", "gb2312", $newthumb));
            }
            $this->datas['attendees']=json_encode($this->datas['attendees']);
        }
//        if(!empty($this->datas['files'])) {
//            $files = ($this->datas['files']);
//            $path=Session::get('uid') . '_' . $this->datas['create_time'];
//            $file_path = ROOT_PATH . 'public' . DS . 'static' . DS . 'files' . DS . $path;
//            mkdir($file_path);
//            mkdir($file_path.DS.'thumb');
//            $this->datas['file_path']=$path;
//            unset($this->datas['files']);
//            foreach ($files as $file) {
//                $oldfile = ROOT_PATH . 'public' . DS . 'uploads' . DS . $file['path'] . DS . $file['name'];
//                $oldfile=iconv('UTF-8','GB2312',$oldfile);
//                $newfile=$file_path.DS.$file['name'];
//                rename($oldfile,iconv("utf-8", "gb2312", $newfile));
//            }
//        }
        if($id=db('events')->insertGetId($this->datas)){
            $this->returnMsg(200, 'succeed in add events', 'succeed in add events',['id'=>$id,'contents'=>$this->datas['contents']]);
        }else{
            $this->returnMsg(400, 'fail to add events', 'fail to insert to database');
        }
    }

    public function details($my=0){
        $this->datas=$this->params;

        if(!isset($this->datas['id'])){
            $this->returnMsg(400,'Fail to find the record!','No record id');
        }
        $map['id']=$this->datas['id'];
        $map['deleted']=0;
        $res = db('events')->where($map)->find();

        if (!empty($res)) {
            if($my==1){
                if(!$this->checkUser($res)){
                    $this->returnMsg(400,'User Identification Error','You have no right to edit this news!');
                }
            }
//            if(!empty($res['pic_path'])){
//                $pics=$this->listdir(ROOT_PATH . 'public' . DS . 'static' . DS . 'images' . DS .$res['pic_path']);
//                if($pics!=false){
//                    $res['pics']=$pics;
//                }
//            }


            $res['contents']=htmlspecialchars_decode($res['contents']);
            //$res['contents']=str_replace('""','\"');
            $this->returnMsg(200, 'Succeed in searching the record!', 'Succeed in searching the record!',$res);
        } else {
            $this->returnMsg(400, 'Fail to search the record!', 'No record found');
        }
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
            case 0:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->where($map)->count();
                break;
            case 1:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->where($map)->where('n.start_date','>=',strtotime($this->datas['startDate']))->count();
                break;
            case 2:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->where($map)->where('n.end_date','<=',strtotime($this->datas['endDate']))->count();
                break;
            case 3:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->where($map)->where('n.start_date','>=',strtotime($this->datas['startDate']))->where('n.end_date','<=',strtotime($this->datas['endDate']))->count();
        }

        if($res){
            $this->returnMsg(200,'succeed in getting records count','succeed in getting records count',$res);
        }
        $this->returnMsg(400,'fail to get record count！','records not found！');
    }

    public  function eventslist($my=0){
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
        $fields='n.id, n.title, n.create_time,u.uname,n.start_date,n.end_date';
        switch($timecase){
            case 0:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->limit($this->pagestart,$this->pagecount)->select();
                break;
            case 1:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->where('n.start_date','>=',strtotime($this->datas['startDate']))->limit($this->pagestart,$this->pagecount)->select();
                break;
            case 2:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->where('n.end_date','<=',strtotime($this->datas['endDate']))->limit($this->pagestart,$this->pagecount)->select();
                break;
            case 3:$res=db('events')->alias('n')->join('user u','n.author_id=u.id')->field($fields)->where($map)->where('n.start_date','>=',strtotime($this->datas['startDate']))->where('n.end_date','<=',strtotime($this->datas['endDate']))->limit($this->pagestart,$this->pagecount)->select();
        }
        //$res=db('news')->alias('n')->join('user u','n.author_id=u.id')->where($map)->field($fields)->limit($this->pagestart,$this->pagecount)->select();
        if($res){
            $this->returnMsg(200,'succeed in searching records','succeed in searching records！',$res);
        }
        $this->returnMsg(400,'fail to search record！','record not found！');
    }
}