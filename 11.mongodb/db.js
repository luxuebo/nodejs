exports.add = add;
exports.query = query;
exports.update = update;
exports.del = del;

let { mongodbconfig } = require('./config')
let MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;



//连接数据库
function linkdb(databaseName,collection,operate) {
    const client = new MongoClient(mongodbconfig.url, {
        useUnifiedTopology: true
    });
    client.connect(function(err){
        if(err){
            console.log(err)
        }else{
            console.log("Connected successfully to server");
            const dbName = databaseName;
            const db = client.db(dbName);
            operate(db,collection,client)
        }
    })
    
}

//插入
function add(databaseName,col,addData,cb) {
    linkdb(databaseName,col,function(db,collection,client){
        db.collection(collection).insertOne(addData, function (err, result) {
            if (err) {
                console.log("插入失败");
                cb(err)
            }else{
                cb(null,result)
            }
            client.close()
        });
    })
}
//查询
function query(databaseName,col,condition,cb){
    linkdb(databaseName,col,function(db,collection,client){
        db.collection(collection).find(condition).toArray(function(err,doc){
            if(err){
                console.log(err);
                cb(err)
            }else{
                cb(null,doc)
            }
            client.close()
        })
    })
}
//更新
function update(databaseName,col,params,cb){
    linkdb(databaseName,col,function(db,collection,client){
        let errlist = [];
        let idlist = params.idlist;
        let updata = params.updata;
        (function iterator(i){
            if(idlist == i){
                if(!errlist.length){
                    cb(null,'更新成功')
                }else{
                    cb(errlist,'更新失败')
                }
                client.close();
                return
            }
            let whereStr = {_id:ObjectID(idlist[i])}
            db.collection(collection).updateOne(whereStr,{$set:updata[i]},function(err,result){
                if(err){
                    errlist.push(idlist[i])
                }else{
                    iterator(i+1)
                }
            })
        })(0)
    })
}

//删除
function del(databaseName,col,idlist,cb){
    linkdb(databaseName,col,function(db,collection,client){
        let errlist = [];
        (function iterator(i){
            if(idlist == i){
                if(!errlist.length){
                    cb(null,'删除成功')
                }else{
                    cb(errlist,'删除失败')
                }
                client.close();
                return
            }
            let whereStr = {_id:ObjectID(idlist[i])}
            db.collection(collection).deleteOne(whereStr,function(err,result){
                if(err){
                    errlist.push(idlist[i])
                }else{
                    iterator(i+1)
                }
            })
        })(0)
    })
}