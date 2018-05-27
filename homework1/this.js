var a=10;var b='hello';
function aa(){
	this.a=20;
	delete this.b;

}
aa();
console.log(a,b);

//可以通过对象里面的函数方法对对象里面的属性进行赋值运算
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        this.x = x;
        this.y = y;
    }
};
point.moveTo(1,1);//this绑定到当前对象，即point对象上
console.log(point);


function Person(age){
	this.age=age;
}
var p=new Person(age);

objA = {name:"AA",x:1};
objB = {name:"BB",x:5};
objA.test = function () {
    console.log(this.name,this.x);
};

objA.test();//AA 1
objA.test.call(objB);//BB 5   objB调用的objA的test方法

??????????????????????????????????????????????????????????????call和apply方法  bind绑定参数

function f1（）{}
f1.__proto__===Function.prototype;
apply和call是定义在 Function.prototype上的
Function.prototype.hasOwnProperty('call'); //true


var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        var that = this;//关键的一行，软绑定 将this的值赋给that，that指的是point
        //内部嵌套函数
        function moveToX() {
            that.x = x;//this改为that
        }
        //内部嵌套函数
        function moveToY() {
            that.y = y;//this绑定到了window上面
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//函数嵌套是不进行传递的

var point = {
    x:0,y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;//this绑定到了哪里？
        }
        function moveToY() {
            this.y = y;//this绑定到了哪里？
        }
        moveToX.call(this);//->this.moveToX()->point.MoveToX() this指的是point
        moveToY();
    }
};
point.moveTo(2,2);console.log(point);//2,0


var point = {
    x:0,y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;//this绑定到了哪里？
        }
        function moveToY() {
            this.y = y;//this绑定到了哪里？
        }
        moveToX.bind(point)();
        moveToY.bind(point)(); //bind第一个参数是绑定到谁身上，返回的是一个函数
    }
};
point.moveTo(2,2);
console.log(point);

function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX(x);// moveX.call(this,x);this指的是point    moveX.bind(this.x)()   
        moveY(y);//moveY.call(this,y); moveY.apply(this,[y]);   moveY.bind(this.y)()  
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point{x:2,y:3}没有移动
//在function函数下和第一个函数下的东西都是指的是point



this指的是调用函数的主体
照片的题

任何对象的原型都是对象，原型一定是对象