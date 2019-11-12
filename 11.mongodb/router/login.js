let express = require('express');
let router = express.Router();

router.post('/login',(req,res,next)=>{
    let params = req.body;
    console.log('登录请求参数')
    console.log(params)
    res.json({
        code:200,
        token:'123456',
        msg:'登录成功'
    })
    console.log('登录成功')
})

module.exports={
    loginRouter:router
}