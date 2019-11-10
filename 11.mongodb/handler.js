exports.adduser = adduser;
exports.queryuser = queryuser;
exports.updateuser = updateuser;
exports.deluser = deluser;
let {add,query,update,del} = require('./db')
let {mongodbconfig} = require('./config')
//添加用户
function adduser(params,res){
    console.log(params)
    let requireParamsList = ['username','age','sex','role'];
    let addData = {
        username:'',
        age:'',
        sex:'',
        role:''
    };
    let isadd = false;
    for(let key in params){
        if(requireParamsList.includes(key)){
            isadd = true;
            addData[key] = params[key]
        }
    }
    if(!isadd){
        res.json({
            code:400,
            msg:'参数不对'
        })
        return
    }
    let databaseName = mongodbconfig.databaseName.firstdemo;
    let col = mongodbconfig.collection.firstdemo.user;
    add(databaseName,col,addData,function(err,result){
        if(err){
            res.json({
                code:401,
                msg:'添加用户失败'
            })
        }else{
            res.json({
                code:200,
                msg:'添加用户成功'
            })
        }
    })
}

//查询用户
function queryuser(params,res){
    let databaseName = mongodbconfig.databaseName.firstdemo;
    let col = mongodbconfig.collection.firstdemo.user;
    query(databaseName,col,params,function(err,doc){
        if(err){
            res.json({
                code:401,
                msg:'查询失败'
            })
            return;
        }else{
            res.send(doc) 
        }
    })

}

//修改用户
function updateuser(params,res){
    
    let databaseName = mongodbconfig.databaseName.firstdemo;
    let col = mongodbconfig.collection.firstdemo.user;
    let idlist = [];
    let updata = {};
    params.forEach(item => {
        idlist.push(item._id)
        for(let key of item.keys()){
            if(key !='_id'){
                updata[key] = item.key
            }
        }
    });

    if(!idlist.length){
        res.json({
            code:400,
            msg:'没有选择需要更新的数据'
        })
        return;
    }
    update(databaseName,col,{idlist:idlist,updata:updata},function(err,result){
        if(err){
            res.json({
                code:401,
                data:err,
                msg:result
            })
            return;
        }else{
            res.send(result) 
        }
    })
}
//删除用户
function deluser(idlist,res){
    let databaseName = mongodbconfig.databaseName.firstdemo;
    let col = mongodbconfig.collection.firstdemo.user;
    del(databaseName,col,idlist,function(err,msg){
        if(err){
            res.json({
                code:401,
                data:err,
                msg:msg
            })
            return;
        }else{
            res.send(msg) 
        }

    })
}