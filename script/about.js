
/*简介图片拖动*/
darg()
function darg(){
    var oBox = document.getElementById("about-img-wrap");
    var oDiv = document.getElementById("about-img");
    var iL = oBox.offsetLeft;
    var iT = oBox.offsetTop;
    document.onmousemove = function(ev){
        var ev = ev || window.event;
        var l = ev.clientX - iL;
        var t = ev.clientY - iT;

        if(l < oDiv.offsetWidth/2){
            l = oDiv.offsetWidth/2;
        }else if(l > oBox.clientWidth - oDiv.offsetWidth/2){
            l = oBox.clientWidth - oDiv.offsetWidth/2;
        }

        if(t < oDiv.offsetHeight/2+10){
            t = oDiv.offsetHeight/2+10;
        }else if(t > oBox.clientHeight - oDiv.offsetHeight/2){
            t = oBox.clientHeight - oDiv.offsetHeight/2;
        }

        oDiv.style.left = l - oDiv.offsetWidth/2-10 + 'px';
        oDiv.style.top = t - oDiv.offsetHeight/2-10 + 'px';

    }
}

/*历史 事件*/
$(function () {
    //首页大事记
    $('.history-container  li').hover(function(){
        $(this).find('.shiji').stop(true,true).slideDown(500);
    },function(){
        $(this).find('.shiji').stop(true,true).slideUp(300);
    });
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