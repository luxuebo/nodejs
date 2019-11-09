var express = require("express");
var app = express();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended:false})//处理 application/x-www-form-urlencoded

//控制器
var router = require("./controllers");

//设置模板引擎
app.set("view engine", "ejs");

app.use(express.static("./static"));//路由中间件，静态页面
app.use(express.static("./uploads"));//路由中间件，上传的图片资源静态展示

app.get("/", router.showIndex);//首页
app.get("/:albumname", router.showAlbum);//图片预览页面
app.get("/up", router.showUp);//上传页面
app.post("/upimg", router.showUpStatus);//上传接口
app.post("/delimg",urlencodedParser, router.showDelStatus);//上传接口

app.use(function(req,res){
    res.render('404');
})

app.listen(3000,()=>{
    console.log(`server run at: http:localhost:3000`)
});