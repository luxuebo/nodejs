let express = require('express');
let router = express.Router();
let {adduser,queryuser,updateuser,deluser} = require('./handler');


router.post('/queryuser',(req,res,next)=>{
    let params = req.body;
    queryuser(params,res)
   
})


router.post('/adduser',(req,res,next)=>{
    let params = req.body;
    adduser(params,res)
    
})

router.post('/updateuser',(req,res,next)=>{
    let params = req.body;
    /* 
    params：[{
        {
            "_id": "5dc7dfe209315320e4c478ad",
            "username": "xiaoming",
            "age": "20",
            "sex": "男",
            "role": "admin"
        }
    },{
         "_id": "5dc7dfe209315320e4c478ad",
            "username": "xiaoming",
            "age": "20",
            "sex": "男",
            "role": "admin"
    }]
    
    */
   
    updateuser(params,res)
    
})

router.post('/deluser',(req,res,next)=>{
    let params = req.body;
    /*
        params:[{
            "_id": "5dc7dfe209315320e4c478ap",
        },{
            "_id": "5dc7dfe209315320e4c478ad",
        }]
    */
    updateuser(params,res)
    
})

router.post('/login',(req,res,next)=>{
    let params = req.body;
    console.log(params)
    res.json({
        code:200,
        token:'123456',
        msg:'登录成功'
    })
})

module.exports = router