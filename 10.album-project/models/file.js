let fs = require('fs');

exports.getAllAlbums = function(callback){
    fs.readdir('./uploads',function(err,files){
       if(err){
           callback('找不到uploads文件',null)
           return
       }
       let allFiles=[];//保存uploads下一级的文件夹
       (function iterator(i){
            if(i == files.length){
                console.log(allFiles);
                callback(null,allFiles);
                return;
            }
            fs.stat('./uploads/'+files[i],function(err,stats){
                if(err){
                    callback('找不到文件',null)
                }
                if(stats.isDirectory()){
                    allFiles.push(files[i]);
                }
                iterator(i + 1);
            })
       })(0);

    })
}