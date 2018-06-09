//通过var定变量 ES5中没有块作用域{ }外可以访问{ }内变量，由于没有块作用域，容易造成变量污染
//例1：
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};

var a=2,b=3;
if(a<b){
    var userId = 234;
}
//输出：userId =  234

var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};

(function () {
    var a=2,b=3;
    if(a<b){
        var userId = 234;
    }
}());
//输出：userId =  123

//例2：通过var定变量 ES5中没有块作用域{ }外可以访问{ }内变量
{
    var a = 23;
}
console.log(a);//由于没有块作用域，a可以正常输出 23

//例3
for(var i=0;i<5;i++){
    //do somethings
}
console.log("i:",i);//此处i依然存在  输出 i: 5

for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000*i);
}
console.log("i：",i);  //i： 3

//通过IIFE解决变量共享问题
for (var i = 0; i < 3; i++) {
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000*i);
    })(i);
}
/*输出：
Thu Jun 07 2018 19:39:54 GMT+0800 (中国标准时间) 0
Thu Jun 07 2018 19:39:55 GMT+0800 (中国标准时间) 1
Thu Jun 07 2018 19:39:56 GMT+0800 (中国标准时间) 2
*/

//在ES6中使用了let就可以避免var所带来的问题
let userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};

let a=2,b=3;
if(a<b){
    let userId = 234;//userId不会冲出{}所在的区域
}
//输出123

//let 定义的变量 并不像 var 那样直接作为全局对象的属性
var x = 23;
let y = 34;
console.log(window.x,window.y);//23 undefined

//关于const
const PI = 3.1415926;
console.log(PI);
// PI = 3;//给常量再赋值 报错

//声明时必须赋值,一旦声明必须立即初始化
//const foo;//报错
//const foo = 123;//ok

//const作用域同let
if(true){
    const MAX = 5;
}
//console.log(MAX);//报错


//const 除了声明常量外，也常用来声明不变的函数
const fee = function () {

};

//const指向的对象引用不可变，但其属性或元素（如果是数组对象的话）是可变的
const a = [];
a.push(123,234);//可以
a.length = 1;//可以
a = "str";//报错，因为a是const其元素或属性可改，但其引用不能修改类似于 const指针


//变量提升
//（1）
var temp = new Date();
function f() {
    console.log(temp);//在函数里里面的if中有temp，在函数区域内变量提前，输出：undefined
    if(false){
        var temp = "Hi!";
    }
}
f();

//（2）
var temp = new Date();
function f() {
    console.log(temp); //let在if的{}里，会将{}区域锁死，外面访问不到temp变量，此时temp变量往外找
    if(false){
        let temp = "Hi!";
    }
}
f();
//输出：Thu Jun 07 2018 20:04:05 GMT+0800 (中国标准时间)

// ES6中 let和const 不进行变量提升特性
//var 声明变量
console.log(a);
var a = 1;
console.log(a);

//预解析 上述代码等效于
var a;
console.log(a);
a = 1;
console.log(a);

//用let声明变量
console.log(a);//报错
let a = 2;
console.log(a);
