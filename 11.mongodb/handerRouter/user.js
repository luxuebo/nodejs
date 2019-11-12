exports.adduser = adduser;
exports.queryuser = queryuser;
exports.updateuser = updateuser;
exports.deluser = deluser;
let {add,query,update,del} = require('../mongodb/db')
let {mongodbconfig} = require('../mongodb/config')
//添加用户
function adduser(params,callback){
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
        callback('参数不对')
        return
    }
    let databaseName = mongodbconfig.databaseName.firstdemo;
    let col = mongodbconfig.collection.firstdemo.user;
    add(databaseName,col,addData,function(err,result){
        if(err){
            callback(err)
            
        }else{
            callback(null,result)
        }
    })
}

//查询用户
function queryuser(params,callback){
    let databaseName = mongodbconfig.databaseName.firstdemo;
    let col = mongodbconfig.collection.firstdemo.user;
    query(databaseName,col,params,function(err,doc){
        if(err){
            callback(err)
        }else{
            callback(null,doc)
        }
    })

}

//修改用户
function updateuser(params,callback){
    
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
        callback('没有选择需要更新的用户')
        return;
    }
    update(databaseName,col,{idlist:idlist,updata:updata},function(err,result){
        if(err){
            callback(err)
            return;
        }else{
            callback(null,result) 
        }
    })
}
//删除用户
function deluser(idlist,callback){
   
    let databaseName = mongodbconfig.databaseName.firstdemo;
    let col = mongodbconfig.collection.firstdemo.user;
    del(databaseName,col,idlist,function(err,msg){
        if(err){
            callback(err)
            return;
        }else{
            callback(null,msg) 
        }

    })
}