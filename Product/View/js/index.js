/**
 * Framework: HDPHP
 * Author: SpanishOnion
 * site: lcgod.com
 * Date: 2017/8/19
 * Time: 4:55
 */
function rmTips(This){
    var thisTips = This.parents('.CHeader').find('.SbmTips');
    if(thisTips.length > 0){
        thisTips.remove();
    }
}
function pageDis(atPage){
    $('.active').attr('class','pageNum');
    atPage.attr('class','active');
    var ppgLen = atPage.prev('.prevPage').length;
    var npgLen = atPage.next('.nextPage').length;
    var prevPg = $('.pagination').children().first();
    var nextPg = $('.pagination').children().last();
    if(ppgLen == 1){
        prevPg.attr('class','disabled');
    }else{
        prevPg.attr('class','prevPage');
    }
    if(npgLen == 1){
        nextPg.attr('class','disabled');
    }else{
        nextPg.attr('class','nextPage');
    }
}
function pageChg(page){
    var aid = $('.pagination').attr('aid');
    $.post(toAjaxPaging,{aid:aid,page:page - 1},function(res){
        pageShow(res);
    },'json');
}
function pageShow(res){
    $('.LCSub').fadeOut(300,function(){
        $('html,body').animate({scrollTop:$('.CMTitle').offset().top + "px"},100);
        $('.MLContents').html(res);
    })
}
//change placeholder
$('body').on('focus','.InfoNn',function(){
    $(this).attr('placeholder','');
    rmTips($(this));
});
$('body').on('blur','.InfoNn',function(){
    $(this).attr('placeholder','昵称(必填)');
});
$('body').on('focus','.InfoEm',function(){
    $(this).attr('placeholder','');
    rmTips($(this));
});
$('body').on('blur','.InfoEm',function(){
    $(this).attr('placeholder','您的电子邮箱(用于通知,必填)');
});
$('body').on('focus','.InfoWs',function(){
    var thisVal = $(this).val();
    if(thisVal.length < 8){
        $(this).val('http://');
    }
    rmTips($(this));
});
$('body').on('blur','.InfoWs',function(){
    var thisVal = $(this).val();
    if(thisVal.length < 8){
        $(this).val('');
    }
});
$('body').on('focus','.Ccontents',function(){
    $(this).attr('placeholder','');
    rmTips($(this));
});
$('body').on('blur','.Ccontents',function(){
    $(this).attr('placeholder','来说两句吧...')
});
//floor bgcolor hover
$('body').on('mouseover','.RMFloor',function(){
    $(this).parent().css("backgroundColor","#fef6f6");
    $(this).children('.CommentsBtn').css("visibility","visible");
});
$('body').on('mouseout','.RMFloor',function(){
    $(this).parent().css('backgroundColor',"#fff");
    $(this).children('.CommentsBtn').css("visibility","hidden");
});
//Choice Head portrait
$('body').on('click','.CheckPt',function(){
    var PortState = $(this).attr('sid');
    var thisSec = $(this).children('.UserPortrait');
    if(PortState == 1){
        if(thisSec.length > 0){
            thisSec.stop().slideDown();
        }else{
            var ptStr = '<section class="UserPortrait">';
            for(var i=0;i<26;i++){
                ptStr += '<em class="CPortrait"><img src="./resource/message/images/' + i +'.png" title="选择此头像" class="PortImg" pid="' + i + '"></em>';
            }
            ptStr += '</section>';
            $(this).prepend(ptStr);
            $(this).children('.UserPortrait').stop().slideDown();
        }
        $(this).attr('sid',2);
    }else{
        thisSec.stop().slideUp();
        $(this).attr('sid',1)
    }
});
$('body').on('mouseover','.CPortrait',function(){
    $(this).css('box-shadow','0 0 10px #ccc');
    $(this).children('img').css({"width":"39px","height":"32px"});
});
$('body').on('mouseout','.CPortrait',function(){
    $(this).css('box-shadow','none');
    $(this).children('img').css({"width":"38px","height":"31px"});
});
$('body').on('click','.UserPortrait .CPortrait',function(){
    var PortPath = $(this).children().attr('src');
    var pid = $(this).children().attr('pid');
    $('.CPersonal').children('.CPortrait').children('img').attr({'src':PortPath,'pid':pid});
});
//submit verification
$('body').on('click','.Csubmit',function(){
    var subState = $('body').attr('sid');
    if(!subState){
        subState = 1;
    }
    if(subState == 1){
        var This = $(this);
        var porid = $(this).siblings('.CPersonal').children('.CheckPt').children('.PortImg').attr('pid');
        var pid = $(this).parents('.CHeader').prev().attr('pid');
        var aid = $(this).parents('.CHeader').prev().children('.CBReply').attr('aid');
        if(!aid){
            aid = $(this).attr('aid');
        }
        if(!pid){
            pid = 0;
        }
        var subName = $(this).siblings('.CPersonal').find('.InfoNn').val();
        var subEmail = $(this).siblings('.CPersonal').find('.InfoEm').val();
        var subUrl = $(this).siblings('.CPersonal').find('.InfoWs').val();
        var subArea = $(this).siblings('.CContent').children().val();
        var nnTips = '<div class="SbmTips">请填写昵称！</div>';
        var emTips = '<div class="SbmTips">请填写邮箱！</div>';
        var emTips2 = '<div class="SbmTips">请填写合法的邮箱地址！</div>';
        var arTips = '<div class="SbmTips">请填写评论内容！</div>';
        var urlTips = '<div class="SbmTips">请填写合法的域名！</div>';
        var emReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        var urlReg = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g;
        var tipState = $(this).next();
        if(tipState.length > 0){
            $(this).next().remove();
        }
        if(!subName){
            $(this).after(nnTips);
            $(this).next().animate({right:"50px"});
        }else if(!subEmail){
            $(this).after(emTips);
            $(this).next().animate({right:"50px"});
        }else if(!subArea){
            $(this).after(arTips);
            $(this).next().animate({right:"50px"});
        }else if(!emReg.test(subEmail)){
            $(this).after(emTips2);
            $(this).next().animate({right:"50px"});
        }else if(subUrl && !urlReg.test(subUrl)){
            $(this).after(urlTips);
            $(this).next().animate({right:"50px"});
        }else{
            $('body').attr('sid',2);
            This.text('发布中...');
            var page = 1;
            if($('.active').prev('.pageNum').length != 0){
                page = 0;
            }
            $.post(toAjaxComment,{nickname:subName,email:subEmail,website:subUrl,content:subArea,pid:pid,aid:aid,portrait:porid,page:page},function(res){
                if(res){
                    var apComment = function(){
                        This.siblings('.CPersonal').find('.InfoNn').val('');
                        This.siblings('.CPersonal').find('.InfoEm').val('');
                        This.siblings('.CPersonal').find('.InfoWs').val('');
                        This.siblings('.CContent').children().val('');
                        var cmCount = 1;
                        if($('.TCNumber').text()){
                            cmCount = parseInt($('.TCNumber').text()) + 1;
                        }
                        if(page == 0){
                            pageDis($('.prevPage').next());
                            pageShow(res);
                        }else{
                            if($('.emptyTips').length > 0){
                                $('.emptyTips').remove();
                                var str = '<div class="CMain"><div class="CMTitle"><div class="MTContent">评论</div>';
                                str += '<div class="MTCount">共计<span class="TCNumber">1</span>条评论</div></div>';
                                str += '<div class="CMLists"><div class="MLTitle"><i class="LTBg"></i>最新评论</div>';
                                str += '<div class="MLContents">' + res + '</div></div></div>';
                                $('.CHeader').after(str);
                            }else{
                                if(This.parent().siblings('.CommentBtn').length > 0){
                                    This.parent().prev().children('.CBReply').text('回复').attr('aid',1);
                                    This.parent().stop().slideUp(300);
                                    $('html,body').animate({scrollTop:$('.CMTitle').offset().top + "px"},100);
                                }
                                if(cmCount > 5){
                                    $('.LCSub').last().fadeOut(300,function(){
                                        $('.LCSub').last().remove();
                                    });
                                    var listNum = Math.ceil(cmCount/5);
                                    if($('.pagination').length == 0){
                                        var pageStr = '<nav><ul class="pagination" aid="' + aid + '">';
                                        pageStr += '<li class="disabled"><span>上一页</span></li><li class="active"><span>1</span></li>';
                                        for(var i=1;i<listNum;i++){
                                            pageStr += '<li class="pageNum"><span>' + (i+1) + '</span></li>';
                                        }
                                        pageStr += '<li class="nextPage"><span>下一页</span></li></ul>';
                                        $('#Comment').after(pageStr);
                                    }else{
                                        var maxList = parseInt($('.nextPage').prev().text()) + 1;
                                        if(listNum == maxList){
                                            var listStr = '<li class="pageNum"><span>' + maxList + '</span></li>';
                                            $('.nextPage').before(listStr);
                                        }
                                    }
                                }
                                $('.MLContents').prepend(res);
                            }
                        }
                        $('.TCNumber').text(cmCount);
                        $('body').attr('sid',1);
                        This.text('发布评论');
                    };
                    $.when(apComment()).done(function(){
                        $.post(toAjaxMail,{nickname:subName,email:subEmail,pid:pid,aid:aid},function(res){

                        },'json')
                    })
                }
            },'json');
        }
    }else{
        return false;
    }

});
//clone Comment box
$('body').on('click','.CBReply',function(){
    var cfId = $(this).attr('sid');
    var This = $(this);
    var theTips = This.parent().siblings('.CHeader').find('.SbmTips');
    if(theTips.length > 0){
        theTips.remove();
    }
    if(cfId == 1){
        var thisHeader = This.parent('.CommentBtn').siblings('.CHeader');
        $('.LCSub .CHeader').not(thisHeader).stop().slideUp(300);
        $(".CBReply").not(This).text('回复').attr('sid',1);
        if(thisHeader.length > 0){
            thisHeader.stop().slideDown(300);
            This.text('取消回复').attr('sid',2);
        }else{
            var str = '<div class="CHeader" style="display: none"><div class="CPersonal"><div class="CPortrait CheckPt" sid="1"  onselectstart="return false">';
            str += '<img src="./resource/message/images/14.png" alt="" class="PortImg" title="头像" pid="14"></div><div class="PersonalInfo">';
            str += '<input type="text" class="InfoContent InfoNn" placeholder="昵称(必填)">';
            str += '<input type="text" class="InfoContent InfoEm" placeholder="您的电子邮箱(用于通知,必填)">';
            str += '<input type="text" class="InfoContent InfoWs" placeholder="您的博客网址(可选)">';
            str += '</div></div><div class="CContent"><textarea name="" class="Ccontents" placeholder="来说两句吧..."></textarea>';
            str += '</div><div class="Csubmit" onselectstart="return false">发布评论<i class="Ctriangle"></i></div></div>';
            This.parent('.CommentBtn').after(str);
            This.text('取消回复').attr('sid',2);
            This.parent().siblings('.CHeader').stop().slideDown(300);
        }
    }else{
        This.text('回复').attr('sid',1);
        This.parent().siblings('.CHeader').stop().slideUp(300);
    }
});
//Likes and Boo
$('body').on('click','.CBDing',function(){
    var This = $(this);
    var cid = This.parent().attr('pid');
    var ajaxState = This.attr('sid');
    if(!ajaxState){
        ajaxState = 1;
    }
    if(ajaxState == 1){
        This.attr('sid',0);
        $.post(toAjaxLikes,{cid:cid,ip:clientIP},function(res){
            if(res){
                $(".CommentBtn[pid="+cid+"]").children('.CBDing').removeClass('CBDing').addClass('Ding_active');
                $(".CommentBtn[pid="+cid+"]").find('.dingCount').text(res);
                This.attr('sid',1);
            }
        },'json')
    }else{
        return false;
    }
});
$('body').on('click','.CBCai',function(){
    var This = $(this);
    var cid = This.parent().attr('pid');
    var ajaxState = This.attr('sid');
    if(!ajaxState){
        ajaxState = 1;
    }
    if(ajaxState == 1){
        This.attr('sid',0);
        $.post(toAjaxBoo,{cid:cid,ip:clientIP},function(res){
            if(res){
                $(".CommentBtn[pid="+cid+"]").children('.CBCai').removeClass('CBCai').addClass('Cai_active');
                $(".CommentBtn[pid="+cid+"]").find('.CaiCount').text(res);
                This.attr('sid',1);
            }
        },'json')
    }else{
        return false;
    }
});
//Paging
$('body').on('click','.pageNum',function(){
    var page = parseInt($(this).children().text());
    pageDis($(this));
    pageChg(page);
});
$('body').on('click','.prevPage',function(){
    var page = parseInt($('.active').prev().children().text());
    pageDis($('.active').prev());
    pageChg(page);
});
$('body').on('click','.nextPage',function(){
    var page = parseInt($('.active').next().children().text());
    pageDis($('.active').next());
    pageChg(page);
});