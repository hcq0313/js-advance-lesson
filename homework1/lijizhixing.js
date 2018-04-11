立即执行表达式的最常用的两种写法：、
//立即执行表达式 常见形式
(function max( x,y){
    console.log("the max is",x>y?x:y);
}(2,3));

(function (x,y){ //可以没有函数名
    console.log("the min is",x<y?x:y);
})(2,3);
//括号可以加在{}后，也可以在最后传值的小括号里

与运算符结合的写法（执行函数，进行运算）：
var i = function(){
    return 10;
}(); //i为10

var i = function(){
    return 10;
}; //不加小括号的时候，i是一个函数

true && function(a,b){
    return a>b?a:b;
}(5,9);  
//如果把true变成0的话，直接返回0，因为不满足&&

!function(x,y){
    return x==y?true:false; // true加！之后变成了false
}("5",5);

通过IIFE对作用域的改变（限制变量生命周期）
JS（ES5）中没有块作用域，容易造成js文件内或文件间的同名变量互相污染
我们往往会通过IIFE引入一个新的作用域来限制变量的作用域，来避免变量污染

function f(){
    var getNumFuncs = [];//函数数组
    var i=0;
    for(;i<10;i++){
        getNumFuncs[i] = function(){
            return i;
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();
//都是10，因为存在变量共享问题

function f(){
    var getNumFuncs = [];//函数数组
    for(var i=0;i<10;i++){
        (function (j) {
            getNumFuncs[j] = function(){return j;};
        })(i);
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//输出为3，tmp[0]()...tmp[9]()都为是期望的结果


//局部变量的案例
function f(){
    var getNumFuncs = [];//函数数组
    var j;
    for(var i=0;i<10;i++){
        j = i;
        getNumFuncs[i] = function(){
            return j;//如果return i;的话输出几？
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();

var tabs = document.getElementsByClassName('tabs')[0].children;
var contents = document.getElementsByClassName('show')[0];

for(var i=0;i<tabs.length;i++) {
    (function (i) { 	//IIFE start
        tabs[i].onclick=function(){
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].className = '';
            }
            this.className = "active";
            contents.innerHTML = "导航" + i + "内容";
        };
    }(i));			//IIFE end
}


