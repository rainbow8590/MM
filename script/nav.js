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