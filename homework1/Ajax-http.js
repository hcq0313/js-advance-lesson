function student(name,age,id) {
    this.name = name;
    this.age = age;
    this.id = id;
}
student.prototype.show = function(){
    console.log("i'm",this.name,",i'm ",this.age,"years old!", "my id is",this.id)
}
module.exports = student;

/*
http请求一般由四部分组成：
1、http请求的方法或动作，比如是get还是post
2、正在请求的url，要知道请求的地址
3、请求头，包含一些客户端的环境信息，身份验证信息等等
4、请求体，也就是请求正文，请求正文中可以包含客户提交的查询字符串的信息，表单信息等等
*/

/*
get请求：
一般用于信息获取
使用url传递参数，信息对所有人可见
对所发送的信息的数量也有限制，一般在2000字符

post请求：一般用于修改服务器上的资源
对所发送的信息的数量无限制，比较安全
*/

/*
http响应一般由三部分组成：
1、一个数字和文字组成状态码，用来显示是成功还是失败
2、响应头：响应头和请求头一样包含许多有用的信息，例如，服务器类型，日期时间
内容类型和长度等。
3、响应体：也就是响应正文
*/

/*
open(method,url,async)
method:方法  get 或者post  
url：请求地址
async：请求同步或者异步 true代表异步，可以省略  false代表同步

send(string) 将请求发送到服务器
get时可以不写参数
*/

/*
readyState属性：
0：请求未初始化，open还没有调用
1：服务器连接已建立，open已经调用了
2：请求已接收，也就是接收到头信息了
3：请求处理中，也就是接收到响应主体了

通过onreadystatechange属性来监听
*/
//eg：建立异步请求的过程

var request=new XMLHttpRequest(); 
request.open('get','get.php',true);
request.send();
request.onreadystatechange=function(){
    if(request.readyState===4&&request.status===200){
        //做一些事情
    }

}
//request.readyState===4  响应完成了
//request.status===200  请求成功了

 
//node.js的三个学习网站
/*
1、Node.js官网
2、www.npmjs.com
3、githup
*/





