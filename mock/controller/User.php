<?php

namespace app\index\controller;


use think\Session;

class User extends Common
{
    public $datas;

    public function register(){
        $this->datas=$this->params;
        if(isset($this->datas['pwd']) && !empty($this->datas['pwd'])){
            $this->datas['pwd']=md5($this->datas['pwd']);
        }
        $this->datas['create_time']=$this->datas['update_time']=time();
        if($id=db('user')->insertGetId($this->datas)){
            $this->returnMsg(200, 'succeed in add user', 'succeed in add user',['id'=>$id]);
        }else{
            $this->returnMsg(400, 'fail to add user', 'fail to insert to database');
        }
    }

    public function info($id)
    {
        if(!$id){
            $this->returnMsg(400, 'Fail to find user', 'user id lost');
        }
        $res=db('user')->where('id',$id)->where('deleted',0)->find();
        if (!empty($res)) {
            $this->returnMsg(200, 'succeed in searching user', 'user found', $res);
        } else {
            $this->returnMsg(400, 'fail to search user', 'no user record');
        }
    }

    public function listuser()
    {
        $this->datas=$this->params;
        if(isset($this->datas['uname']) && !empty($this->datas['uname'])){
            $this->datas['uname']=['like','%'.$this->datas['uname'].'%'];
        }
        $this->datas['deleted']=0;
        //$this->setPageParam();
       $res=db('user')->where($this->datas)->select();
        if($res){
            $this->returnMsg(200,'succeed in searching users','succeed in searching users',$res);
        }
        $this->returnMsg(400,'fail to searching users','user records not found');
    }

    public function login()
    {
        $this->datas = $this->params;
        //检测用户名类型
        //$userType = $this->checkUsername($this->datas['user_name']);

        //在数据库中查询数据 (用户名和密码匹配)
        $this->matchUserAndPwd();
    }

    public function test(){
        $this->returnMsg(200, 'login succeed', 'login succeed',session_id());
    }

    private function matchUserAndPwd()
    {
        $map['uname']=$this->datas['uname'];
        $map['pwd']=md5($this->datas['pwd']);
        $map['deleted']=0;
        $res = db('user')->where($map)->find();
        if (!empty($res)) {
            unset($res['pwd']);
            Session::set('uid',$res['id']);
            $this->returnMsg(200, 'login succeed', 'login succeed',session_id());
        } else {
            $this->returnMsg(400, 'login fails', 'user name or password not correct');
        }
    }

}