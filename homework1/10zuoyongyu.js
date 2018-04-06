作用域就是变量与函数的可访问范围（变量生效的区域范围，即在何处可以被访问到）
作用域控制着变量与函数的可见性和生命周期，它也是根据名称查找变量的一套规则
var a = 10,
    b = 20;
function fn() {
    //fn局部作用域
    var a = 100,
        c = 200;
    //console.log(a,b,c,d);
    function bar() {
        //bar局部作用域
        var a = 500,
            d = 600;
        console.log(a,b,c,d);
    }
    bar();
}
fn();
//console.log(a,b,c,d);

/*变量d只能在bar作用域中被访问到，
变量c只能在fn和bar作用域中被访问到
在bar中访问a时为500（覆盖性）
在bar中访问c时为200（链式关系）*/

JS作用域特点（词法作用域）
JS采用的是词法作用域（静态性），这种静态结构决定了一个变量的作用域
词法作用域不会被函数从哪里调用等因素影响，与调用形式无关（体现了静态性）

var name = "Jack";
function echo() {
    console.log(name);
}
echo();


//词法作用域 与调用形式无关 实例一
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    echo();
}
foo();//Bill or Jack



//词法作用域 与调用形式无关 实例二
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    function fee(){
        var name = "Lucy";
        echo();
    }
    fee();
}
foo();//Bill or Jack


JS作用域特点（静态词法作用域补充部分）
通过new Function创建的函数对象不一定遵从静态词法作用域
对比下边两个例子（通过不同形式定义的函数对象，访问到的scope的区别）

var scope='global';
function checkscope(){
	var scope='local';
	return function(){
		return scope;
	};

}
console.log(checkscope()());
//结果：local


var scope='global';
function checkscope(){
	var scope='local';
	return new Function("return scope;");	
}

console.log(checkscope()());
//结果：global

//大多数语言都有块级作用域，但是JS（ES5）采用的是函数级作用域，没有块作用域

执行上下文
执行上下文指代码执行时的上下文环境（包括局部变量、相关的函数、相关自由变量等）
JS运行时会产生多个执行上下文，处于活动状态的执行上下文环境只有一个

代码执行时JS引擎会以栈的方式来处理和追踪函数调用（函数调用栈 Call Stack）
栈底对应的是全局上下文环境，而栈顶对应的是当前正在执行的上下文环境

作用域链与执行上下文
执行时，当前执行上下文，对应一个作用域链环境来管理和解析变量和函数（动态性）
变量查找按照由内到外的顺序（遵循词法作用域），直到完成查找，若未查询到则报错
当函数执行结束，运行期上下文被销毁，此作用域链环境也随之被释放

