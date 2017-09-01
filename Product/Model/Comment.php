<?php
namespace system\model;
use hdphp\model\Model;
class Comment extends Model{
    //数据表
    protected $table = "comment";

    //允许填充字段
    protected $allowFill = [ ];

    //禁止填充字段
    protected $denyFill = [ ];

    //完整表名
    protected $full = false;

    //自动验证
    protected $validate=[
        //['字段名','验证方法','提示信息',验证条件,验证时间]
        ['nickname','required','昵称不能为空',3,3],
        ['content','required','评论内容不能为空',3,3],
        ['date','required','评论时间不能为空',3,3],
    ];

    //自动完成
    protected $auto=[
        //['字段名','处理方法','方法类型',验证条件,验证时机]
    ];

    //自动过滤
    protected $filter=[
        //[表单字段名,过滤条件,处理时间]
    ];

    //时间操作,需要表中存在created_at,updated_at字段
    protected $timestamps=false;

    public function add($ipData){
        $data = $_POST;
        $Model = new Comment();
        $Model['nickname'] = htmlspecialchars($data['nickname']);
        $Model['pid'] = $data['pid'];
        $Model['article_aid'] = $data['aid'];
        $Model['date'] = time();
        $Model['website'] = $data['website'];
        $Model['content'] = htmlspecialchars($data['content']);
        $Model['portrait'] = $data['portrait'];
        $Model['email'] = $data['email'];
        $Model['add'] = $ipData['add'];
        $Model['area'] = $ipData['area'];
        $Model['ip'] = $ipData['ip'];
        $Model['isp'] = $ipData['isp'];
        return $Model->save();
    }
}