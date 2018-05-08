//通过构造函数创建Date对象的4种形式
（1）
var date1 = new Date(2017,9,18,12,34,1);//注意：月0-11，日：1-31，时：0-23，分：0-59，秒：0-59，毫秒：0-999
console.log(date1);
var date2 = new Date(17,9,18,12,34,1);//若years为2位的话自动加1900
console.log(date2);
**注意，以上两种方式的月份都是从0开始算的的，数字9代表的是10月

（2）
var date3 = new Date("2017-08-09");//注意日期的格式 此处的08代表8月
console.log(date3);
*字符串的数字就是月份

（3）
//var date4 = new Date(0);    //1970-01-01:00:00:00
var date4 = new Date(1000); //1970-01-01:00:00:01
console.log(date4);//逆运算是date4.getTime();

（4）
var date5 = new Date();
//var date5 = new Date(Date.now()); 两种方法都是获取现在的时间
console.log(date5);

//补充：无效日期
var date6 = new Date(NaN);
console.log(date6);//Invalid Date

//有无new的区别
var d1 = new Date();
var d2 = Date();
console.log(d1,typeof d1);//object
console.log(d2,typeof d2);//string 

//补充思考
var n1 = new Number("123");
var n2 = Number("123");
console.log(n1,typeof n1); //Number {123} "object"
console.log(n2,typeof n2); //123 "number"


//Date静态方法（Date构造器函数对象的方法）GMT 格林尼治时间
console.log(Date.now());//以毫秒为单位返回当前时间（从1970年1月1日00:00:00开始计算）
console.log((new Date()).getTime()); //也是毫秒

console.log(Date.parse("1970-01-01"));//dateTimeString字符串转换成毫秒
console.log(Date.parse("1970-01-02"));

console.log(Date.UTC(2017,9,1));//将给定的日期转换成毫秒,解释为UTC 协调世界时间

//Date原型方法 getter和setter相关
var d = new Date("1978-11-25");
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1978 10 6 25 8
console.log(d.getTimezoneOffset());
d.setDate(11);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1978 10 6 11 8   getDay()指的是日期
d.setFullYear(1999,5,3);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1999 5 4 3 8

//Date原型方法 转成字符串相关
var d = new Date(2012,3,21,15,7,23,234);
console.log(d.toTimeString(),"___",d.toLocaleTimeString());
console.log(d.toDateString(),"___",d.toLocaleDateString());
console.log(d.toJSON());

var today =new Date();
today.setMonth(6);

//五十天后的日期
var today =new Date();
var newDate=new Date(today.getTime()+1000*3600*24*50);//50天，24小时，3600秒，1000毫秒
console.log(newDate);