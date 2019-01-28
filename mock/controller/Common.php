<?php

namespace app\index\controller;


use think\Controller;
use think\Db;
use think\Image;
use think\Request;
use think\Validate;

class Common extends Controller
{
    protected $req; //用来处理客户端传递过来的参数
    protected $validater; //用来验证数据/参数
    protected $params; //过滤后符合要求的参数

    //控制器下面方法所要接受参数的
//    protected $rules = array(
//        'User' => array(
//            'login' => array(
//                'user_name' => ['require'],
//                'user_pwd' => ['require', 'max' => 32, 'min' => 8],
//            ),
//            'register' => array(
//                'user_phone' => ['require','regex:/^1[34578]\d{9}$/'],
//                'user_pwd' => ['require', 'max' => 32, 'min' => 8],
//                'code' => ['require', 'number', 'length' => 6],
//            ),
//            'applyverify'=>array(
//                'idcard'=>['require', 'regex: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/'],
//                'id_image'=>['require'],
//            ),
//            'uploadDocs' => array(
//                'user_file' => ['require', 'fileSize' => 5000000, 'fileExt' => 'doc,pdf'],
//            ),
//            'edit'=> array(
//                'job'=>['max'=>20],
//                'nickname'=>['max'=>20],
//            ),
//            'uploadHeadImg' => array(
//                'user_id' => ['require', 'number'],
//                'user_icon' => ['require', 'image', 'fileSize' => 5000000, 'fileExt' => 'jpg,png,bpm,jpeg'],
//            ),
//            'changePwd' => array(
//                'user_name' => ['require'],
//                'user_old_pwd' => ['require', 'max' => 32, 'min' => 8],
//                'user_pwd' => ['require', 'max' => 32, 'min' => 8],
//            ),
//            'findPwd' => array(
//                'user_name' => ['require'],
//                'code' => ['require', 'number', 'length' => 6],
//                'user_pwd' => ['require', 'max' => 32, 'min' => 8],
//            ),
//            'bindPhoneEmail' => array(
//                'user_id' => ['require', 'number'],
//                'user_name' => ['require'],
//                'code' => ['require', 'number', 'length' => 6],
//            ),
//            'modifyUsername' => array(
//                'user_id' => ['require', 'number'],
//                'user_nickname' => ['require', 'chsDash'],
//            ),
//        ),
//
////        'Common' => array(
////            'get_code' => array(
////                'username' => 'require',
////                'is_exist' => 'require|number|length:1',
////            ),
////        ),
////        'Code' => array(
////            'get_code' => array(
////                'username' => 'require',
////                'is_exist' => 'require|number|length:1',
////            ),
////        ),
//        'Activity' => array(
//            'addact' => array(
//                'title' =>[ 'require','max'=>50],
//                'intro' =>[ 'require','max'=>100],
//                'address'=>['require','max'=>200],
//                'city_id'=>['require','number'],
//                'persons'=>['number'],
//                'price'=>['require','double'],
//            ),
//        ),
//
//    );

    /**
     * [构造方法]
     * @return [type] [description]
     */
    protected function _initialize()
    {

        parent::_initialize();
        $this->req = Request::instance();

        //1. 检车请求时间是否超时
        //$this->checkTime($this->req->only(['time']));

        //2. 验证token
        //$this->checkToken($this->req->param());
        //3. 验证参数,返回成功过滤后的参数数组
        $this->params = $this->checkParams($this->req->param(true));

        //print_r($this->params);
    }

    //检测请求的时间是否超时
//    public function checkTime($arr)
//    {
//        //$this->returnMsg(400, '请求超时!');
//        if (!isset($arr['time']) || intval($arr['time']) <= 1) {
//            $this->returnMsg(400, '时间戳不存在!','时间戳不存在!');
//        }
//        if (time() - intval($arr['time']) > 10) {
//            $this->returnMsg(400, '请求超时!','请求超时!');
//        }
//    }

    //验证token方法 (防止篡改数据)
    /*
    $arr: 全部请求参数
    return : json
     */
//    protected function checkToken($arr)
//    {
//        //检测客户端是否传递过来token数据
//        if (!isset($arr['token']) || empty($arr['token'])) {
//            $this->returnMsg(400, 'token不能为空','token不能为空');
//        }
//
//        //这是客户端api传递过来的token
//        $app_token = $arr['token'];
//        //如果已经传递token数据，就删除token数据，生成服务端token与客户端的token做对比
//        unset($arr['token']);
//        $session_token = '';
//        foreach ($arr as $key => $val) {
//            $session_token .= md5($val);
//        }
//
//        $session_token = md5('weapi_' . $session_token . '_app');
//        //echo $session_token;die; //调试输出
//
//        //如果传递过来的token不相等
//        if ($app_token !== $session_token) {
//            $this->returnMsg(400, 'token值不正确','token值不正确');
//        }
//    }

    //检测客户端传递过来的其他参数（用户名，其他相关）
    /*
    param: $arr [除了time,token以外的其他参数]
    return:     [合格的参数数组]
     */
    protected function checkParams($arr)
    {

        //1.获取验证规则 (Array)
        if(isset($this->rules[$this->req->controller()][$this->req->action()])) {
            $rule = $this->rules[$this->req->controller()][$this->req->action()];
            //2. 验证参数并且返回错误
            $this->validater = new Validate($rule);

            if (!$this->validater->check($arr)) {
                $this->returnMsg(400, '验证失败', $this->validater->getError());
            }

        }

        //3. 如果正常，就通过验证
//        unset($arr['time']);
//        unset($arr['token']);
        return $arr;
    }

    //检测用户名,并且返回用户名类别
//    protected function checkUsername($username)
//    {
//        if(!is_numeric($username)){
//            $is_uname=1;
//        } else $is_uname=0;
//        $is_phone = preg_match('/^1[34578]\d{9}$/', $username) ? 4 : 2;
//
//        $flag = $is_uname + $is_phone;
//
//        switch ($flag) {
//            case 2:
//                //既不是用户名，也不是手机号
//                $this->returnMsg(400, '验证失败','用户名格式错误');
//                break;
//
//            case 3:
//                //用户名
//                return 'name';
//                break;
//
//            case 4:
//                //手机号
//                return 'phone';
//                break;
//        }
//    }

    /**
     * [检测该字段是否已经存在数据库中]
     * @param  [type] $value [description]
     * @param  [type] $type  [description]
     * @param  [type] $exist [description]
     * @return [type]        [description]
     */
//    protected function checkExist($value, $type, $exist)
//    {
//        $type_num = $type == 'phone' ? 2 : 4;
//        $flag = $type_num + $exist;
//
//        $phone_res = db('user')->where('user_phone', $value)->find();
//        if(isset($this->datas['user_name']) && !empty($this->datas['user_name'])){
//            $name_res = db('user')->where('user_name', $value)->find();
//        }
//        switch ($flag) {
//            case 2:
//                if ($phone_res) {
//                    $this->returnMsg(400, '此手机号已经被占用！','此手机号已经被占用！');
//                }
//                break;
//            case 3:
//                if (empty($phone_res)) {
//                    $this->returnMsg(400, '此手机号不存在！', '此手机号不存在！');
//                }
//                break;
//            case 4:
//                if ($name_res) {
//                    $this->returnMsg(400, '此用户名已经被注册！','此用户名已经被注册！');
//                }
//                break;
//            case 5:
//                if (empty($name_res)) {
//                    $this->returnMsg(400, '此用户名不存在！', '此用户名不存在！');
//                }
//                break;
//        }
//    }

    /**
     * [检查验证码是否输入正确]
     * @param  [string] $username [用户名(phone/email)]
     * @param  [int] $code     [验证码]
     * @return [json]           [执行返回信息]
     */
//    protected function checkCode($username, $code)
//    {
//        return true;
//    }

    //返回信息
    protected function returnMsg($code, $title='',$msg = '', $data = [])
    {
        $return_data['code'] = $code;
        $return_data['title']=$title;
        $return_data['msg'] = $msg;
        if(count($data)>0)
            $return_data['data'] = $data;
        echo json_encode($return_data);die;
    }

    /**
     * [上传文件到服务器]
     * @param  [object] $file [文件资源]
     * @param  [string] $type [图片类型]
     * @return [string]       [图片在服务器的路径]
     */
    public function uploadFiles($file,$folder, $type = '')
    {

        $info = $file->move(ROOT_PATH . 'public' . DS .$folder);

        if ($info) {
            $path = $folder.DS . $info->getSaveName();
            $path = preg_replace('/\\\\/', '/', $path);
            if (!empty($type)) {
                $this->imageEdit($path, $type);
            }
        } else {
            $this->returnMsg(400, '上传文件失败！', $file->getError());
        }

        return $path;
    }

    /**
     * [图片裁剪]
     * @param  [string] $path [原图片的绝对路径]
     * @param  [string] $type [图片的类型]
     * @return [null]
     */
    public function imageEdit($path, $type,$file)
    {   $source=ROOT_PATH.'public'.DS.'uploads'.DS.$file;
        $source = preg_replace('/\\\\/', '/', $source);
        $image = Image::open($source);
        $copy=ROOT_PATH.'public'.DS.$path.DS.$file;
        $copy = preg_replace('/\\\\/', '/', $copy);
        switch ($type) {
            case 'thumb':
                $image->thumb(200, 200, Image::THUMB_CENTER)->save($copy);
                break;
            case 'other_img':
                break;
        }
    }

    protected function listdir($path){
        $file_arr=[];
        if (is_dir($path)) {
            $handle = opendir($path);
            if ($handle) {
                while (false !== ( $item = readdir($handle) )) {
                    if ($item != "." && $item != ".."){
                        $file_arr[]=$item;
                        }
                    }
                }
            return $file_arr;
    }else{
        return false;
        }
    }

    protected function findExistOne($db,$arr)
    {
        $res=db($db)->where($arr)->find();
        if($res){
            return true;
        }else{
            return false;
        }
    }
}