//逻辑运算符进阶
//1、最常见的情况
/*对于&&来说， 除了两侧都为真时为真，其他情况都为假
对于 | | 来说，除了两侧都为假时为假，其他情况都为真*/

//2、深层次理解
/*
当逻辑运算符&&和||两侧的操作数不是布尔类型时
 首先将左操作数转换成布尔类型
 对转换后的左操作数进行逻辑判断（true or false）
 根据短路原则返回原始左操作数或原始右操作数

 短路原则（忽略对右操作数的判断）
对于&&，转换后的左操作数若为true，则直接返回原始右操作数，若为false则
直接返回原始左操作数
对于| |，转换后的左操作数若为true，则直接返回原始左操作数，若为false则直
接返回原始右操作数
通过短路原则，可以用&&和| |来实现复杂的条件语句来代替if-else */

//操作数非布尔类型，&&短路原则
console.log(2&&4);
console.log(0&&4);
console.log({x:2}&&{name:"Jack"});
console.log(null&&"hello");
console.log({}&&"world");
//运行结果
4
0
{name: "Jack"}
null
world

//操作数非布尔类型，||短路原则
console.log(2||4);
console.log(0||4);
console.log({x:2}||{name:"Jack"});
console.log(null||"hello");
console.log({}||"world");
2
4
{x: 2}
hello
{}

//！运算符与逻辑运算符
！（A&&B）  ===  ！A ||！B
！（A||B）  ===  ！A &&！B

//使用||来设置函数参数的默认值
//函数定义时可以给参数指定默认值，调用时若未传参数则该参数的值取它定义时的默认值
//JS（ES6之前）不能直接为函数的参数指定默认值，可以通过 | | 来实现
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3)); //6
console.log(sum(1,2));   //8
console.log(sum(1));     //10
console.log(sum(1,0,0)); //1