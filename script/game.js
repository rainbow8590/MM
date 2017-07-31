
/*页面加载时 动画*/

/*当页面滚动时 设置对象的属性*/
function setStyle(Parent, tag, i, attr, value, time) {
    var Object = Parent.getElementsByTagName(tag)[i];
    Object.style[attr] = value + 'px';
    Object.style.opacity = '1';
    Object.style.transition = time;
}
window.onload = window.onresize = window.onscroll = function() {
    var gameBox = document.getElementById('gameBox');
    var happyGame = document.getElementById('happy_game');
    /*获取滚动的高度*/
    var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollH >= 0) {
        setStyle(gameBox, 'img', 0, 'top', 0, '1.5s');
        setStyle(gameBox, 'img', 0, 'left', 0, '1.5s');
        setStyle(gameBox, 'img', 1, 'top', 0, '1.5s');
        setStyle(gameBox, 'img', 1, 'right', 0, '1.5s');
        setStyle(gameBox, 'p', 0, 'left', 0, '1.5s');
        setTimeout(function () {
            setStyle(gameBox, 'img', 2, 'top', 0, '1.5s');
            setStyle(gameBox, 'img', 2, 'right', 0, '1.5s');
        }, 300)
    }

    if (scrollH > 300) {
        setStyle(gameBox, 'img', 3, 'top', 0, '1.5s');
        setStyle(gameBox, 'img', 3, 'left', 0, '1.5s');
        setStyle(gameBox, 'img', 4, 'top', 0, '1.5s');
        setStyle(gameBox, 'img', 4, 'left', 0, '1.5s');
    }
    if (scrollH > 830) {
        setStyle(happyGame, 'img', 0, 'bottom', 0, '1.5s');
        setStyle(happyGame, 'img', 0, 'right', 0, '1.5s');
    }


    /*游戏分类*/
    var oImg1 = document.getElementById('game_item1');
    var oImg2 = document.getElementById('game_item2');
    var oImg3 = document.getElementById('game_item3');
    var oImg4 = document.getElementById('game_item4');
    var oImg5 = document.getElementById('game_item5');
    if (scrollH > 1000) {
        setStyle(oImg1, 'img', 0, 'width', 176, '1s');
        setStyle(oImg2, 'img', 0, 'width', 176, '1.5s');
        setStyle(oImg3, 'img', 0, 'width', 176, '2s');
        setStyle(oImg4, 'img', 0, 'width', 176, '2.5s');
        setStyle(oImg5, 'img', 0, 'width', 176, '3s');
    }


    /*快乐生活 快乐游戏*/
    var gameHap = document.getElementById('game_hap');
    if(scrollH>=1480) {
        setStyle(gameHap, 'img', 1, 'left', 0, '2s');
        setTimeout(function(){
            setStyle(gameHap, 'img', 2, 'left', 300, '3s');
        },100)

        setStyle(gameHap, 'img', 3, 'left', 0, '3s');
        setStyle(gameHap, 'img', 4, 'top', 0, '2s');
        setStyle(gameHap, 'img', 5, 'left', 0, '5s');
        setStyle(gameHap, 'img', 6, 'top', 0, '5s');
    }

    /*游戏分类鼠标移上去效果*/

    var gameItem = document.getElementById("game_item").getElementsByTagName('dl');
    over();
    function over(){
        for(var i=0;i<gameItem.length;i++) {
            var dts = gameItem[i].getElementsByTagName('dt')[0].getElementsByTagName('img')[0];
            dts.onmouseover = function(){
                this.style.width = '187px';
            }
            dts.onmouseout = function(){
                this.style.width = '176px';
            }
        }
    }


}



/*轮播图*/
$(function(){
    var box = document.getElementById('box');
    var oUl = document.getElementById('ul1');
    var aLi = oUl.children;
    var olLi = document.getElementById('ol1').children;

    var oW = aLi[0].offsetWidth;
    var iNow =0;
    var isOff = true;

    olLi[0].className = "cur";
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.left = oW + 'px';
    }

    for(var k in olLi){
        olLi[k].onclick = function(){
            /*判断是否在运动 运动就返回*/
            if( !isOff ){ return; }
            isOff = false;
            var that = this.innerHTML-1
            if( that > iNow ){ //左边
                aLi[that].style.left = oW + 'px';
                move(aLi[iNow],{left : -oW},500);
            }else if(that < iNow){//右边
                aLi[that].style.left = -oW + 'px';
                move(aLi[iNow],{left : oW},500);
            }
            iNow = that
            move(aLi[iNow],{left : 0},500);
            circle()
            isOff = true;
        }
    }

    function circle(){
        for(var i=0;i<olLi.length;i++){
            olLi[i].className = '';
        }
        olLi[iNow].className = 'cur';
    }

    var timer = setInterval(autoplay,1000)
    function autoplay(){
        move(aLi[iNow],{left:-oW},500);
        ++iNow>aLi.length-1?iNow = 0:iNow;
        aLi[iNow].style.left = oW + "px";
        move(aLi[iNow],{left:0},500);
        circle()
    }

    box.onmouseover = function(){
        clearInterval(timer)
    }
    box.onmouseout = function(){
        timer = setInterval(autoplay,1000)
    }
})

/*二维码弹出层*/
$(function(){
    $("#game_item dl").click(function(){
        $(".er").eq($(this).index()).show()
    })
    $(".er .er-wrap .close").click(function(){
        $(this).parent().parent().hide()
    })
})