let express = require('express');
let router = express.Router();
let {adduser,queryuser,updateuser,deluser} = require('../handerRouter/user');


router.post('/queryuser',(req,res,next)=>{
    let params = req.body;
    console.log('查询用户请求参数')
    console.log(params)
     /* 
    params：[{
        {
            "username": "xiaoming",
            "age": "20",
            "sex": "男",
            "role": "admin"
        }
    },{
            "username": "xiaoming",
            "age": "20",
            "sex": "男",
            "role": "admin"
    }]
    
    */
    queryuser(params,function(err,result){
        if(err){
            res.json({
                code:401,
                data:err,
                msg:'查询用户失败'
            })
            console.log('查询用户失败')
            console.log(err)
        }else{
            res.json({
                code:200,
                data:result,
                msg:'查询用户成功'
            })
            console.log('查询用户结果')
            console.log(result)
        }
    })
   
})


router.post('/adduser',(req,res,next)=>{
    let params = req.body;
    console.log('添加用户请求参数')
    console.log(params)
     /* 
    params：[
        {
            "username": "xiaoming",
            "age": "20",
            "sex": "男",
            "role": "admin"
        }
    ]
    
    */
    queryuser({username:params[0].username},function(err,result){
        if(err){
            res.json({
                code:401,
                data:err,
                msg:'查询失败,暂时无法添加用户'
            })
            console.log('查询用户结果')
            console.log(err)
        }else{
            if(result.length){
                res.json({
                    code:201,
                    data:result,
                    msg:'该用户已存在'
                })
                console.log('添加用户失败,该用户已存在')
                console.log(result)
                return;
            }
            adduser(params,function(err,results){
                if(err){
                   res.json({
                    code:401,
                    data:err,
                    msg:'添加用户失败'
                   })
                   console.log('添加用户失败')
                   console.log(err)
                }else{
                   res.json({
                       code:200,
                       data:results[0].ops,
                       msg:'添加用户成功'
                   })
                   console.log('添加用户成功')
                   console.log(results[0].ops)
                }
            })
        }
    })
})

router.post('/updateuser',(req,res,next)=>{
    let params = req.body;
    console.log('修改用户请求参数')
    console.log(params)
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
   
    updateuser(params,function(err,result){
        if(err){
            res.json({
                code:401,
                data:err,
                msg:'更新用户失败'
            })
            console.log('更新用户失败')
            console.log(err)
        }else{
            res.json({
                code:200,
                data:result,
                msg:'更新用户成功'
            })
            console.log(result)
        }

    })
    
})

router.post('/deluser',(req,res,next)=>{
    let params = req.body;
    console.log('删除用户请求参数')
    console.log(params)
    /*
        params:[
            "5dc7dfe209315320e4c478ap",
            "5dc7dfe209315320e4c478ad",
        ]
    */
   deluser(params,function(err,result){
        if(err){
            res.json({
                code:401,
                data:err,
                msg:'删除用户失败'
            })
            console.log('删除用户失败')
            console.log(err)
        }else{
            res.json({
                code:200,
                data:result,
                msg:'删除用户成功'
            })
            console.log('删除用户成功')
            console.log(result)
        }
    })
    
})
module.exports = {
    userRouter:router
}