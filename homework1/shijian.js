//JS事件是浏览器或用户自身执行的某种动作（包括前端中的事件、Node中的事件等）
//前端事件主要包括BOM或DOM中发生的特定的交互
//常见事件（load、click、mouseover、keydown、keyup等）

/*  例1：
<head>
    <meta charset="UTF-8">
    <title>事件及事件对象</title>
    <link rel="stylesheet" href="style.css">
    <script src="demo01.js">
    </script>
</head>

<body>
    <!-- 点击事件和显示事件对象主要属性 -->
    <div id="div1" onclick="div1click()"> //调用函数
    </div>
    <div id="div2">
    </div>
</body>
*/

window.onload = function () {
    console.log("window onload");
    var div2 = document.getElementById("div2");
    //思考：将下述7到11行代码写在window.onload回调函数外会怎样
    div2.onclick = function () {
        console.log("div2 click");
    }
    // div2.onmouseover = function () {
    //     console.log("div2 mouseover");
    // }
}
function div1click() {
    console.log("div1 click");
    //console.log("this:", this);
}
/*例2：
<head>
    <meta charset="UTF-8">
    <title>Html事件响应</title>
    <link rel="stylesheet" href="style.css">
    <script src="demo02.js"></script>
</head>

<body>
    <!-- 点击事件和显示事件对象主要属性 -->
    <div id="div1" onclick="div1click()">
    </div>
    <div id="div2">
    </div>
</body>
*/

window.onload = function (e) {
    // console.log("window onload");
    // console.log("e:", e);
    // console.log(e.target);
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        // 测试0
        console.log(e.type);  //click
        console.log(e.target); //指的是div1或者div2

        // 测试1
        // console.log(e.clientX,e.clientY);
        // console.log(this, "-----", e.target.id);

        // 测试2
        // console.log(e);   
        // console.log(e.__proto__);
        // console.log(e.__proto__.__proto__);
        // console.log(e.__proto__.__proto__.__proto__);
        // console.log(e.__proto__.__proto__.__proto__.__proto__);

        // 测试3
        // for(var k in e){
        //     console.log(k,e[k]);
        // }
        // for(var k in e.__proto__){
        //     console.log(k);
        // }
        // for(var k in e.__proto__.__proto__){
        //     console.log(k);
        // }
        // for(var k in e.__proto__.__proto__.__proto__){
        //     console.log(k);
        // }
    }
    div1.onclick = eventHandler;
    div2.onclick = eventHandler;

    //自定义事件监听、事件分发
    // document.addEventListener("xx",function(){console.log("11")});  //11
    // document.dispatchEvent(new Event("xx"));
}
 //测试1
console.log(e.clientX,e.clientY); //81 122
console.log(this, "-----", e.target.id); //this指的是div1的标签，e.target.id是div1

// 测试2
console.log(e);   //MouseEvent
console.log(e.__proto__);  //MouseEvent
console.log(e.__proto__.__proto__);  //UIEvent
console.log(e.__proto__.__proto__.__proto__);  //Event
console.log(e.__proto__.__proto__.__proto__.__proto__);  //{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        console.log(e.clientX,e.clientY);
    }
    div1.onclick = eventHandler;
    div1.onclick = function(){
        console.log("xx");
    };//思考：会覆盖掉上一个事件绑定
    div2.onclick = eventHandler;
    //div2.onclick = null;//取消事件响应
}

//测试3 DOM2级事件处理
window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        console.log(e.clientX,e.clientY);
    }
    div1.addEventListener("click",eventHandler);
    // div1.addEventListener("click",eventHandler,false);//第3个参数可选
    div1.addEventListener("click",function(){
        console.log("xx");
    });//加上事件监听，两个绑定语句都会输出
    div2.addEventListener("click",eventHandler);
    //div2.addEventListener("click",eventHandler,false);
    //div2.removeEventListener("click",eventHandler);//取消事件响应处理
        //自定义事件、事件分发、事件监听
        div2.addEventListener("MyEvent",function(){console.log("处理自定义事件")});
        div2.dispatchEvent(new Event("MyEvent"));
        
        //addEventListener、removeEventListener、dispatchEvent这3个方法都是定义在哪个原型上的？？？？？？？？
        // console.log(div2.__proto__);
        // console.log(div2.__proto__.__proto__);
        // console.log(div2.__proto__.__proto__.__proto__);
        // console.log(div2.__proto__.__proto__.__proto__.__proto__);
        // console.log(div2.__proto__.__proto__.__proto__.__proto__);
        // console.log(div2.__proto__.__proto__.__proto__.__proto__.__proto__);
        //EventTarget 是一个由可以接收事件的对象实现的接口，并且可以为它们创建侦听器
}