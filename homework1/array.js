//创建数组的方式
var arr1 = [1,2,3,"4"];

var arr2 = new Array(5);//思考var arr2 = new Array("5");
console.log(arr2);//[empty × 5]
for(var i=0;i<arr2.length;i++){arr2[i] = i;}
console.log(arr2);//[0, 1, 2, 3, 4]

//数组的基本操作
var arr22=[];
for(var i=0;i<5;i++)
{
	document.onclick=function(){
		arr22[i]=i;
	}
}
//只能添加5.共六个元素

var arr==[];
arr[4]=2;
//共五个元素，前四个为空


//数组属于对象
var a1=[1,2,3];
var a2=a1;
a2.length=0;
console.log(a1,a2);//[]  []

var a3=[1,2,3];
var a4=a3;
a3=[];
console.log(a3,a4);//[]  [1,2,3]

//增删改查
var a = ["hello"];
a[1] = 3.14;//增：直接添加数组元素，通过方法添加元素参见后续章节
a[2] = "world";
console.log("删除a[2]前的数组a",a);//["hello", 3.14, "world"]
delete a[2];
console.log("删除a[2]后的数组a",a);//["hello", 3.14, empty]
a[0] = "XX";//改：修改数组元素a[0]
console.log(a[0]);//查:看数组中的元素，索引从0开始  XX

//delete的不彻底，只会删除元素，不会改变数组的长度

var p=[1,2];
var s=p.pop();
console.log(s);//2  此时数组长度也会变为1


数组是对象的特殊形式，可以为数组添加对象属性，对于0至2的32次方之外的数，
将作为普通对象的键来对待
数组特别之处在于，当使用使用2的32次方以内的非负整数作为属性名时（包括类型转换的数字），
数组会自动维护其length属性，作为数组的元素，而不是数组对象的属性
var a = [];
a[-1.23] = true; //创建一个名为“-1,23”的属性
a["100"] = 0;   // 数组的第101个元素  2的23次方以内的字符串也是数字，会进行隐式类型转换
a[1.00] = "Hi"; //和a[1]相当 浮点数也会转换成整数
a[1.23] = 'xx';//小数的话，也会是属性
console.log(a.length);
console.log(a);

//思考
var i=2,b=[];
b[i]=3;
b[i+1]="YY";
b[b[i]] = b[0];
console.log(b);

// 多维数组 实例一 矩形数组
var table = new Array(5);
for(var i=0;i<table.length;i++){
    table[i] = new Array(5);//若是table[i] = new Array(i);
}

for(var row=0;row<table.length;row++){
    for(var col=0;col<table[row].length;col++){
        table[row][col]=row*col;
    }
}
var product = table[2][4];
console.log(table);

//稀疏数组
var a1 = [,"abc"];
console.log(a1.length);//2

console.log(["a","b"].length);//2
console.log(["a","b",].length);//2
console.log(["a","b",,].length);//3

var arr=[,,]
console.log(arr.length)//最后一个逗号之后的元素遍历不到


//Part1  数组的静态方法
const bar = ["a", "b", "c"];
Array.from(bar);// ["a", "b", "c"]
Array.from('foo');// ["f", "o", "o"]

Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]

var arr1 = [1,3,4];
console.log(Array.isArray(arr1));

function foo(){
    console.log(Array.isArray(arguments));
    //console.log(arguments.pop());//这样是否能调用？数组与类数组对象
    console.log(Array.prototype.pop.call(arguments));
}
foo(3,2,5);

//Part2  数组添加删除元素的原型方法 破坏性
//Array.prototype.shift
var arr2 = [1,3,5,7];
var shiftElement = arr2.shift();//返回去除的元素
console.log(shiftElement,arr2);

var newLength = arr2.unshift(1,2);//返回新的数组长度
console.log(newLength,arr2);

var popElement = arr2.pop();//返回pop出去的元素
console.log(popElement,arr2);

var newLength = arr2.push(77,88);//返回新的数组长度
console.log(newLength,arr2);

//通过push将两个数组组合成一个数组
var arr3 = ["a","b"];
var arr4 = ["c","d"];
Array.prototype.push.apply(arr3,arr4);
console.log(arr3);

//splice 从start开始，移除deleteCount个元素，并插入给定的元素
var arr5 = ["a","b","c","d"];
var spliceElements = arr5.splice(1,2,"x");//返回切掉的数组
console.log(spliceElements,arr5);

//思考start若是负数则返回什么？：arr5.splice(-2,2,"x");
var arr5 = ["a","b","c","d"];
var spliceElements = arr5.splice(1,2,"x");//返回切掉的数组
console.log(spliceElements,arr5); //(2) ["b", "c"] (3) ["a", "x", "d"]
/*
splice用法
arrayObject.splice(index,howmany,itemx)
index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
itemX	可选。向数组添加的新项目。*/

//Array.prototype.reverse()
var arr1 = [1,2,3];
arr1.reverse();
console.log(arr1); //[3,2,1]

//Array.prototype.sort(compareFunction？)
var arr2 = ["banana","apple","pear","orange"];
arr2.sort();
console.log(arr2); //["apple", "banana", "orange", "pear"]


//思考sort中的参数
var arr3 = [-1,-20,7,50];
arr3.sort();
console.log(arr3);//结果是否是预计结果,如何解决  [-1, -20, 50, 7]  只是按第一个数字排序，不是预期结果

//sort传递的函数对象
arr3.sort(function (a,b) {return a-b;});//对于数字类型，大于0则交换，冒泡排序
//arr3.sort(function (a,b) {return a>b;});//对于布尔类型，true则交换，冒泡排序

//如果想让arr2按第二个字母排序，怎么写？
var arr2 = ["banana","apple","pear","orange"];
arr2.sort(function(a,b){return a[1]>b[1];});
console.log(arr2);


//Part222222 合并、切分和连接 非破坏性
//Array.prototype.concat(arr1?,arr2?,...)
var arr4 = ["banana","apple"];
var arr5 = ["pear","orange"];
var newArray = arr4.concat(arr5);
console.log(newArray,arr4,arr5);
//(4) ["banana", "apple", "pear", "orange"] (2) ["banana", "apple"] (2) ["pear", "orange"]

//Array.prototype.slice(begin?,end?)注意：不要和splice弄混了
var arr6 = [1,2,3,4,5];
var newArray = arr6.slice(2,4);
console.log(newArray,arr6);  //(2) [3, 4] (5) [1, 2, 3, 4, 5]
var newArray2 = arr6.slice(2);
console.log(newArray2,arr6);  //(3) [3, 4, 5] (5) [1, 2, 3, 4, 5]
//slice(a,b)  从a开始到b，**不包括b

//Array.prototype.join(separator?)
var arr7 = [3,4,5];
var joinReturn = arr7.join("--");
console.log(joinReturn,arr7);// 3--4--5 (3) [3, 4, 5] 
console.log(typeof joinReturn);//string  ***join会使数组连接成字符串
//注意：稀疏数组调用join
console.log([3,,,,,,5].join("*")); //3******5

//Part333333333 值的查找 非破坏性
//Array.prototype.indexOf(searchValue,startIndex?)
var arr8 = [1,3,5,5,7,9,5];
console.log(arr8.indexOf(5));//2
console.log(arr8.indexOf(5,3));//3
console.log(arr8.indexOf(5,5));//6
/*
stringObject.indexOf(searchvalue,fromindex)
searchvalue	必需。规定需检索的字符串值。
fromindex	可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。
            如省略该参数，则将从字符串的首字符开始检索。  若没有出现，返回-1。

*/

//Array.prototype.lastIndexOf(searchElement,startIndex?)
console.log(arr8.lastIndexOf(5));//6  从末尾开始往左查找第一个5的位置
console.log(arr8.lastIndexOf(5,3));//3  从3的位置开始向左查找第一个5的位置
console.log(arr8.lastIndexOf(5,5));//3  从5的位置开始向左查找第一个5的位置
