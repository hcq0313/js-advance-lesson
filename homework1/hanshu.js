//函数的定义方式
//1、通过函数名来定义（要有函数名）
function max(a,b){
    return a>b?a:b;
}
max(2,3);

//2、函数定义 函数表达式方式 等号右侧可以是匿名函数也可以是非匿名函数
var max = function (a,b){ //匿名函数
    return a>b?a:b;
};
max(2,3);

//3、函数定义 Function构造函数方式
var max = new Function("a","b","return a>b?a:b");
max(2,3);

//函数的调用方式
//1、普通函数直接调用
function test1() {
    console.log("this is",this);
}
test1();//window

//2、对象方法调用
var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
obj.test();//调用对象的方法23（this为调用此方法的对象）
//给obj动态添加方法
var sayHi = function () {
    console.log("Hi，i'm",this.name);
};
obj.sayHi = sayHi;//添加给对象添加方法
obj.sayHi();
//思考：若直接调用sayHi();
//var name = "全局";
//sayHi();  输出  Hi，i'm


//3、通过call和apply间接调用
//3（1）call间接调用的对象要和原对象之间，在数据结构上有对应的相似处，以便不影响调用效果
objA = {name:"AA"};
objB = {name:"BB"};
objA.foo = function(){
    console.log(this.name);
};
objA.foo();//AA
objA.foo.call(objB);//BB
//3（2）实例二 移花接木 吸星大法
var fish = {
    name:"fish",
    swim:function (m,n) {
        console.log("i'm "+this.name+" i cam swim ___",m,n);
    }
};

var bird = {
    name:"polly",
    fly:function(m,n){
        console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
};

var me = {
    name:"ABC"
};

bird.fly(5,6);              //i'm:polly i can fly ___ 5 6
fish.swim.call(me,3,4);     //i'm ABC i cam swim ___ 3 4
bird.fly.call(me,7,8);      //i'm:ABC i can fly ___ 7 8

//swim(1,2);与swim.call(null,1,2);相同


var x=45;
var obj={
    x:23,
    test:function(){
        function foo(){
            console.log(this.x);
        }
        foo();
    }
};
obj.test();
45
//嵌套函数里的function指的是window下的function

上课例题：
var x=45;
var test=function(){
    console.log("输出：",this.x);
}
var obj={
    x:23
};
obj.test=test;
obj.test();
test();
输出： 23
输出： 45  //直接写指的是window下的

//函数参数问题
//实参数量大于形参的情况（通过函数对象属性arguments获得所有实参、类数组对象）
//实参数量小于形参的情况（少的参数值为undefined、可使用| |来给出默认值）


//实参数大于形参数
function test() {
    console.log(arguments);//console.log(test.arguments==arguments,arguments);
    // console.log(arguments.length);
	// console.log(typeof arguments);
	// console.log(arguments instanceof Array);
	// console.log(arguments instanceof Object);
    console.log(Array.prototype.slice.call(arguments));
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}
test("hello,", "world!");//"hello,world!"

//实参数小于形参数
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));
console.log(sum(1,2));
console.log(sum(1));


//值传递与引用传递
//（1）实参为基本数据类型时，形参改变不影响实参（值传递）
var a = 1;
function foo(x) {
    console.trace("a:",a," x:",x);
    x = 2;//step 2222
    console.trace("a:",a," x:",x);//step 3333
}

console.trace("a:",a);
foo(a);// step 1111
console.trace("a:",a); // step 4444  a仍为1



//（2）实参为引用类型时，形参改变影响实参
var obj = {x:1};
function fee(o){
    console.trace("obj.x :",obj.x," o.x :",o.x);
    o.x = 3;// step 2222
    console.trace("obj.x :",obj.x," o.x :",o.x);// step 3333
}

console.trace("obj.x :",obj.x);
fee(obj);// step 1111
console.trace("obj.x :",obj.x);//step 4444  obj.x被改写为3

//打开index.html 学习chrome的Sources调试
document.onclick = function () {//测试Event Listener Breakpoints
    alert("click");
    //var body =  document.getElementsByName("body");
};













