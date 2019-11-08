var express = require("express");
var app = express();
//控制器
var router = require("./controllers");

//设置模板引擎
app.set("view engine", "ejs");

//路由中间件，静态页面
app.use(express.static("./static"));
//首页
app.get("/", router.showIndex);


app.listen(3000,()=>{
    console.log(`server run at: http:localhost:3000`)
});