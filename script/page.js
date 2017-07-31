window.onload = window.onscroll = window.onresize= function(){
    /*IE和谷歌走onmousewheel 火狐走DOMMouseScroll必须由绑定事件触发*/

    /*封装事件绑定函数*/
    function AddEvent(obj,type,fn){
        if(obj.addEventListener)
        {
            obj.addEventListener(type,fn,false); //其它标准浏览器
        }
        else{
            obj.attachEvent('on'+type,fn)  // Ie 谷歌
        }
    }

    function Wheel(obj,callback){
        /*滚轮兼容判断 火狐*/
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1) {
            AddEvent(obj,'DOMMouseScroll',fn)
        }else{
            AddEvent(obj,'mousewheel',fn);
        }

        /*封装滚轮鼠标上下滑事件  IE和chrome走ev.wheelDelta  firefox走ev.detail*/
        function fn(e){
            var e = e || event;
            var Down = true; //判断滚轮上下方向
            if(e.wheelDelta) {
                Down = e.wheelDelta>0?true:false;
            }else{
                Down = e.detail <0 ?true:false;
            }
            callback && callback(Down);
            if(e.preventDefault){
                e.preventDefault();
            }
            //取消事件的默认操作
            window.event.returnValue = false

        }

    }

    /*回调函数使用*/
    var timer = null;                                                          //定时器变量
    var onOff = true;                                                          //滚轮 滚动开关
    /*让IE兼容getElementsByClassName*/
    if(!document.getElementsByClassName){
        document.getElementsByClassName = function(className, element){
            var children = (element || document).getElementsByTagName('*');
            var elements =[];
            for (var i=0; i<children.length; i++){
                var child = children[i];
                var classNames = child.className.split(' ');
                for (var j=0; j<classNames.length; j++){
                    if (classNames[j] == className){
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;
        };
    }

    var wrapDiv = document.getElementById('oBox');
    //动画DOM
    var moveBox = document.getElementById('oBoxWrap');
    //获取可视高度
    var oCh = document.documentElement.clientHeight||document.body.clientHeight;
    //获取每个可视区容器
    var oDiv = document.getElementsByClassName('item');
    //动态设置DOM 高度
    wrapDiv.style.height = oCh+'px';

    /*小按钮轮播效果*/
    var oBtn = document.getElementById('circle');
    var aLiBtn = oBtn.getElementsByTagName('li');
    var aSpan = oBtn.getElementsByTagName('span');

    for(var i= 0; i < oDiv.length; i++){
        if(i == 0){
            aSpan[i].className="current";
        }
        oDiv[i].style.height = oCh+'px';

      /*  aSpan[i].attributes['data-value']=i;*/
    }

    /*运动函数*/
    var animate = function(Index){
        for(var i = 0; i < aSpan.length; i++){
            aSpan[i].className = "";
            if(i == Index){
                aSpan[Index].className = "current";
            }
        }
        moveBox.style.top = -oCh*Index+'px';
    };

    for(var i=0;i<aLiBtn.length;i++){
        aLiBtn[i].index = i;
        aLiBtn[i].onclick = function(){
            /*切换小按钮当前效果*/
            var Index = this.index;
            aBtnClick(Index)
        }

        function aBtnClick(Index){
            animate(Index);
        }
    }

    /*获取当前CUR 位置*/
    var getCurrent = function(){
        for(var i = 0; i < aSpan.length; i++){
            if(aSpan[i].className=='current'){
                return i;
            }
        }
    };

    Wheel(document,function(T){
        if(onOff){
            clearTimeout(timer);
            onOff = false;
            var Index = getCurrent();                                              //获取当前CUR 位置
            if(T){/*鼠标向上滚动*/
                var I = Index-1;
                if(I>=0){
                    animate(I);
                }
                timer = setTimeout(function(){
                    onOff = true;
                },500);
            }else{/*鼠标向下滚动*/
                var I = Index+1;
                if(I<aSpan.length){
                    animate(I);
                }
                timer = setTimeout(function(){
                    onOff = true;
                },500);
            }
        }
    })

}		
   