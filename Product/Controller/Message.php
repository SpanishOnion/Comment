<?php
/**
 * Framework: HDPHP
 * Author: SpanishOnion
 * site: lcgod.com
 * Date: 2017/8/19
 * Time: 4:55
 */

namespace app\home\controller;

use system\model\Comment;

class Message extends Common {
    public $db;
    public $ip;

    public function __construct(){
        parent::__construct();
        $this->db = new Comment();
        $this->ip = $this->getIP();
    }

    public function index(){
        $navTitle = 'Message';
        $website['title'] = '留言板 - 李聪·个人博客';
        $listData = $this->showLists();
        view::with('htmlStr',$listData['htmlStr'])->with('count',$listData['count'])
            ->with('pageStr',$listData['pageStr'])->with('website',$website)
            ->with('navTitle',$navTitle)->with('clientIP',$this->ip);
        return view();
    }

    public function AjaxComment(){
        if(IS_AJAX){
            $ipData = $this->getTBIP($this->ip);
            $cid = $this->db->add($ipData);
            if($cid){
                if($_POST['page'] == 0){
                    $arr = $this->resetArr($_POST['aid'],$_POST['page']);
                }else{
                    $data = $this->resetArr($_POST['aid']);
                    $arr[0] = $data[0];
                }
                $htmlStr = $this->resetHtml($arr,$_POST['aid']);
                echo json_encode($htmlStr,true);die;
            }else{
                echo false;die;
            }
        }
    }

    public function AjaxPaging(){
        if(IS_AJAX){
            $arr = $this->resetArr($_POST['aid'],$_POST['page']);
            $htmlStr = $this->resetHtml($arr,$_POST['aid']);
            echo json_encode($htmlStr,true);die;
        }
    }

    public function showLists(){
        if($_GET['aid']){
            $aid = $_GET['aid'];
        }else{
            $aid = 0;
        }
        $arr = $this->resetArr($aid);
        $pageStr = '';
        if($arr){
            $htmlStr = $this->resetHtml($arr,$aid);
            $count = Db::query("SELECT count(cid) as num FROM comment WHERE article_aid=$aid");
            $count = $count[0]['num'];
            if($count > 5){
                $pageStr = '<nav><ul class="pagination" aid="' . $aid . '">';
                $pageStr .= '<li class="disabled"><span>上一页</span></li><li class="active"><span>1</span></li>';
                for($i=1;$i<ceil($count/5);$i++){
                    $pageStr .= '<li class="pageNum"><span>' . ($i+1) . '</span></li>';
                };
                $pageStr .= '<li class="nextPage"><span>下一页</span></li></ul>';
            }
        }else{
            $htmlStr = '';
            $count = 0;
        }
        return ['htmlStr'=>$htmlStr,'count'=>$count,'pageStr'=>$pageStr];
    }

    public function resetArr($aid,$page=0){
        $arr = Db::query("SELECT * FROM comment WHERE article_aid=$aid");
        if($arr){
            foreach($arr as $k=>$v){
                if($v['pid'] > 0 ){
                    foreach($arr as $c=>$d){
                        if($v['pid'] == $d['cid']){
                            $arr[$k]['father'][] = $d;
                        }
                    }
                }
            }
            krsort($arr);
            $arr = array_slice($arr,$page*5,5);
        }else{
            return false;
        }
        return $arr;
    }

    /*$arr 留言列表数组
      $aid 文章ID
    */
    public function resetHtml($arr,$aid){
        $htmlStr = '';
        foreach($arr as $k=>$v){
            $htmlStr .= '<div class="LCSub"><div class="CPortrait"><a href="' . $v['website'] . '" class="CPLink">';
            $htmlStr .= '<img src="./resource/message/images/'. $v['portrait'] .'.png" pid="' . $v['portrait'] . '" class="PortImg"></a></div>';
            $htmlStr .= '<div class="ContMsg"><div class="UserInfo"><span class="MsgTime">' . date('Y-m-d H:i:s',$v['date']) . '</span>';
            $htmlStr .= '<span class="Nickname"><a href="' . $v['website'] . '" class="NnLink">' . $v['nickname'] . '</a>';
            $htmlStr .= '</span><span class="UserAdd">[' . $v['add'] . '网友]</span></div>';
            if($v['father']){
                $htmlStr .= '<div class="fatherReply">' . $this->connectHtml($v['father'],true,$aid) . '</div>';
            }
            $htmlStr .= '<div class="CommentInfo">' . $v['content'] . '</div><div class="CommentBtn" pid="' . $v['cid'] . '">';
            //判断此IP是否有过点赞行为
            $caiClass = $this->getCaiClass($v['cip']);
            $dingClass = $this->getDingClass($v['dip']);
            $htmlStr .= $caiClass . '<span class="CaiCount">' . $v['cai'] . '</span><i class="iconCai"></i></div>';
            $htmlStr .= $dingClass . '<span class="dingCount">' . $v['ding'] . '</span><i class="iconDing"></i></div>';
            $htmlStr .= '<span class="CBReply" sid="1" aid="' . $aid . '">回复</span></div></div></div>';
        }
        return $htmlStr;
    }

    /**
     *  $arr 留言列表数组数据
     *  $staticState 是否重置静态变量(html字符串与楼层号)的值,外部调用此函数选择true,递归自调用选择false
     *  $aid 文章ID
     */
    public function connectHtml($arr,$staticState,$aid){
        static $htmlStr = '';
        static $floor = 0;
        if($staticState){
            $htmlStr = '';
            $floor = 0;
        }
        foreach($arr as $k=>$v){
            $htmlStr .= '<div class="FRMain">';
            if($v['father']){
                $this->connectHtml($v['father'],false,$aid);
            }
            $floor++;
            $htmlStr .= '<div class="RMFloor"><div class="UserInfo"><span class="MsgTime floorNum"> ' . $floor . '</span>';
            $htmlStr .= '<span class="Nickname"><a href="" class="NnLink">' . $v['nickname'] . '</a></span><span class="UserAdd">[' . $v['add'] . '网友]</span>';
            $htmlStr .= '</div><div class="CommentInfo">' . $v['content'] . '</div><div class="CommentBtn CommentsBtn" pid="' . $v['cid'] . '">';
            $caiClass = $this->getCaiClass($v['cip']);
            $dingClass = $this->getDingClass($v['dip']);
            $htmlStr .= $caiClass . '<span class="CaiCount">' . $v['cai'] . '</span><i class="iconCai"></i></div>';
            $htmlStr .= $dingClass . '<span class="dingCount">' . $v['ding'] . '</span><i class="iconDing"></i></div>';
            $htmlStr .= '<span class="CBReply" sid="1" aid="' . $aid . '">回复</span></div></div></div>';
        }
        return $htmlStr;
    }

    public function AjaxLikes(){
        if(IS_AJAX){
            $data = Db::table('comment')->where("cid",$_POST['cid'])->get(['ding','dip']);
            $ding = $data[0]['ding'] + 1;
            $odip = $data[0]['dip'];
            if($ding == 1){
                $dip = $_POST['ip'];
            }else{
                if(in_array($_POST['ip'],explode('|',$odip))){
                    echo false;die;
                }else{
                    $dip = $odip . '|' . $_POST['ip'];
                }
            }
            $res = Db::table('comment')->where("cid",$_POST['cid'])->update(['ding'=>$ding,'dip'=>$dip]);
            if($res == 1){
                echo $ding;
            }else{
                echo false;
            }
        }
    }

    public function AjaxBoo(){
        if(IS_AJAX){
            $data = Db::table('comment')->where("cid",$_POST['cid'])->get(['cai','cip']);
            $cai = $data[0]['cai'] + 1;
            $ocip = $data[0]['cip'];
            if($cai == 1){
                $cip = $_POST['ip'];
            }else{
                if(in_array($_POST['ip'],explode('|',$ocip))){
                    echo false;die;
                }else{
                    $cip = $ocip . '|' . $_POST['ip'];
                }
            }
            $res = Db::table('comment')->where("cid",$_POST['cid'])->update(['cai'=>$cai,'cip'=>$cip]);
            if($res == 1){
                echo $cai;
            }else{
                echo false;
            }
        }
    }

    public function getCaiClass($cip){
        if($cip && in_array($this->ip,explode('|',$cip))){
            $caiClass = '<div class="Cai_active">';
        }else{
            $caiClass = '<div class="CBCai">';
        }
        return $caiClass;
    }

    public function getDingClass($dip){
        if($dip && in_array($this->ip,explode('|',$dip))){
            $dingClass = '<div class="Ding_active">';
        }else{
            $dingClass = '<div class="CBDing">';
        }
        return $dingClass;
    }

    public function AjaxMail(){
        if(IS_AJAX){
            if($_POST['aid'] == 0){
                $cmUrl = 'http://www.lcgod.com/msg';
            }else{
                $cmUrl = 'http://www.lcgod.com/atc_' . $_POST['aid'];
            }
            $myEmail = '775126470@qq.com';
            if($_POST['email'] != $myEmail){
                if($_POST['pid'] != 0){
                    $email = Db::table('comment')->where('cid',$_POST['pid'])->get(['email']);
                    $email = $email[0]['email'];
                    if($email != $_POST['email'] && $email != $myEmail){
                        //给被评论者发送邮件
                        Mail::send(
                            $email,
                            $_POST['nickname'],
                            '李聪·个人博客评论提醒',
                            "Hi!我是李聪, " . $_POST['nickname'] . " 对你的评论进行了回复哦 ! 快去点击链接看看吧 : " . $cmUrl
                        );
                    }
                }
                //给评论者发送邮件
                Mail::send(
                    $_POST['email'],
                    '李聪',
                    '李聪·个人博客评论提醒',
                    "Hi!我是李聪,我已经收到你的评论啦,耐心等待回复吧!么么哒~"
                );
            }
            //给博主发送邮件
            Mail::send(
                $myEmail,
                $_POST['nickname'],
                '个人博客评论提醒',
                "评论地址 : " . $cmUrl . " 发件人邮箱 : " . $_POST['email']
            );
        }
    }
}