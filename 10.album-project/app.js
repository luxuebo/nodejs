var express = require("express");
var app = express();
//控制器
var router = require("./controllers");

//设置模板引擎
app.set("view engine", "ejs");

app.use(express.static("./static"));//路由中间件，静态页面
app.use(express.static("./uploads"));//路由中间件，上传的图片资源静态展示

//首页
app.get("/", router.showIndex);
app.get("/:albumname", router.showAlbum);

app.use(function(req,res){
    res.render('404');
})

app.listen(3000,()=>{
    console.log(`server run at: http:localhost:3000`)
});