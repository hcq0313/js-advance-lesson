js解析及执行简介

js脚本语言非提前编译，由解析器边解析边执行
过程：
（1）全局预解析阶段（**全局变量和**函数声明前置）
（2）全局顺序执行阶段（**变量赋值、**函数调用等操作）
（3）当遇到函数调用时，在执行函数内代码前，**进行函数范围内的预解析
（4）当存在函数调用时，以此类推，会进行多次函数预解析
*注：解析和执行时一个不断交替的过程

预解析主要工作（变量声明和函数声明提升）
（1）解析器在执行代码前的进行代码扫描（var function（）{}）
（2）将变量和函数声明在**当前作用域（全局、函数）内进行提升

变量声明提升案例
例1、
console.log(a);
var a = 1;
console.log(a);

//上边代码等价如下 解析器眼中的代码
var a;
console.log(a);
a = 1;
console.log(a);

例2、
console.log(a,b);//u u
var b = 23;
console.log(a,b);//u 23
var a = b;
console.log(a,b);//23 23

例3、
console.log(obj1,obj2);//u u
var obj1 = {x:23};
console.log(obj1,obj2);//{x: 23} undefined
var obj2 = obj1;
console.log(obj1,obj2);//{x: 23} {x: 23}
obj2.x =25;
console.log(obj1,obj2);//{x: 25} {x: 25}
例4、
foo();//f_2
function foo(){
    console.log("f_1");
}
function foo(){
    console.log("f_2");
}

//上边代码等价如下 解析器眼中的代码
function foo(){
    console.log("f_1");
}
function foo(){
    console.log("f_2");
}
foo();//f_2

**同时有var和function关键字时（情形1：函数表达式）
例1、
console.log(foo);//undefined
var foo = function(){
    console.log("foo");
};
foo();//foo

例2、
foo();
var foo = function(){
    console.log("foo");
};//报错

//等价于
var foo;
foo();//foo is not a function
foo=function(){
    console.log("foo");
};

例3、
AA();
function AA(){
    console.log("AA_1");
}
var AA = function AA(){
    console.log("AA_2");
};
AA();

//上边代码等价如下
function AA(){
    console.log("AA_1");
}
var AA;

AA();
AA = function AA(){
    console.log("AA_2");
};
AA();

//---------------------------------------------
js变量作用域简介
变量的作用域是指变量在何处可以被访问到
***js采用的是静态词法作用域，代码完成后作用域链就已经形成，
   与代码的执行顺序无关
*全局变量：拥有全局作用域的变量（js代码任何中的地方都可以访问）
*局部变量：函数内声明的变量，只在函数体内有定义，作用域是局部性的
在函数体外不能直接访问函数的局部变量
*函数内访问同名变量时，局部变量会覆盖同名变量

if(true){
    var i = 0;
}

function foo(){
    console.log("j:",j);//undefined
    var j = 10;
    console.log("j:",j);//10
}
foo();

console.log("i:",i);//0
console.log("j:",j);//报错

//等价于
var i;
if(true){
    i = 0;//if或者for的时候预解析冲出作用域，但是函数里面用var定义的在函数外访问不到
}

function foo(){
    var j;//在函数内部用var定义的变量在函数内部也预解析
    console.log("j:",j);//undefined
    j = 10;
    console.log("j:",j);//10
}
foo();

console.log("i:",i);//0
console.log("j:",j);//报错


***局部变量会屏蔽外部变量、
var i=10;
function aa(){
    console.log(i);
    var i=5;
    console.log(i);
}
aa();
//undefined
//5