//1、typeof用于类型值检测
console.log(typeof null);   null
console.log(typeof undefined);  undefined
console.log(typeof function foo(){});  function
console.log(typeof Array);   function
console.log(typeof Function);   function
console.log(typeof Date);   function
console.log(typeof Number);//String、Boolean   function

console.log(typeof Math);   object
console.log(typeof JSON);   object


//2、类型检测 instanceof （左侧操作数为对象，右侧操作数为原型链中的一个类型时，返回为true）

var b = [12,34,{},""];
console.log(b instanceof Array);//思考console.log(b instanceof Object);true

//3、上课例题
//（1）
var obj1={"key":2};
var obj2=obj1;
obj2.key=3;
console.log(obj1.key);   3
obj2.key={"key":4};
console.log(obj1.key);   {key: 4}
//说明obj2与obj1所指向的堆区内存是同一块内存

//（2）
var a=123;
function foo(x){x=345;}
foo(a);
console.log(a);   123

//(3)
var a={y:123}
function foo(x){x.y=345;}
foo(a);
console.log(a,y);   345

//(4)
var a={y:123}
function foo(x){
	x.y=345;
	x={y:456}
}
foo(a);
console.log(a.y);   345

//(5)
var a={y:123}
function foo(x){
	x={y:456}
	x.y=345;
}
foo(a);
console.log(a.y);   123



//改变参数的值
var x=[1];
function foo(y){
	y[0]=2;
}
foo(x);
console.log(x[0]);
//2

//不改变参数的值
var x=1;
function foo(y){
	y=2;
}
foo(x);
console.log(x);
//1
