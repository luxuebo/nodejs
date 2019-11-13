let env = require('./config.js')
let express = require("express");
let bodyParser = require("body-parser");
let {userRouter,loginRouter} = require('./router/index')
let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(`/`,userRouter)
app.use(`/`,loginRouter)
app.listen(env.port,env.host,()=>{
    console.log(`server run at http://${env.host}:${env.port}`)
})