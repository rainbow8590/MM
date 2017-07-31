
/*圆点*/
$(function(){
    var circleH = document.getElementById("circle").offsetHeight;
    $(".slider-circle").css({"margin-top":-circleH/2+"px"});
});

/*导航*/
nav()
function nav(){
    var navList = document.getElementById("navList");
    var oLi = navList.children;
    var oBg = document.getElementById("navLine");
    for(var i=0;i<oLi.length;i++) {
        oLi[i].onmouseover = function(){
            starmove(oBg,this.offsetLeft)
        }
    }

    var speed = 0;
    var left = 0;
    function starmove(obj,target){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            speed = speed+ (target-obj.offsetLeft)/5;
            speed *= 0.7;
            left += speed;
            if(Math.abs(speed)<1 && Math.abs(target)<1)
            {
                clearInterval(obj.timer);
                obj.style.left = target+'px';
            }else{
                obj.style.left = left+'px';
            }
        },30)
    }
};

/*banner 区域*/

/*左下方图片 和 箭头圆点*/
$(function(){
    $(".bottom-container ul li").hover(function(){
        $(this).find("a img").stop().animate({marginTop:"-168px"},500)
    },function(){
        $(this).find("a img").stop().animate({marginTop:"0"},500)
    })
    $(".arrow-circle span img").first().animate({marginTop:'-23px'})
});

/*banner动画*/
$(function(){
        var div = $("#banner_box div");
        var divLen = div.length;
        var divWidth = div.width();
        var spanBtn = $(".arrow-circle span img");
        $("#banner_box").css({width:divLen*divWidth});
        var num = 0;
        var n2 = 0;
        var timer = null;
        $('.arrow-prev').stop().animate({opacity:0.3});
        /*下一个*/
        $('.arrow-next').click(function(){
            clearInterval(timer);
            num++;
            if(num>divLen-1)
            {
                num = divLen-1;
            }
            spanBtn.stop(true,true).animate({marginTop:"-23px"});
            StyleM()
            IconNum(num);
        });


        /*上一个*/
        $(".arrow-prev").click(function(){
            clearInterval(timer);
            num--;
            if(num<0)
            {
                num = 0;
            }
            StyleM()
            IconNum(num);
        })

        /*循环每个小按钮*/
        spanBtn.each(function(t,elem){
            clearInterval(timer)
            $(this).click(function(){
                num = t;
                IconNum(t);
                n2 = t;
            })
        })

        $(".arrow-circle").hover(function(){
            clearInterval(timer);
        },function(){
            clearInterval(timer)
            autoPlay();
        })
        /*第一张banner图片效果*/
        IconNum(num)
        /*封装当前小按钮*/
        function IconNum(num){
            /*改变当前小按钮*/
            spanBtn.stop(true,true).animate({marginTop:"0"})
            spanBtn.eq(num).stop(true,true).animate({marginTop:"-23px"});

            /*左右箭头显示与消失*/
            if(num == spanBtn.length-1){
                $('.arrow-next').stop(true,true).css({opacity:0.3,cursor:'auto'});
            }else{
                $('.arrow-next').stop(true,true).css({opacity:1,cursor:'pointer'});
            };
            if(num == 0) {
                $('.arrow-prev').stop(true,true).css({opacity:0.3,cursor:'auto'});
            }else{
                $('.arrow-prev').stop(true,true).css({opacity:1,cursor:'pointer'});
            };

            StyleM()
            /*图片运动*/
            if(num == 0) {
                /*第一张banner图片效果*/
                $(".pic1").find('.titleImg').css({top:"139px"})
                $(".pic1").find('.titleTxt').css({left:0});
                $(".pic1").find('.banner-bigImg').css({WebKitTransformOrigin:'right',WebkitTransform:'rotate(-360deg)',top:0,right:0})
            };

            if(num == 1) {
                /*第二张banner图片效果*/
                $(".pic2").find('.titleImg').css({top:"139px",TransformOrigin:'0 0',WebkitTransform:'rotate(0deg)'});
                $(".pic2").find('.titleTxt').css({top:"150px",TransformOrigin:'0 0',WebkitTransform:'rotate(0deg)'})
                $(".pic2").find('.banner-bigImg').css({top:0,right:0})
            };

            if(num == 2) {
                /*第三张banner图片效果*/
                $(".pic3").find('.titleImg').css({top:"139px",WebkitTransform:'scale(1)'});
                $(".pic3").find('.titleTxt').css({left:0,WebkitTransform:'scale(1) rotate(360deg)'})
                $(".pic3").find('.banner-bigImg').css({top:0,right:0,WebkitTransform:'scale(1.1) rotate(360deg)'})
            };


            $("#banner_box").stop(true,true).animate({left:-(num*divWidth)+'px'})

        }

        /*banner 图片默认样式*/
        function StyleM(){
            $(".pic1").find('.titleImg').css({top:"89px"});
            $(".pic1").find('.titleTxt').css({left:"-50px"});
            $(".pic1").find('.banner-bigImg').css({top:"-500px",right:"200px"});

            $(".pic2").find('.titleImg').css({top:"220px"});
            $(".pic2").find('.titleTxt').css({top:"200px"});
            $(".pic2").find('.banner-bigImg').css({top:"-100px",right:"100px"});

            $(".pic3").find('.titleImg').css({top:"109px"});
            $(".pic3").find('.titleTxt').css({left:"200px"});
            $(".pic3").find('.banner-bigImg').css({top:"-60px",right:"100px"});
        }

    /*三秒自动轮播*/
    clearInterval(timer);
    autoPlay()
    function autoPlay(){
        timer = setInterval(function(){
            num++;
            if(num>divLen-1)
            {
                num = 0;
            }
            StyleM();
            IconNum(num);
        },3000)
    }



})

/*主播图片切换*/
$(function() {
    var scrollBox = document.getElementById('botton-scroll');
    var scrolloUl = scrollBox.getElementsByTagName('ul')[0];
    var lis = scrollBox.getElementsByTagName('li');
    var imgs = scrollBox.getElementsByTagName("img")
    var len = lis.length;
    var oW = lis[0].offsetWidth
    var oM = 3;
    var oBtnL = document.getElementById('prev');

    var oBtnR = document.getElementById('next');

    var n = 0;
    var timer = null;
    var bBtn = true;

    scrolloUl.style.width = len * oW + 'px';
    var iNum = 3;
    /*下一张*/
    oBtnR.onclick = function () {
        n++;
        fn1(lis);
    }
    /*上一张*/
    oBtnL.onclick = function () {
        n--;
        fn1(lis);
    }

    function fn1(obj) {
        if (n == 0) {
            obj[0].style.position = 'static';
        }
        if (n == obj.length - 1) {
            obj[obj.length - 1].style.position = 'static';
        }

        if (n == obj.length) {
            obj[0].style.position = 'relative';
            obj[0].style.left = oW * obj.length + 'px';
        }
        if (n > obj.length - 3) {
            obj[0].style.position = 'static';
            scrolloUl.style.left = 0;
            n = 1;
        }
        if (n == -1) {
            obj[obj.length - 1].style.position = 'relative';
            obj[obj.length - 1].style.left = -oW * obj.length - 1 + 'px';

        }
        if (n < -1) {
            obj[obj.length - 1].style.position = 'static';
            scrolloUl.style.left = -oW * (obj.length - 3) + 'px';
            n = obj.length - 4;
        }
        move(scrolloUl, {left: -n * oW}, 500, 'linear');
    }

/*
    /!*点击图片*!/
    var oPageBox = document.getElementById('Outer');
    var OImgCont = document.getElementById('ImgCont');
    var OImgList = OImgCont.getElementsByTagName('img');
    var aImgAll = document.getElementById('ImgBox');
    var BtnLeft = document.getElementById('BtnLeft');
    var BtnRight = document.getElementById('BtnRight')
    var aImgPic = document.getElementById('Img');
    var EarrorBox = document.getElementById("ErrorBox");
    var Earror = document.getElementById("Error");
    var LoadBox = document.getElementById('LoadBox');
    /!*加载*!/
    var num = 0;
    var onoff = true;
    for (var i = 0; i < aImg.length; i++) {
        aImg[i].index = i;
        aImg[i].onclick = function () {
            num = this.index;
            LoadBox.style.display = 'block';
            setTimeout(function () {
                LoadBox.style.display = 'none';
            }, 400)
            aImgEffect(num, function () {
                move(OImgCont, {'height': 468}, 200, 'linear');
                //OImgCont.style.height = '468px';
            });

        }
        //图片点击显示效果
        function aImgEffect(num, callback) {
            GetImg(aImg[num]);
            oPageBox.style.display = 'block';
            aImgAll.style.display = 'block'
            move(aImgPic, {'opacity': 1}, 200, 'linear');
            callback && callback();
        }

        function GetImg(obj) {
            var ImgSrc = obj.getAttribute('src')
            aImgPic.src = ImgSrc;

            LoadBox.style.display = 'block';
            setTimeout(function () {
                LoadBox.style.display = 'none';
            }, 400)

            //move(aImgPic,{'opacity':1},200,'linear');
//			setTimeout(function(){
//				move(aImgPic,{'opacity':1},200,'linear');
//			},400)
            move(aImgPic, {'opacity': 0}, 200, 'linear');
            setTimeout(function () {
                move(aImgPic, {'opacity': 1}, 200, 'linear');
            }, 600)
        }


        BtnLeft.onclick = function () {
            num--;
            if (num == -1) {
                num = -1;
                oPageBox.style.display = 'none';
                aImgAll.style.display = 'none';
            }
            GetImg(aImg[num]);
        }
        BtnRight.onclick = function () {
            num++;

            if (onoff) {
                move(aImgPic, {'opacity': 0}, 200, 'linear');
            } else {
                move(aImgPic, {'opacity': 1}, 200, 'linear');
            }
            //onoff = !onoff;
            //move(aImgPic,{'opacity':1},200,'linear');
            if (num > aLi.length - 2) {
                num = aLi.length - 2;
                oPageBox.style.display = 'none';
                aImgAll.style.display = 'none';
            }
            GetImg(aImg[num]);
        }
        /!*关闭*!/
        Earror.onclick = function () {
            oPageBox.style.display = 'none';
            aImgAll.style.display = 'none';
            move(aImgPic, {'opacity': 0}, 200, 'linear')
            move(OImgCont, {'height': 448}, 200, 'linear');
        }
        /!*左右透明度*!/
        var BtnLeftbox = document.getElementById("BtnLeftbox");
        var BtnRightbox = document.getElementById('BtnRightbox');
        BtnLeftbox.onmouseover = function () {
            this.style.opacity = 1;
        }
        BtnLeftbox.onmouseout = function () {
            this.style.opacity = 0;
        }

        BtnRightbox.onmouseover = function () {
            this.style.opacity = 1;
        }

        BtnRightbox.onmouseout = function () {
            this.style.opacity = 0;
        }

    }*/

})

/*鼠标经过主播图片显示文字*/
$(function(){
    $("#botton-scroll ul li").each(function(y){
        $(this).hover(function(){
            $("#botton-scroll ul li").find(".hid-txt").hide();
            $("#botton-scroll ul li").find(".hid-txt").eq(y).slideDown();
        },function(){
            $("#botton-scroll ul li").find(".hid-txt").hide();
        })
    })
})

/*下方表单*/
$(function(){
    $('.inp').focus(function(){
        if($(this).val() == this.defaultValue){
            $(this).val("");
        }
    }).blur(function(){
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    })
    $("input[type='reset']").click(function(){
        $('.inp').val(this.defaultValue)
    })
    $("input[type='submit']").click(function(e){
        e.stopPropagation();
        sendMessage();
    })
    function sendMessage(){
        var name = $('#name').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var content = $('#content').val();


        if(name == '' || name =='0' || name == '姓名'){
            alert('姓名不能为空');
            return '';
        }
        if(phone == '' || phone == '电话'){
            alert('电话不能为空');
            return '';
        }
        if(email == '' || email == '邮箱'){
            alert('邮箱不能为空');
            return '';
        }
        if(content == '' || content == '您的要求'){
            alert('请输入您的要求，我们会安排相关人员和您联系。');
            return '';
        }
        if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{5,11}$/.test(phone) && !/^(13|14|15|17|18)\d{9}/.test(phone)){
            alert('请输入正确的电话号码');
            return '';
        }
        if(!/^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(email) ){
            alert('请输入正确的email地址');
            return '';
        }

        $.ajax({
            type:'POST',
            url:'http://mmhd.com/index.php?r=account/sendMessage',
            data:{name:name,phone:phone,email:email,content:content},
            dataType: 'jsonp',
            async:false,
            success:function(data) {
                if(data.Flag != 100){
                    alert(data.FlagString);
                }
                else{
                    alert('留言成功，请耐心等待，我们将尽快与您联系');
                    $('#forms')[0].reset();
                    return '';
                }
            }
        });
    }
})

