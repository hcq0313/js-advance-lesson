//JS对象
1、对象是什么？
	JS对象是一种复合值：将很多值复合在一起（包括原始类型值、对象、函数）
	JS对象是若干无序属性的集合，可以直接通过属性名来访问对象的属性（键值对）
	*函数作为某一个对象的属性时，称其为该对象的方法

访问对象的两种方式：obj.x1;  obj['x1'];
	
var obj = {
    x1:10,
	x2:11,
	x3:12
};
for(var i=1;i<4;i++){
	console.log(obj['x'+i]);
}
**//用循环访问对象内的各个属性时，必须用obj['x1'];形式访问，obj.x1;无法实现
例：
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        console.log(this.str);//方法中的this指的是对象obj
    }
};
console.log(obj.num);//10
console.log(obj.str);//Hi
obj.show();			 //Hi

改变属性的方式：
var obj = {};
obj.x = 2;//直接添加属性
console.log(obj.x);//通过.访问属性
obj.x = 5;//设置属性
console.log(obj["x"]);//通过[]访问属性
delete obj.x;//删除属性
console.log(obj.x);

2、JS对象分类
内置对象（native object）由ECMAScript规范定义的对象或构造器对象（数组、函数等）
宿主对象（host object）由JS解析器所嵌入的宿主环境定义的（如：window、document）
自定义对象（user-defined object）运行中的用户自定义JS代码创建的对象

//typeof
console.log(typeof Array);
console.log(typeof Function);
console.log(typeof Date);
console.log(typeof Number);
console.log(typeof String);
console.log(typeof Boolean);//这个和前面的都是function
console.log(typeof Math);//object
console.log(typeof JSON);//object

console.log(Object instanceof Function);//true
console.log(Object instanceof Object);//true
console.log(Boolean instanceof Function);//true
console.log(Boolean instanceof Object);//true
console.log(String instanceof Function);//true
console.log(String instanceof Object);//true
console.log(Number instanceof Function);//true
console.log(Number instanceof Object);//true
console.log(Function instanceof Function);//true
console.log(Function instanceof Object);//true
console.log(Array instanceof Function);//true
console.log(Array instanceof Object);//true
console.log(Date instanceof Function);//true
console.log(Date instanceof Object);//true

console.log(Math instanceof Function);//false
console.log(Math instanceof Object);//true
console.log(JSON instanceof Function);//false
console.log(JSON instanceof Object);//true

3、JS对象属性的分类
数据属性（property，属性），字符串的键到值的映射（包括基本类型数据、对象、函数）
访问器属性（accessor，或称为访问器），访问属性的方法，注意：访问和设置时不加括号
内置属性（internal property）存在与ECMAScript规范中，不能直接访问
例1：
var o = {
    _x:1.0,//如果都写成x会怎样
    get x(){
        return this._x;//如果都写成x会怎样
    },
    set x(val){
        this._x = val;//如果都写成x会怎样
    }
};
console.log(o.x);//1
o.x = 2;
console.log(o.x,o._x);//2 2

set 和get方法优先级高，先调用这俩

例2：
var o = {
    _x:1.0,
    get x(){
        return this._x;
    },  
};
console.log(o.x);//1 相当于给o添加了一个x的属性
o.x = 2;
console.log(o.x);//1  优先调用get方法，return的是this._x

*同例：
var o = {
    _x:1.0,
    get x(){
        return this._x;
    }
};
console.log(o.x);//1
o.x = 2;
console.log(o.x,o._x);//1  1  **注意：一定要记得优先调用get方法

var obj3 = {};
for(var i=0;i<10;i++){
    obj3.i = i;
}
console.log(obj3);
//输出：i: 9

var obj4 = {};
for(var i=0;i<10;i++){
    obj4[i] = i;
}
console.log(obj4);
//输出结果：{0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}

创建JS对象的方式
通过对象字面量的方式直接创建对象
通过Object的create静态方法创建对象
通过构造函数的方式创建对象
（1）//通过字面量的方式创建 JS对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.num);
console.log(obj.str);
console.log(obj.show());
console.log(obj.__proto__);
console.log(obj.__proto__ === Object.prototype);

var arr=[1,2,3];
arr.__proto__===Array.prototype;
({}).__proto__===Object.prototype;//看对象原型的时候要给{}加括号

（2）//通过Object工场方法创建JS对象,注：JS对象是通过原型链的方式实现的对象继承
var newObj = Object.create(obj);//newObj的原型是obj
newObj.age = 23;
console.log(newObj.num);
console.log(newObj.str);
console.log(newObj.show());
console.log(newObj.age);//自有属性
console.log(newObj.__proto__);
console.log(newObj.__proto__ === obj);

（3）//构造函数的方式创建JS对象 