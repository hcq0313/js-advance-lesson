//1、包装对象

//（1）
var a = 123;
var b = new Number(a);
console.log(a == b);  //true  注：存在隐式转换，把对象类型转化成了基本类型
console.log(a === b);   //false

//（2）基本数据类型有装箱拆箱
str="abcdef";
str.length;
str.length=1;
console.log(str,str.length);  //输出  abcdef 6 
//同例：
var arr=[1,2,3,4,5,6];
console.log(arr.length);  // 6
arr.length=1;
console.log(arr,arr.length); //输出： [1] 1  注：因为数组是对象，可以直接用length方法，不用装箱拆箱，所以可以直接改变数组的长度。

/*
（1）数字、布尔、字符串等基本数据类型都有对应的包装对象类型，可以将其包装成对象
例：new Number(20)； new String('SomeStr');
（2）存储或读取基本类型（字符串、数字、布尔）值的属性时，会创建临时包装对象
例: console.log('Hello，World'.length);
（3）基本类型其属性不能被改变、添加或删除（原始值不可变性）
（4）临时对象在使用之后立即被释放
例：var str='test';
	str.p = 4;//设置临时对象属性
	var t = str.p; // 临时对象已释放，再输出t时为undefined
*/

//2、类型转换
//(1)其他类型转化成布尔型、
console.log(Boolean(undefined));  //false
console.log(Boolean(null));		  //false
console.log(Boolean(0));          //false
console.log(Boolean(NaN));        //false
console.log(Boolean(1));          //true         
console.log(Boolean(""));         //false  
console.log(Boolean("abc"));      //true
console.log(Boolean({}));	      //true  **对象总是true


if(new Boolean(false)){
    console.log("执行");
}
//输出  执行    注：new Boolean(false) 是包装的对象，对象对应的布尔值永远为真，所以输出 执行

//（2）其他类型转化成Number型

console.log(Number(undefined));           //NaN
console.log(Number(null));                //0
console.log(Number(true));				  //1
console.log(Number(false));				  //0
console.log(Number(""));				  //0
console.log(Number("abc"));        		  //NaN
console.log(Number("123.345xx"));		  //NaN
console.log(Number("32343,345xx"));		  //NaN
console.log(Number({x:1,y:2}));			  //NaN

console.log(parseFloat("123.345xx"));	  //123.345
console.log(parseFloat("32343,345xx"));	  //32343
console.log(parseInt("123.345xx"));       //123
console.log(parseInt("32343,345xx"));	  //32343

//(3)其他类型转化成String类型

String(undefined);			//'undefined'
String(null);				//'null'
String(true);				//'true'
String(false);				//'false'
String(0);					//'0'
String(234);				//'234'
String({x:1,y:2});			//'[object Object]'


//(4)隐式转换
console.log(typeof (a>b),a>b);		//boolean false
console.log(typeof (a==b),a==b);    //boolean false
console.log(typeof (a<b),a<b);		//boolean true

var c = "img" + 3 +".jpg";   //字符串的拼接
var d = "23" - 5;  //转化成了数字
console.log(c,d);  //img3.jpg 18

var e = !23;
var f = !!34;
var g = !!{};
var s = !!undefined;
console.log(e,f,g,s);     //false true true false

var h = {x:1};
//var h = ""; 如果是“”的话，不会输出h，因为“”代表false，不执行if语句
if(h){
    console.log("h:",h);   //h: {x: 1}
}

//显示类型转换
// Boolean();
// Number();
// String();
// Object();


//parseInt();
//parseFloat();

// toString();
// valueOf();




