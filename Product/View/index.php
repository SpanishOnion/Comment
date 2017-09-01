<extend file='../home'/>
<block name="content">
    <div class="header-colour"></div>
    <section class="bgi banner5"></section>
    <aside class="fh5co-page-heading">
        <div class="container" style="width:100%;">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="fh5co-page-heading-lead" style="font-size:35px;">
                        {{$navTitle}}
                        <span class="fh5co-border"></span>
                    </h1>
                </div>
            </div>
        </div>
    </aside>
    <div id="container">
        <div id="Comment">
        <!------   公用回复面板    ------>
            <div class="CommentTop"></div>
            <div class="CHeader">
                <div class="CPersonal">
                    <div class="CPortrait CheckPt" sid="1" onselectstart="return false">
                        <img src="./resource/message/images/14.png" pid="14" class="PortImg" title="头像">
                    </div>
                    <div class="PersonalInfo">
                        <input type="text" class="InfoContent InfoNn" placeholder="昵称(必填)">
                        <input type="text" class="InfoContent InfoEm" placeholder="您的电子邮箱(用于通知,必填)">
                        <input type="text" class="InfoContent InfoWs" placeholder="您的博客网址(可选)">
                    </div>
                </div>
                <div class="CContent">
                    <textarea name="" class="Ccontents" placeholder="来说两句吧..."></textarea>
                </div>
                <div class="Csubmit"  onselectstart="return false" pid="0" aid="0">
                    发布评论
                    <i class="Ctriangle"></i>
                </div>
            </div>
            <?php if($htmlStr){ ?>
            <div class="CMain">
                <div class="CMTitle">
                    <div class="MTContent">评论</div>
                    <div class="MTCount">
                        共计
                        <span class="TCNumber"><?php echo $count; ?></span>条评论
                    </div>
                </div>
                <div class="CMLists">
                    <div class="MLTitle">
                        <i class="LTBg"></i>
                        最新评论
                    </div>
                    <!------    评论列表    ------->
                    <div class="MLContents">
                        <?php echo $htmlStr; ?>
                    </div>
                </div>
            </div>
            <?php }else{ ?>
                <div class="emptyTips">还没有评论，快来抢沙发吧！</div>
            <?php } ?>
            <div class="emptyDiv"></div>
        </div>
        <?php echo $pageStr; ?>
    </div>
</block>