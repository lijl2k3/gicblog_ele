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
}