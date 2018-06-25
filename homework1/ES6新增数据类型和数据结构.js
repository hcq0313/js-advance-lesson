//Part1111111111111111
//为什么要使用Symbol
// ES5里面对象的属性名都是字符串，
// 如果你需要使用一个别人提供的对象，你对这个对象有哪些属性也不是很清楚，
// 但又想为这个对象新增一些属性，那么你新增的属性名就很可能和原来的属性名发送冲突
// 例如：
var obj = {
    x:1,
    y:2,
    moveTo:function(x,y){
        this.x = x;
        this.y = y;
    }
}
obj.moveTo = function(x,y){
    console.log("方法被覆盖了");
};
obj.moveTo(0,0);
// 显然我们是不希望这种情况发生的。所以，我们需要确保每个属性名都是独一无二
// 因此，ES6里就引入了Symbol，用它来产生一个独一无二的值。

//*******注意：定义Symbol变量，注意Symbol是基本数据类型的一种，不能用new
let s = Symbol();//不能用new
typeof s;// "symbol"

//Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
var s1 = Symbol('foo');
var s2 = Symbol('bar');
console.log(s1); // Symbol(foo)
console.log(s2); // Symbol(bar)
console.log(s1.toString()); // "Symbol(foo)"
console.log(s2.toString()); // "Symbol(bar)"


//Part2222222222222222222
//*****注意，虽然Symbol是基本数据类型，但是Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false

//如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
sym // Symbol(abc)

//Symbol值不能与其他类型的值进行运算，会报错。
var sym = Symbol('My symbol');
//"your symbol is " + sym;//报错
//但是，Symbol值可以显式转为字符串。
var sym = Symbol('My symbol');
String(sym); // 'Symbol(My symbol)'
sym.toString(); // 'Symbol(My symbol)'


//Part111111111111111
//由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，
//就能保证不会出现同名的属性。
//这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
//使用Symbol是用[]，而不是用点操作符
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';//注意中括号内不要加引号，后面介绍加引号和不加引号的区别
// 第二种写法
var a = {
    [mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"



//思考下述代码，是添加了几个属性，obj对象有几个属性？
var aSymbol = Symbol("abc");
var obj = {
    [aSymbol]: 'Hello!'
};
Object.defineProperty(obj, Symbol("abc"), { value: 'World!' });
console.log(obj);//思考obj对象有几个属性？

//Part22222222222222222
//上面代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个Symbol值。
//注意，Symbol值作为对象属性名时，不能用点运算符，使用中括号是注意使用引号和不用引号的区别
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
//上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个
//Symbol值。

//思考：
var myS1 = Symbol("xx");
var myS2 = "xx";
var obj = {
    [myS1]:123,
    [myS2]:456
};
console.log(obj[myS1],obj[Symbol("xx")]);// 123 undefined？？？？？？？？？？？？？？
console.log(obj[myS2],obj["xx"]);  //456 456
// console.log(obj["myS1"]);  //undefined
// console.log(obj["myS2"]);  //undefined

//同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中
// 如果不用[]的话相当于使用s对应的字符串定义属性
let s = Symbol();
let obj = {
    [s]: function (arg) {console.log("xx");}
};
obj[s](123);
// 上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个Symbol值。

// 采用增强的对象写法，上面代码的obj对象可以写得更简洁一些
let obj = {
    [s](arg) {console.log("xx");}
};

// 回顾ES6对象属性的表达式定义方法和ES6对象的简洁表示法，对于属性和方法定义的简洁表示法
//还有一点需要注意，Symbol值作为属性名时，该属性还是公开属性，不是私有属性



//Part111111111111111111111111
//遍历实例一
var obj = {};
var a = Symbol('a');
var b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols);// [Symbol(a), Symbol(b)]

//遍历实例二
var obj = {};
var foo = Symbol("foo");
Object.defineProperty(obj, foo, {
    value: "foo bar",
});
for (var i in obj) {
    console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj);// []
Object.getOwnPropertySymbols(obj);// [Symbol(foo)]


//Part2222222222222222222222
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
console.log(s1 === s2); // true

//Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。
// 它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
// Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，
// 如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30次，每次都会返回同一个Symbol值，
// 但是调用Symbol("cat")30次，会返回30个不同的Symbol值。

console.log(Symbol.for("bar") === Symbol.for("bar"));// true
console.log(Symbol("bar") === Symbol("bar"));// false
console.log(Symbol.for("bar") === Symbol("bar"));// false

//Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"
var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2)); // undefined

//思考：
var s3 = Symbol(Symbol.keyFor(s1));
console.log(s1 === s3); //false
console.log(s2 === s3); //false
var s4 = Symbol.for(Symbol.keyFor(s1));
console.log(s1 === s4); //true   只有keyFor 三等返回的是true
console.log(s2 === s4); //false


//Part 111111111111111111111111111111111111111
var s1 = new Set([1,2,3,4,5,5,6,2,2]);
console.log(s1);  //Set(6) {1, 2, 3, 4, 5, 6}

var s2 = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s2.add(x));
for (var i of s2) {
    console.log(i);
}// 2 3 5 4

//
// 例一
var set = new Set([1, 2, 3, 4, 4]);
console.log([...set]);
// [1, 2, 3, 4]
// 例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size); // 5

// 去除数组的重复成员
[...new Set([1,2,3,3])];  //[1, 2, 3]

//
//区分基本类型和引用（对象）类型，两个对象总是不相等的，思考下述代码
var set = new Set();
set.add({});
console.log(set.size); // 1
set.add({});
console.log(set.size); // 2
console.log(set);  //Set(2) {{…}, {…}}

//Part 22222222222222222222222222222222222222222222222
s.add(1).add(2).add(2);
// 注意2被加入了两次
s.size // 2  //基本数据类型与引用数据类型不一样，基本数据类型如果里面有的话，不会重复添加
s.has(1); // true
s.has(2); // true
s.has(3); // false
s.delete(2);
s.has(2); // false

//
var properties = new Set();
properties.add('width');
properties.add('height');
console.log(properties.size);
if (properties.has('width')&&properties.has('height')) {
    console.log("do something!");
}
//输出：
//2
//do something!

//Array.from方法可以将Set结构转为数组。
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);
console.log(array);   //[1, 2, 3, 4, 5]

//...也可以将set转换成数组
console.log([...(new Set([1, 2, 3, 4, 5]))]);//[1, 2, 3, 4, 5]
//如果不加[]就是散列的元素
console.log(...(new Set([1, 2, 3, 4, 5])));//1, 2, 3, 4, 5


//关于Set的遍历方法
var set = new Set(['red', 'green', 'blue']);
console.log(typeof set.keys());  //object
console.log(typeof set.values());  //object
console.log(typeof set.entries());  //object
console.log(set.keys());//SetIterator {"red", "green", "blue"}
console.log(set.values()); //SetIterator {"red", "green", "blue"}
console.log(set.entries()); //SetIterator {"red", "green", "blue"}


//keys方法、values方法、entries方法返回的都是遍历器对象
for (var item of set.keys()) {
    console.log(item);
}
// red
// green
// blue
for (var item of set.values()) {
    console.log(item);
}
// red
// green
// blue
for (var item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

//练习：使用解构赋值，将数据提取
for (var [key,value] of set.entries()) {
    console.log(key,value);
}
/*
输出：
red red
green green
blue blue
*/ 

//Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。
var set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2) );
// 2
// 4
// 6

//而且，数组的map和filter方法也可以间接用于Set了，通过...转成数组后调用后再生成set
var set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}
var set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}


// set应用案例 并集、交集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}


//Part 111111111111111111111111
var m = new Map();
var o = {p: 'Hello World'};
m.set(o, 'content');
m.get(o); // "content"
m.has(o); // true
m.delete(o); // true
m.has(o); // false

//
//作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
var o = {};
var map = new Map([
    ['name', '张三'],
    [o, 'Author']
]);
map.size; // 2
map.has('name'); // true
map.get('name'); // "张三"
map.has(o); // true
map.get(o); // "Author"

//Map构造函数接受数组作为参数，实际上执行的是下面的算法。
var items = [
    ['name', '张三'],
    ['title', 'Author']
];
var map = new Map();
items.forEach(([key, value]) => map.set(key, value));
//等效于
// items.forEach(function(v){
// 	map.set(v[0],v[1]);
// });

//
// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
let map = new Map();
map.set(1, 'aaa').set(1, 'bbb');
map.get(1); // "bbb"
// 上面代码对键1连续赋值两次，后一次的值覆盖前一次的值。
// 如果读取一个未知的键，则返回undefined。
new Map().get('asfddfsasadf');
// undefined

//只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。
//思考对象会存在这个问题么，对象的键是什么类型，判等是依据什么？
//要特别注意
var map = new Map();
map.set(['a'], 555);
map.get(['a']); // undefined   ['a']是引用类型，两次get和set的不一样

//思考：
var map = new Map();
map.set('a', 555);
map.get('a'); // 555    'a'是基本数据类型，两次get和set的一样

//
var map = new Map();
var k1 = ['a'];
var k2 = ['a'];
map.set(k1, 111);
map.set(k2, 222);
map.get(k1); // 111
map.get(k2); // 222
//上面代码中，变量k1和k2的值是一样的，但是它们在Map结构中被视为两个键。
// 由上可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
// 这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，
// 就不用担心自己的属性与原作者的属性同名。

// 如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，
// 包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键（特例）。
let map = new Map();
map.set(NaN, 123);
map.get(NaN); // 123
map.set(-0, 123);
map.get(+0); // 123


//Part2222222222222222222222222222222222222222 Map相关方法
//Map原型属性和方法/////////////////////////////////////////
let map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2

var m = new Map();
m.set("edition", 6); // 键是字符串
m.set(262, "standard"); // 键是数值
m.set(undefined, "nah"); // 键是undefined

// set方法返回的是Map本身，因此可以采用链式写法
let map = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
// get方法读取key对应的键值，如果找不到key，返回undefined。
var m = new Map();
var hello = function() {console.log("hello");};
m.set(hello, "Hello ES6!"); // 键是函数
m.get(hello); // Hello ES6!

//has方法返回一个布尔值，表示某个键是否在Map数据结构中。
var m = new Map();
m.set("edition", 6);
m.set(262, "standard");
m.set(undefined, "nah");
m.has("edition"); // true
m.has("years"); // false
m.has(262); // true
m.has(undefined); // true

//delete方法删除某个键，返回true。如果删除失败，返回false。
var m = new Map();
m.set(undefined, "nah");
m.has(undefined); // true
m.delete(undefined);
m.has(undefined); // false

//clear方法清除所有成员，没有返回值。
let map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2
map.clear();
map.size // 0

//Map遍历相关的方法////////////////////////////////
let map = new Map([
    ['F', 'no'],
    ['T', 'yes'],
]);
console.log(typeof map.keys());//注意类型是对象，不是数组
for (let key of map.keys()) {
    console.log(key);
}
// "F"
// "T"
console.log(typeof map.values());//注意类型是对象，不是数组
for (let value of map.values()) {
    console.log(value);
}
// "no"
// "yes"
for (let item of map.entries()) {
    console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"
// 或者 回顾解构赋值
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// 等同于使用map.entries()
// for (let [key, value] of map) {
//     console.log(key, value);
// }

/////////////////////////////////////////////
//Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);
console.log([...map.keys()]);
// [1, 2, 3]
console.log([...map.values()]);
// ['one', 'two', 'three']
console.log([...map.entries()]);
// [[1,'one'], [2, 'two'], [3, 'three']]
console.log([...map]);
// [[1,'one'], [2, 'two'], [3, 'three']]

//结合数组的map方法、filter方法，可以实现Map的遍历和过滤（Map本身没有map和filter方法）。
let map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
let map1 = new Map(
    [...map0].filter(([k, v]) => k < 3)
);
// 产生Map结构 {1 => 'a', 2 => 'b'}
let map2 = new Map(
    [...map0].map(([k, v]) => [k * 2, '_' + v])
);
// 产生Map结构 {2 => '_a', 4 => '_b', 6 => '_c'}

//此外，Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
map.forEach(function(value, key, map) {
    console.log("Key: %s, Value: %s", key, value);
});



//扩展内容，补充思考：
//Map与其他数据结构对象的转换，参考电子书13.3.4章节
//Map转为数组
//前面已经提过，Map转为数组最方便的方法，就是使用扩展运算符（...）。
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

//数组转为Map
//将数组转入Map构造函数，就可以转为Map。
new Map([[true, 7], [{foo: 3}, ['abc']]]);
// Map {true => 7, Object {foo: 3} => ['abc']}

//Map转为对象
//如果所有Map的键都是字符串，它可以转为对象。
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

//对象转为Map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
objToStrMap({yes: true, no: false});
// [ [ 'yes', true ], [ 'no', false ] ]


var map =new Map();
map.set(['a'],555);
console.log(['a']);
console.log(map.get(['a']));  //引用数据类型三等不一样

var map = new Map();
var k1 = ['a'];
var k2 = ['a'];
map.set(k1, 111);
map.set(k2, 222);
map.get(k1); // 111
map.get(k2); // 222

var map = new Map();
var k1 = 'a';
var k2 = 'a';
map.set(k1, 111);
map.set(k2, 222);
map.get(k1); // 222   //会被后面覆盖掉
map.get(k2); // 222

