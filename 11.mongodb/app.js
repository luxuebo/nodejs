let express = require("express");
let bodyParser = require("body-parser");
let router = require('./router')
let app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(`/`,router)
app.listen(3000,'127.0.0.1',()=>{
    console.log('server run at http://localhost:3000')
})