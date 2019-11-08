let express = require('express');
let app = express();
let bodyParser = require('body-parser');//处理简单参数post请求参数的中间件
let  multer = require('multer')//处理post请求 multiple/form-data
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+'/uploads')//设置上传位置
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)//设置文件名

    }
})

let upload = multer({storage:storage})

let rootpath = __dirname.replace('\\server','');

//静态资源目录
app.use(express.static(rootpath+'/views'))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
// let urlencodedParser = bodyParser.urlencoded({extended:false})//处理 application/x-www-form-urlencoded
// let jsonParser = bodyParser.json()//处理 application/json

//get请求
app.get('/api/user',function(req,res){
    let params = req.query;//请求参数对象
    console.log(params)
    res.send({
        "username":"张三",
        "token":123321
    })
})

//post请求
app.post('/api/userinfo1',function(req,res){
    //application/x-www-form-urlencoded
    console.log(req.body)
    res.send({
        "username":"post请求获取数据(application/x-www-form-urlencoded)",
        "token":123456
    })
})
app.post('/api/userinfo2',function(req,res){
    //application/json
    console.log(req.body)
    res.send({
        "username":"post请求获取数据(application/json)",
        "token":654321
    })
})
app.post('/api/userinfo3',upload.single('avatar'),function(req,res,next){
    //multiple/form-data
    console.log(req.file)
    console.log(req.body)
    res.send('上传成功(multipart/form-data)')
})

app.listen(80,'127.0.0.1',()=>{
    console.log(`server run at: http://127.0.0.1`)
})