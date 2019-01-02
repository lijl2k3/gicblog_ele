<?php
namespace app\index\controller;

class Index extends Common
{
    public function index()
    {
        return '<style type="text/css">*{ padding: 0; margin: 0; } .think_default_text{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p> ThinkPHP V5<br/><span style="font-size:30px">十年磨一剑 - 为API开发设计的高性能框架</span></p><span style="font-size:22px;">[ V5.0 版本由 <a href="http://www.qiniu.com" target="qiniu">七牛云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="https://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script><script type="text/javascript" src="https://e.topthink.com/Public/static/client.js"></script><think id="ad_bd568ce7058a1091"></think>';
    }

//    public function upload()
//    {
//        $res=$this->uploadFiles('file','upload');
//        if($res){
//            $this->returnMsg(200,'文件上传成功！', '文件上传成功！', $res);
//        }
//        $this->returnMsg(400,'文件上传失败!', '文件上传失败！');
//
//    }


    public function upload(){
// 获取表单上传文件
        $file = request()->file('file');
        if($file){
            $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
            if($info){
// 成功上传后 获取上传信息
// 输出 jpg
                echo $info->getExtension();
// 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
                echo $info->getSaveName();
// 输出 42a79759f284b767dfcb2a0197904287.jpg
                echo $info->getFilename();
            }else{
// 上传失败获取错误信息
                echo $file->getError();
            }
        }
    }
}
