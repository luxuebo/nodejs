let {env,server} = require('./config.js')
let express = require("express");
let bodyParser = require("body-parser");
let allrouter= require('./router/index')

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");//跨域处理
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//添加路由
for(let key of Object.keys(allrouter)){
    app.use(`/`,allrouter[key])
}

if(env == 'development'){
	app.listen(server.port,server.host,()=>{
    console.log(`server run at http://${server.host}:${server.port}`)
	})
}else{
	app.listen(server.port,()=>{
    console.log(`server run at http://${server.host}:${server.port}`)
    })
}
