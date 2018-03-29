js中函数也是对象
（1）JS中每个函数都是作为对象来维护和运行的，即函数对象（既有属性也有方法）
（2）可以将函数（函数对象）赋值给一个变量，或将函数作为参数进行传递
（3）函数对象对应的类型是Function（类似于数组对象对应于Array、日期对象对应于Date）
（4）如果变量是函数（函数对象）时，typeof此对象，返回function
（5）内置的函数对象（Array、Function、Date等），内置的非函数对象（Math、JSON）

function foo(){}
console.log(foo); //function foo(){}
console.log(typeof foo); //function
console.log(foo instanceof Object); //true
console.log(foo instanceof Function); //true
console.log(foo === window.foo); //true

//Date,Function,Array,Error，typeof之后都是function
console.log(typeof Function);//function
console.log(typeof Array);	 //function
console.log(typeof Date);	 //function
console.log(typeof Error); 	 //function
console.log(typeof Math);	 //object
console.log(typeof JSON);	 //object

//***************
console.log(typeof new Function());// function  创建函数的第三种方式
console.log(typeof new new Function()); //new了一个构造函数

console.log(typeof new Array());	 //object创建的是函数对象
console.log(typeof new Date());	 //object对象

//关于instanceof的，除了后两个是false之外，其他都是true
console.log(Function instanceof Function);
console.log(Array instanceof Function);
console.log(Date instanceof Function); //Date是构造函数，用来实例化对象
console.log(Date instanceof Object);
console.log(Array instanceof Object);
console.log(Function instanceof Object);
console.log(Math instanceof Object);
console.log(JSON instanceof Object);
console.log(Math instanceof Function);
console.log(JSON instanceof Function);


//arguments
//1、函数对象属性之arguments 实参集合（类似数组的一个对象）
//2、函数对象属性之length 形参个数
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        alert("The count of the parameters you passed into the function doesn't match the function definition.");
    }else{
        alert("Successfully call the function");
    }
}
checkVarCount(1, 2);
//Successfully call the function
checkVarCount(1);
//The count of the parameters you passed into the function doesn't match the function definition.


//函数对象方法之 bind 硬绑定 例一
// function.bind(thisArg[,arg1[,arg2[,argN]]])
// 在绑定功能中，this对象解析为传入的对象。
// 返回一个与 function 函数相同的新函数，只不过函数中的this对象和参数不同。
// Define the original function.
var checkNumericRange = function (value) {
    if (typeof value !== 'number')
        return false;
    else
        return value >= this.minimum && value <= this.maximum;
};

var range = { minimum: 10, maximum: 20 };
var boundCheckNumericRange = checkNumericRange.bind(range);//函数和对象绑定成一个新的函数
var result = boundCheckNumericRange (12);//相当于range.boundCheckNumericRange (12)
console.log(result);//true


var displayArgs = function (val1, val2, val3, val4) {
    console.log(val1 + " " + val2 + " " + val3 + " " + val4);
};
var emptyObject = {};
var displayArgs2 = displayArgs.bind(emptyObject, 12, "a");
displayArgs2("b", "c");// Output: 12 a b c


//***高阶函数

// 实例一 高阶函数一般应用 01
function add(x, y, f) {
    return f(x) + f(y);
}
add(2,3,function(x){return x+1;});//
add(2,-3,Math.abs);//绝对值
add(2,3,Math.sqrt);//2的开平方加3的开平方


// 实例二 数组相关的高阶函数 map reduce filter sort详情参见数组章节
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]

//上课例题：
var x=12;
var obj = {
    x:34,
    fun2:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this.x;//若改为 return this;
    }
};

obj.fun3 = fun1;
obj.fun4 = fun1();
console.log(obj.fun3());//输出什么
console.log(obj.fun3()());//函数里面嵌套函数就是指的全局的x；
console.log(obj.fun4());//输出什么

结果：
fun2() {
        return this.x;//若改为 return this;
}
12
34