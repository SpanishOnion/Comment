function rmTips(This){
    var thisTips = This.parents('.CHeader').find('.SbmTips');
    if(thisTips.length > 0){
        thisTips.remove();
    }
}
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
    $(this).attr('placeholder','');
    rmTips($(this));
});
$('body').on('blur','.InfoWs',function(){
    $(this).attr('placeholder','您的博客网址(可选)');
});
$('body').on('focus','.Ccontents',function(){
    $(this).attr('placeholder','');
    rmTips($(this));
});
$('body').on('blur','.Ccontents',function(){
    $(this).attr('placeholder','来说两句吧...')
});
$('.RMFloor').hover(function(){
    $(this).parent().css("backgroundColor","#fef6f6");
    $(this).children('.CommentsBtn').css("visibility","visible");
},function(){
    $(this).parent().css('backgroundColor',"#fff");
    $(this).children('.CommentsBtn').css("visibility","hidden");
});
$('body').on('click','.CheckPt',function(){
    var PortState = $(this).attr('sid');
    var thisSec = $(this).children('.UserPortrait');
    if(PortState == 1){
        if(thisSec.length > 0){
            thisSec.stop().slideDown();
        }else{
            var ptStr = '<section class="UserPortrait">';
            for(var i=0;i<25;i++){
                ptStr += '<em class="CPortrait"><img src="./images/' + i +'.png" title="选择此头像" class="PortImg"></em>';
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
    $('.CPersonal').children('.CPortrait').children('img').attr('src',PortPath);
});
$('body').on('click','.Csubmit',function(){
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

    }
});
$('.CBReply').click(function(){
    var cfId = $(this).attr('aid');
    var This = $(this);
    var theTips = This.parent().siblings('.CHeader').find('.SbmTips');
    if(theTips.length > 0){
        theTips.remove();
    }
    if(cfId == 1){
        var thisHeader = This.parent('.CommentBtn').siblings('.CHeader');
        $('.LCSub .CHeader').not(thisHeader).stop().slideUp(300);
        $(".CBReply").not(This).text('回复').attr('aid',1);
        if(thisHeader.length > 0){
            thisHeader.slideDown(300);
            This.text('取消回复').attr('aid',2);
        }else{
            var str = '<div class="CHeader" style="display: none"><div class="CPersonal"><div class="CPortrait CheckPt" sid="1"  onselectstart="return false">';
            str += '<img src="./images/14.png" alt="" class="PortImg" title="头像"></div><div class="PersonalInfo">';
            str += '<input type="text" class="InfoContent InfoNn" placeholder="昵称(必填)">';
            str += '<input type="text" class="InfoContent InfoEm" placeholder="您的电子邮箱(用于通知,必填)">';
            str += '<input type="text" class="InfoContent InfoWs" placeholder="您的博客网址(可选)">';
            str += '</div></div><div class="CContent"><textarea name="" class="Ccontents" placeholder="来说两句吧..."></textarea>';
            str += '</div><div class="Csubmit"  onselectstart="return false">发布评论<i class="Ctriangle"></i></div></div>';
            This.parent('.CommentBtn').after(str);
            This.text('取消回复').attr('aid',2);
            This.parent().siblings('.CHeader').slideDown(300);
        }
    }else{
        This.text('回复').attr('aid',1);
        This.parent().siblings('.CHeader').slideUp(300);
    }
});