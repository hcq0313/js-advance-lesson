不正则
'abc'.replace('a','x');

\d 数字
\s 空格
\b 边界
\w 所有字符
$ 以。。结尾
eg：'s2b4'.replace(/\d/gi,'a');

's2b4'.replace(/\d/gi,'a');//"saba"
's2b4'.replace(/\w/gi,'a');//"aaaa"
's2b4'.replace(/\b/gi,'a');//"as2b4a"
's2b4'.replace(/\B/gi,'a');//"sa2aba4"
's2b4'.replace(/\s/gi,'a');//"s2b4"
's2b4'.replace(/\S/gi,'a');//"aaaa"
's2 b4'.replace(/\s/gi,'a');//"s2ab4"
//可以同时用两个


console.log('123123 123'.replace(/\b123/,'*'));

"12345678".replace(/\d{3,6}/,'X');//默认为贪婪模式  X78  /d 三到六次，贪婪模式选最多的
"12345678".replace(/\d{3,6}?/,'X');//"X45678"
"12345678".replace(/\d{3,6}?/g,'X');//"XX78"

console.log("moon2xyz".replace(/o/,"ab"));//mabon2xyz
console.log("moon2xyz".replace(/o/g,"ab"));//mababn2xyz
console.log("moon2 ooxyz".replace(/\bo/g,"ab"));//moon2 aboxyz
console.log("moon2xyz".replace(/\dx/,"_"));//moon_yz   注：\d代表数字，数字加x换成_
console.log("moon2xyz".replace(/[xyz]/g,"ab"));//moon2ababab  注：[xyz]/g表示，全局下的x或y或z
console.log("m2on2x2z".replace(/\d[zo]/g,"ab"));//mabn2xab  注：数字和后面的z或o换成ab
console.log("m2on2x2z".replace(/2[x-z]/g,""));//m2on 注：2和x到z中的任意一个


//正则对象的创建方式一 通过字面量直接创建
var reg1 = /[bcf]at/gi;

//正则对象的创建方式二 通过RegExp构造函数来实例化正则对象
var reg2 = new RegExp(/[bcf]at/,"gi");//常见形式
var reg3 = new RegExp("[bcf]at","gi");

console.log("a fAt bat ,a faT cat".match(reg1));//["fAt", "bat", "faT", "cat"]
console.log("a fAt bat ,a faT cat".match(reg2));//["fAt", "bat", "faT", "cat"]
console.log("a fAt bat ,a faT cat".match(reg3));//["fAt", "bat", "faT", "cat"]

// 一、g全局、i大小写、m换行 修饰符的作用
// 二、正则对象的两种基本使用方式 1.字符串.字符串方法（正则对象） 2.正则对象.正则方法（字符串）
var regExp = /ab/i;
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//["Ab", index: 2, input: "xxAbcaaBbxyz"]

var regExp = /ab/gi;
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//["Ab", "aB"]

var regExp = /a*b/gi; 
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult); //["Ab", "aaB", "b"]

var regExp = /a.b/gi;//注意*和.的区别 ，参见在线分析工具 https://regexper.com或https://jex.im/regulex
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult); //["aaB"]

var regExp = /a..b/gi;
var matchResult = "xxAbcaaaaBbxyz".match(regExp);
console.log(matchResult);//["aaaB"]  注：一个. 代表一个字符

//test
var regExp = /a/i;
console.log(regExp.test("ab"));
console.log(regExp.test("ab"));
console.log(regExp.test("ab"));
console.log(regExp.test("ab"));

var regExp = /a/gi;//思考如果加了g，循环了若干次后是true还是false，这是为什么？test中的lastIndex
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//false 
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//false 

var regExp = /a/gi;
while (regExp.test("aaa")){
    console.log(regExp.lastIndex);  //1  2  3
    //lastIndex是本次匹配完最后一个下标 从1开始

console.log(/oo/.test("moon")); //true
console.log(/oo\b/.test("moon"));  //false
console.log(/oon\b/.test("moon"));  //true
console.log(/\boo/.test("moon"));  //false

console.log("moon".search(/oo/));//1
console.log("moon".search(/oo\b/));//-1
console.log("moon".search(/oon\b/));//1
console.log("moon".search(/\boo\b/));//-1  能够匹配到的就是1，匹配不到的就是-1

//一个字符串的开始和结尾都被认为是非单词。
console.log(/oo\B/.test("moon")); //true
console.log(/oon\B/.test("moon"));  //false
console.log(/oo\B/.test("moon"));  //true
console.log(/\Boo\B/.test("moon"));  //true

console.log("moon".match(/oo\B/));//["oo", index: 1, input: "moon"]
console.log("moonoonxoo".match(/oo\B/));//["oo", index: 1, input: "moonoonxoo"]
console.log("moon".match(/oon\B/));//null
console.log("moo".match(/\Boo\B/));//null

//字符类 []
console.log("absxsdfe123Ab".replace(/[abd]/,"X")); //Xbsxsdfe123Ab
console.log("absxsdfe123Ab".replace(/[abd]/g,"X"));  //XXsxsXfe123AX
console.log("absxsdfe123Ab".replace(/[abd]/gi,"X"));  //XXsxsXfe123XX

// 字符类 的取反 [^]
console.log("absxsdfe123Ab".replace(/[^abd]/,"X"));  //abXxsdfe123Ab
console.log("absxsdfe123Ab".replace(/[^abd]/g,"X"));  //abXXXdXXXXXXb
console.log("absxsdfe123Ab".replace(/[^abd]/gi,"X"));  //abXXXdXXXXXAb

//范围类
console.log("12345667".replace(/[3-9]/gi,"X"));//12XXXXXX
console.log("absxsdfe123Ab".replace(/[a-f1-9]/gi,"X"));//XXsxsXXXXXXXX
console.log("absxsdfe123Ab".replace(/[a-f][1-9]/gi,"X"));//如果单独替换，则需要分组 absxsdfX23Ab
console.log("absxsdfe123Abf1a3".replace(/[a-f][1-9]/gi,"X"));//absxsdfX23AbXX
console.log("absxsdfe1Q2e3Ab".replace(/[a-f][1-9][A-Z]/gi,"X"));//absxsdfX2Xb
//范围类是分组的，每个组挑一个，符合的才替换

console.log("2017-10-23".replace(/[0-9]/g,"X")); //XXXX-XX-XX
console.log("2017-10-23".replace(/[0-9-]/g,"X"));  //XXXXXXXXXX
console.log("--2017-10-23".replace(/[0-9-]/g,"X"));//XXXXXXXXXXXX   数字和-全部换成X

// Part 33333333333333333333
//思考如何匹配 12345789abcdef34534789ede
"12345789abcdef34534789ede".replace(/\d\d\d\d\d\d\d\d/g,"X");//不用量词的写法，非常不好
"12345789abcdef34534789ede".replace(/\d{8}/g,"X");

//量词 注意*在这里是量词，不是充当通配符，充当通配符的是 .
//? 出现0次或1次（最多出现1次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa?/g,0));//0Bb0b_0aBbb0ba

//+ 出现1次或多次（至少出现1次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa+/g,0));//0BbAb_0BbbAba

//* 出现0次或多次（任意次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa*/g,0));//0Bb0b_0Bbb0ba

//{n} 出现n次
console.log("AaBbAb_AaaBbbAba".replace(/Aa{1}/g,0));//0BbAb_0aBbbAba
console.log("AaBbAb_AaaBbbAba".replace(/Aa{2}/g,0));//AaBbAb_0BbbAba
console.log("AaBbAb_AaaaBbbAba".replace(/Aa{3}/g,0));//AaBbAb_0BbbAba   注：a{3}是一个整体，指三个a

//{n,m} 出现n到m次
console.log("AaBbAb_AaaBbbAba".replace(/Aa{1,2}/g,0));//0BbAb_0BbbAba

//{n,} 出现至少n次
console.log("AaBbAb_AaaBbbAbaAaaaaaaAaaAaaa".replace(/Aa{2,}/g,0)); //AaBbAb_0BbbAba000
console.log("AaBbAb_AaaBbbAbaAaaaaaaAaaAaaa".replace(/Aa{2,4}/g,0));//AaBbAb_0BbbAba0aa00  注：超过四个的时候截断四个也算

//注意：0到n次的写法{0,n}而不是{,n}

//贪婪模式和非贪婪模式
"12345678".replace(/\d{3,6}/,'X');//默认为贪婪模式  X78

"12345678".replace(/\d{3,6}?/,'X');//设置为非贪婪模式 在量词后加？X45678

"12345678".replace(/\d{3,6}?/g,'X');//XX78

//正则表达式的分组
console.log("NameNameName_11111".replace(/Name{3}/,"X"));//NameNameName_11111  Name{3}的意思是Nameee
console.log("NameNameName_11111".replace(/(Name){3}/,"X"));//2 X_11111 这个的意思是三个Name

console.log("a1b2c3d4e5".replace(/[a-z]\d{3}/,"X"));//a1b2c3d4e5  连着的三个数字
console.log("a1b2c3d4e5".replace(/([a-z]\d){3}/,"X"));//Xd4e5   字母数字一组，一共三组
console.log("a1b2c3d4e5".replace(/([a-z]\d){3,4}/,"X"));//Xe5   //贪婪者模式，字母数字一组，一共四组
console.log("a1b2c3d4e5".replace(/([a-z]\d){3,4}?/,"X"));//Xd4e5  贪婪者模式修正值 两个一组，一共三组


"2017-10-23".replace(/(\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1");

//分组的 忽略分组 （？：）
"2017-10-23".replace(/(?:\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1");

//注意括号的转义字符，第一个相当于做了分组
console.log(/^(ab)$/.test("(ab)")); //true
console.log(/^\(ab\)$/.test("(ab)"));  //false

//正则前瞻，了解即可 判断后边是否满足断言
console.log("a23*4vv".replace(/\w(?=\d)/g,"X"));//XX3*4vv 正项前瞻
console.log("a23*4v8".replace(/\w(?=\d)/g,"X"));//XX3*4X8
console.log("a23*4v8".replace(/\w(?!\d)/g,"X"));//a2X*XvX 负项前瞻  ？？？？？？？？？？？？？

var regExp=/a/gi;
console.log(regExp.test('ab'),regExp.lastIndex);//true 1
console.log(regExp.test('ab'),regExp.lastIndex);//false 0
console.log(regExp.test('ab'),regExp.lastIndex);//true 1
console.log(regExp.test('ab'),regExp.lastIndex);//false 0
//lastIndex属性要知道，lastIndex 是本次匹配完最后一个字符的位置

var execExp2 = /\d{1,2}(\d)(\d)/g;
var ts = "12s342dsfsf233s";
console.log(execExp2.exec(ts),execExp2.lastIndex);//lastIndex为6 ["342", "4", "2", index: 3, input: "12s342dsfsf233s"]
console.log(execExp2.exec(ts),execExp2.lastIndex);//lastIndex为14 ["233", "3", "3", index: 11, input: "12s342dsfsf233s"] 
//不加g不考虑lastIndex，因为每次从0开始匹配
