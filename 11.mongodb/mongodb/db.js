exports.add = add;
exports.query = query;
exports.update = update;
exports.del = del;

let { mongodbconfig } = require('./config')
let MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;//按照id进行修改和删除



//连接数据库
function linkdb(databaseName,collection,operate) {
    /*
    @params databaseName:  String 数据库名称
    @params collection: String 集合名称
    @params operate:Function 回调函数
    */
    const client = new MongoClient(mongodbconfig.url, {
        useUnifiedTopology: true
    });
    client.connect(function(err){
        if(err){
            console.log("数据库连接失败");
            console.log(err)
            operate(null,null,null,err)
        }else{
            console.log("数据库连接成功");
            const dbName = databaseName;
            const db = client.db(dbName);
            operate(db,collection,client)
        }
    })
    
}

//插入
function add(databaseName,col,addDataList,cb) {
    /*
    @params databaseName:  String 数据库名称
    @params col: String 集合名称
    @params addData:Object 插入的数据
    @params cd:Function 回调函数,有两个参数,一个err错误信息,一个result成功结果 
    */
    linkdb(databaseName,col,function(db,collection,client,errinfo){
        if(errinfo){
            cb(errinfo)//数据库连接失败
            return;
        }
        let errlist = [];
        let resultlist = [];
        (function iterator(i){
            if(addDataList.length == i){
                if(!errlist.length){
                    cb(null,resultlist)
                }else{
                    cb(errlist)
                }
                client.close();//断开数据库连接
                console.log("数据库连接断开");
                return
            }
            db.collection(collection).insertOne(addDataList[i], function (err, result) {
                if (err) {
                    errlist.push(err)
                }else{
                    resultlist.push(result)
                    iterator(i+1)
                }
            });
        })(0);
        
    })
}
//查询
function query(databaseName,col,condition,cb){
    /*
    @params databaseName:  String 数据库名称
    @params col: String 集合名称
    @params condition:Object 查询条件
    @params cd:Function 回调函数,有两个参数,一个err错误信息,一个result成功结果 
    */
    linkdb(databaseName,col,function(db,collection,client,errinfo){
        if(errinfo){
            cb(errinfo)//数据库连接失败
            return;
        }
        db.collection(collection).find(condition).toArray(function(err,doc){
            if(err){
                cb(err)
            }else{
                cb(null,doc)
            }
            client.close();
            console.log("数据库连接断开");
        })
    })
}
//更新
function update(databaseName,col,params,cb){
    /*
    @params databaseName:  String 数据库名称
    @params col: String 集合名称
    @params params:Object ,params.idlist要跟新数据的id,params.updata要更新的数据
    @params cd:Function 回调函数,有两个参数,一个err错误信息,一个result成功结果 
    */
    linkdb(databaseName,col,function(db,collection,client,errinfo){
        if(errinfo){
            cb(errinfo)//数据库连接失败
            return;
        }
        let errlist = [];
        let resultlist = [];
        let idlist = params.idlist;
        let updata = params.updata;
        (function iterator(i){
            if(idlist.length == i){
                if(!errlist.length){
                    cb(null,resultlist)
                }else{
                    cb(errlist)
                }
                client.close();
                console.log("数据库连接断开");
                return
            }
            let whereStr = {_id:ObjectID(idlist[i])}
            db.collection(collection).updateOne(whereStr,{$set:updata[i]},function(err,result){
                if(err){
                    errlist.push(err)
                }else{
                    resultlist.push(result)
                    iterator(i+1)
                }
            })
        })(0)
    })
}

//删除
function del(databaseName,col,idlist,cb){
    /*
    @params databaseName:  String 数据库名称
    @params col: String 集合名称
    @params idlist:Array 每条数据的id
    @params cd:Function 回调函数,有两个参数,一个err错误信息,一个result成功结果 
    */
    linkdb(databaseName,col,function(db,collection,client,errinfo){
        if(errinfo){
            cb(errinfo)//数据库连接失败
            return;
        }
        let errlist = [];
        let resultlist = [];
        (function iterator(i){
            if(idlist.length == i){
                if(!errlist.length){
                    cb(null,resultlist)
                }else{
                    cb(errlist)
                }
                client.close();
                console.log("数据库连接断开");
                return
            }
            let whereStr = {_id:ObjectID(idlist[i])}
            db.collection(collection).deleteOne(whereStr,function(err,result){
                if(err){
                    errlist.push(err)
                }else{
                    resultlist.push(result)
                    iterator(i+1)
                }
            })
        })(0)
    })
}