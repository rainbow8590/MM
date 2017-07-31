

/*tab栏*/
tab("tab-tit","tab-con")
function tab(obj1,obj2) {
    var obj1=document.getElementById(obj1);
    var obj2=document.getElementById(obj2);
    var spans=obj1.getElementsByTagName("span");
    var divs= obj2.getElementsByTagName("div");
    for(var i=0 ; i<spans.length;i++){
        spans[i].onmouseover =function (num){
            return function(){
                for(var j=0 ;j< spans.length;j++){
                    spans[j].className = "";
                    divs[j].className = "item";
                }
                spans[num].className = "curr";
                divs[num].className = "item show";
            }
        }(i) ;

    }
}

/*鼠标经过 文字显示*/
showHide("ul1")
showHide("ul2")
showHide("ul3")
function showHide(obj){
    var lisBox = document.getElementById(obj).getElementsByTagName("li")
    for(var i = 0; i < lisBox.length ; i++){
        lisBox[i].onmouseover = function(){
            this.getElementsByTagName("p")[0].style.display = "block";
        }
        lisBox[i].onmouseout = function(){
            this.getElementsByTagName("p")[0].style.display = "none";
        }
    }

}