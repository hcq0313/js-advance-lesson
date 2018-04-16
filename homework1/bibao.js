一、闭包的概念
闭包引入
function f1(){
	var x = 1;
	function f2(){
		return x++;
	}
	return f2();
}
var f3 = f1();
//观察f1中的x变量
console.log(f3);//输出1
console.log(f3);//输出1
//return x。 但是因为x在function里面，用完会被释放掉，所以1不变

function f1(){
	var x = 1;
	function f2(){
		return x++;
	}
	return f2;
}
var f3 = f1();
//观察f1中的x变量
console.log(f3());//1
console.log(f3());//2
//f2的函数与x形成了一个闭包

**闭包的概念
闭包是由函数和与其相关的引用环境组合而成的实体
闭包是词法作用域中的函数和其相关变量的包裹体

例1、
function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//6
console.log(inc(2));//8
inc = createInc(5);
console.log(inc(1));//6
//前两次输出中，startValue常驻内存
//第三次输出前，新创建了一个闭包，startValue重新创建


若一个函数离开了它被创建时的作用域，它还是会与这个作用域的变量相关联
闭包是一个函数外加上该函数创建时所建立的作用域

function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar;
}
var a = foo();
var b = foo();
a();//1
a();//2
b();//1
//函数bar和其相关词法上下文中的变量i，构成了一个闭包
//返回的函数bar，依然能够访问到变量i
//a和b分别对应两个闭包


二、闭包的常见形式（以函数对象形式返回）

例题1：
var tmp = 100;//词法作用域,形成的闭包不包含此行的变量tmp
function foo(x) {
    var tmp = 3;//词法作用域，若屏蔽此行，tmp指的是全局的100。
    return function (y) {
        console.log(x + y + (++tmp));
    }
}
var fee = foo(2); // fee 形成了一个闭包
fee(10);//16
fee(10);//17
fee(10);//18

例题2：
function foo(x) {
    var tmp = 3;
    return function (y) {
        x.count = x.count ? x.count + 1 : 1;
        console.log(x + y + tmp,x.count);
    }
}
var age = new Number(2);
var bar = foo(age); //和相关作用域形成了一个闭包
bar(10); //15 1
bar(10); //15 2
bar(10); //15 3

例题3、
function fn() {
    var max = 10;//若屏蔽此行，则输出为多少？
    return function bar(x) {
        if(x > max){
            console.log(x);
        }else {
            console.log(max);
        }
    }
}
var f1 = fn();
var max = 100;
f1(15);
//结果15  因为var max = 100;指的是全局的max，根据词法作用域，往上找，max=15.

function counter() {
    var n = 0;
    return {
        count:function () {return ++n;},
        reset:function () {n = 0;return n;}
    }
}
var c = counter();
var d = counter();
console.log(c.count());//1
console.log(d.count());//1
console.log(c.reset());//0
console.log(c.count());//1
console.log(d.count());//2

三、闭包的应用案例
// 比如说我现在的需求是这样的，在网页中有时候会需要遮罩层，调用的时候我就创建一个，
// 但是你不可能每次调用创建，所以如果存在就用以前的，如果不存在就创建新的
function fn() {
    var a;
    return function() {
        return a || (a = document.body.appendChild(document.createElement('div')));
    }
};
var f = fn();
f();

var db = (function() {
// 创建一个隐藏的object, 这个object持有一些数据
// 从外部是不能访问这个object的
    var data = {};
// 创建一个函数, 这个函数提供一些访问data的数据的方法
    return function(key, val) {
        if (val === undefined) { return data[key] } // get
        else { return data[key] = val } // set
    };
// 我们可以调用这个匿名方法
// 返回这个内部函数，它形成了一个闭包
})();

db('x'); // 返回 undefined
db('x', 1); // 设置data['x']为1
db('x'); // 返回 1
// 我们不能直接访问data这个object本身
// 但是我们可以设置它的成员

(function () {
    var m = 0;
    function getM(){
        return m;
    }
    function setM(val){
        m = val;
    }
    window.g = getM;
    window.f = setM;
}());
f(100);
g();
//setm的值会覆盖掉上面m的值