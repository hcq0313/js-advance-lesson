//定义对象的三种方式
var obj1={X:1};

var obj2=Object.create(obj1);
obj2.y=2;

***第三种
通过构造函数来创建对象- 当一个函数与new结合，该函数将作为构造函数来使用，用来创建JS对象
JS（ES5）中没有其他语言（C++、Java）中的类，JS中通过构造函数来实现类的功能
在JS中构造函数也是对象，有一个重要的属性（原型 prototype），该属性与继承相关
var obj3=function(){this.z=3;}
var obj= new obj3();

console.log(obj1,obj2,obj3);

JavaScript语言继承方式
（1）JavaScript采用的是原型的继承方式，每个对象都有一个原型对象，最原始的原型是null
（2）JavaScript的继承是对象-对象的原型继承，为面向对象提供了动态继承的功能
（3）任何方式创建的对象都有原型对象，可以通过对象的 __proto__ 属性来访问原型对象


var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
//console.log(obj.__proto__);
console.log(obj.__proto__ === Object.prototype);

var newObj = Object.create(obj);
newObj.age = 23;
//console.log(newObj.__proto__);
console.log(newObj.__proto__ === obj);

//JavaScript的继承方式 是对象-对象的继承，对象要实现继承首先要有原型对象
console.log(newObj.__proto__.__proto__);//Object.prototype
console.log(newObj.__proto__.__proto__.__proto__);//null


通过实例化出来的对象的__proto__属性来确认下原型
实例化的这个对象，有一个属性__proto__指向原型
通过判断得知实例化出来的对象的__proto__就是构造函数的prototype属性
var proObj = {
    z:3
};

var obj = Object.create(proObj);
obj.x = 1;
obj.y = 2;

console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3

console.log("z" in obj);//true
console.log(obj.hasOwnProperty("z"));//false

///////////Part2 原型链属性操作////////////
obj.z = 5;

console.log(obj.hasOwnProperty("z"));//true
console.log(obj.z);//5
console.log(proObj.z);//3

obj.z = 8;
console.log(obj.z);//8

delete obj.z;//true
console.log(obj.z);//3

delete obj.z;//true
console.log(obj.z);//still 3

//如何删除原型上的属性
delete  obj.__proto__.z;//或者delete proObj.z;
console.log(obj.z);//此时彻底没有z了

function Person(age,name) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person(20,"Jack");
console.log(p1.name);
console.log(p1.age);
p1.sayHi();


function Person(name) {
    this.name = name;
    this.age = 21;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm ",this.name,this.age,"years old!");
};

var p1 = new Person("Mike");
console.log(p1.name);
console.log(p1.age);
p1.sayHi();

console.log(p1.__proto__ === Person.prototype);//true

function MyObj() { }
MyObj.prototype.z = 3;

var obj = new MyObj();
obj.x = 1;
obj.y = 2;

console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3

console.log("z" in obj);//true
**console.log(obj.hasOwnProperty("z"));//false  hasOwnProperty只能看见表面的


function MyObj() { }
MyObj.prototype.z = 3;

var obj = new MyObj();
obj.x = 1;
obj.y = 2;

console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3

console.log("z" in obj);//true
console.log(obj.hasOwnProperty("z"));//false

///////////Part2 原型链属性操作////////////
obj.z = 5;

console.log(obj.hasOwnProperty("z"));//true
console.log(obj.z);//5
console.log(MyObj.prototype.z);//3

obj.z = 8;
console.log(obj.z);//8

delete obj.z;//true
console.log(obj.z);//3

delete obj.z;//true
console.log(obj.z);//still 3

//如何删除原型上的属性
delete  obj.__proto__.z;//或者delete MyObj.prototype.z;
console.log(obj.z);//此时彻底没有z了


function Person(age,name) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person(20,"Jack");
console.log(p1.name);
console.log(p1.age);
p1.sayHi();
//p1的原型有一个属性sayhi
p.__proto__===Person.prototype;
Person.__proto__===Function.prototype;
Person.__proto__.__proto__===Object.prototype;

