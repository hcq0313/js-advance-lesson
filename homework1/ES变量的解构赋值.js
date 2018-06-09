//不用解构赋值方式定义变量
var a = 1;var b = 2;var c = 3;
console.log(a,b,c);//1 2 3

//用解构赋值方式定义变量
//Part 1111111111111111 数组的解构赋值
var [a, b, c] = [1, 2, 3];
console.log(a,b,c); //1 2 3

//let 也支持解构赋值
let [foo,[[bar],baz]] = [1,[[2],3]];
console.log(foo,bar,baz); //1 2 3

//当[]内有空的情况
let [ , , xx] = ["foo", "bar", "baz"];
console.log(xx);// "baz"

let [x, , y] = [1, 2, 3];
console.log(x,y);//1 3

let [head, ...tail] = [1, 2, 3, 4];   //三个...表示除去前面的那个元素剩下的后面所有的
console.log(head,tail);//1 [2, 3, 4]

let [d, e, ...f] = ['a'];  //数不够的时候，单个元素为undefined，...代表空数组
console.log(d,e,f);//"a" undefined []

//注意：如果解构不成功，变量的值就等于undefined
var [foo2] = [];
var [bar2, fee2] = [1];
console.log(foo2,fee2);   //undefined undefined

//不完全解构的情况
let [x2, y2] = [1, 2, 3];
console.log(x2, y2);//1 2

let [a2, [b2], d2] = [1, [2, 3], 4];
console.log(a2, b2, d2);//1 2 4

//如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

//解构赋值中的默认值
var [foo3 = true] = [];//foo3 为 true
[x3, y3 = 'b'] = ['a']; // x3='a', y3='b'
[x4, y4 = 'b'] = ['a',undefined]; // x4='a'y4='b'  //如果右边的数判等完全等于undefined，则默认值生效

// ES6内部使用严格相等运算符（===），判断一个位置是否有值。
// 所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
var [x5 = 1] = [undefined];//x5 为 1
var [x6 = 1] = [null];//x6 为 null  null和undefined不是完全等于，所以默认值不生效

function f2() {
    return 2;
}
let [x7 = f2()] = [1];
console.log(x7);  //x7的默认值是2，由于右侧括号里面1与undefined不是完全的等于，所以默认值无效

//默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [m1 = 1, n1 = m1] = []; // m1=1; n1=1  因为都是undefined，判等完全符合，所以默认值有效
let [m2 = 1, n2 = m2] = [2]; // m2=2; n2=2  第一个默认值无效，所以m2=2
let [m3 = 1, n3 = m3] = [1, 2]; // m3=1; n3=2 两个默认值都无效，所以都分别等于[]里面的数
//let [m4 = n4, n4 = 1] = []; // ReferenceError 后面都是undefined，默认值全部生效，但是因为m4=n4，n4是在m4后面定义的，用let定义的不能把参数定义提前，所以报错
var [m4 = n4, n4 = 1] = [];  //undefined 1 因为是用var 所以可以提前，是undefined
console.log(m1,n1,m2,n2,m3,n3);

let a = [];
let b=[2,3,4];
[a[0],a[1],a[2]] = b;
console.log(a == b);//false  ********************************
console.log([a[0],a[1],a[2]]);// [2, 3, 4]

let a = [];
let b=[2,3,4];
a = b;  //赋值相当于让a也指向于b的数组  用var结果一样
console.log(a == b);//true

//对象的解构赋值
/*
对象的解构与数组有一个重要的不同：
数组的元素是按次序排列的，变量的取值由它的位置决定
而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
*/

var { foo1, bar1 } = { foo1: "aaa", bar1: "bbb" };
console.log(foo1,bar1);

var { bar2, foo2 } = { foo2: "ccc", bar2: "ddd" };//顺序不同，没关系
console.log(foo2,bar2);

var { baz3 } = { foo3: "ccc", bar3: "ddd" };
console.log(baz3);


//左侧为键值对时,注意键值对赋值时的对应关系
var { foo4: baz4 } = { foo4: 'aaa', bar4: 'bbb' };
console.log(baz4);// "aaa"

let obj1 = { first: 'hello', last: 'world' };

let { first: f, last: l } = obj1;
console.log(f,l);//hello world

let { first, last } = obj1;
console.log(first,last);//hello world

//也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
var { foo6: baz6 } = { foo6: "aaa", bar6: "bbb" };
console.log(baz6);// "aaa"
//foo6 // error: foo is not defined
//上面代码中，真正被赋值的是变量baz6，而不是模式foo6

var obj2 = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};
var { p: [x, { y }] } = obj2;
console.log(x); // "Hello"
console.log(y); // "World //若上边改为var { p: [x, { y:z }] } = obj2;  报错 y is not defined
//思考console.log(p);报错  p is not defined

///
var node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};
var { loc: { start: { line }} } = node;
line // 1
//loc // error: loc is undefined
//start // error: start is undefined
//上面代码中，只有line是变量，loc和start都是模式，不会被赋值。

//对象的解构也可以指定默认值。
var {x2 = 3} = {};
console.log(x2); // 3

var {x3, y3 = 5} = {x3: 1};
console.log(x3); // 1
console.log(y3); // 5

var {x4:y4 = 3} = {};
console.log(y4); // 3

var {x5:y5 = 3} = {x5: 5};
console.log(y5); // 5
var { message: msg = 'Something went wrong' } = {};
console.log(msg); // "Something went wrong"

//字符串也可以解构赋值
const [a, b, c, d, e] = 'hello';//相当于将'hello'转成了["h","e","l","l","o"]后解构
console.log(a); // "h"
console.log(b); // "e"
console.log(c); // "l"
console.log(d); // "l"
console.log(e); // "o"

