let fs = require('fs');
//获取uploads下的所有文件夹
exports.getAllAlbums = function(callback){
    fs.readdir('./uploads',function(err,files){
       if(err){
           callback('找不到uploads文件',null)
           return
       }
       let allFiles=[];//保存uploads下一级的文件夹
       (function iterator(i){
            if(i == files.length){
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
//获取文件加中的所有图片
exports.getAlbumAllImages = function(albumfile,callback){
    let imagsFile = './uploads/'+albumfile+'/'
    fs.readdir(imagsFile,function(err,files){
       if(err){
           callback('找不到uploads文件',null)
           return
       }
       let allFiles=[];//保存文件
       (function iterator(i){
            if(i == files.length){
                callback(null,allFiles);
                return;
            }
            fs.stat(imagsFile+files[i],function(err,stats){
                if(err){
                    callback('找不到文件',null)
                }
                if(stats.isFile()){
                    allFiles.push(files[i]);
                }
                iterator(i + 1);
            })
       })(0);
    })
}
//删除文件夹中选中的所有图片
exports.delImg = function(imgpathlist,folder,callback){
    if(!imgpathlist.length){
        callback('没有选择要删除的图片',folder)
        return;
    }
    (function del(i){
        if(imgpathlist.length == i){
            callback('图片删除成功',folder)
            return;
        }
        fs.unlink(imgpathlist[i],function(error){
            if(error){
                callback(`删除${imgpathlist}失败`,folder)
                return false;
            }
            del(i+1)
        })
    })(0);
}