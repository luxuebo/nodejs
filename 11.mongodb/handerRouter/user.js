exports.adduser = adduser;
exports.queryuser = queryuser;
exports.updateuser = updateuser;
exports.deluser = deluser;
let {add,query,update,del} = require('../mongodb/db')
let {mongodbconfig} = require('../mongodb/config')
//添加用户
function adduser(params,callback){
    //校验参数是否符合规范
    let addData = [{
        username:'',
        password:'',
        email:'',
        role:''
    }];
    let accordlist = [];
    let errlist = []
    params.forEach((item,index)=>{
        let requireParamsList = ['username','password','email','role'];
        let accord = 0;
        for(let key of Object.keys(item)){
            if(requireParamsList.includes(key)){
                addData[0][key] = item[key];
                requireParamsList.splice(index,1)
                accord++
            }
        }
        accordlist.push(accord)
    })
    accordlist.forEach((item,index)=>{
        if(item !=4){
            errlist.push(params[index])
        }
    })
    if(errlist.length){

        callback(errlist)
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
    let updata = [];
    params.forEach((item,index) => {
        idlist.push(item._id)
        updata.push({})
        for(let key of Object.keys(item)){
            if(key !='_id'){
                updata[index][key] = item[key]
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