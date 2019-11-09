let file = require('../models/file');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');
//首页页面
exports.showIndex = function (req, res, next) {
    file.getAllAlbums(function (err, allFiles) {
        //err是字符串
        if (err) {
            next(); //交给下面适合他的中间件
            return;
        }
        res.render("index", {
            "albums": allFiles,
        });
    })
}
//相册页面
exports.showAlbum = function (req, res, next) {
    let albumName = req.params.albumname;
    file.getAlbumAllImages(albumName, function (err, allFiles) {
        //err是字符串
        if (err) {
            next(); //交给下面适合他的中间件
            return;
        }
        res.render("album", {
            "images": allFiles,
            "albumName": albumName
        });
    })
}

//上传页面
exports.showUp = function (req, res, next) {

    file.getAllAlbums(function (err, allFiles) {
        //err是字符串
        if (err) {
            next(); //交给下面适合他的中间件
            return;
        }
        res.render("up", {
            "allfolders": allFiles
        });
    })
}
//上传接口
exports.showUpStatus = function (req, res, next) {
    let uptempfolder = path.normalize(__dirname+'/../uptemploads');//临时上传位置

    var form = new formidable.IncomingForm({
        uploadDir:uptempfolder
    });
    form.parse(req, function (err, fields, files) {
        if(err){
            res.send('上传图片失败');
            return;
        }
        let folder = fields.folder ;//上传到的文件夹
        let filename = files.file.name.replace(/(.*)(?=\.)/,'');//上传的文件后缀名
        let filesize = files.file.size;//上传文件的大小
        let filetype = files.file.type;//上传文件的类型
        let uptempfilepath = files.file.path;//临时接收上传的位置
        let newfilename = Date.now()+filename;//修改过的文件名
        let upfilepath = path.normalize(__dirname+'/../uploads/'+folder+'/'+newfilename);//上传文件位置
        if(!filesize){
            res.render("infopage", {
                "title": '上传图片',
                "backurl":'/up',
                "message":'没有选择需要上传的图片'
            });
            return;
        }
        if(!/(png|jpg|jpeg|gif)/.test(filetype)){
            res.render("infopage", {
                "title": '上传图片',
                "backurl":'/up',
                "message":'上传失败，只能接收png,jpg,jpeg,gif格式的图片'
            });
            return;
        }
        if(filesize>1024*1024*5){
            res.render("infopage", {
                "title": '上传图片',
                "backurl":'/up',
                "message":'上传失败，上传图片最大5M'
            });
            return;
        }
        //把图片移动到uploads/folder 文件夹中
        fs.rename(uptempfilepath,upfilepath,function(err){
            if(err){
                console.log(err);
                res.render("infopage", {
                    "title": '上传图片',
                    "backurl":'/up',
                    "message":'上传失败'
                });
                return;
            }
        })
        res.render("infopage", {
            "title": '上传图片',
            "backurl":'/up',
            "message":'上传成功'
        });
    });
}
//删除图片接口
exports.showDelStatus = function (req, res, next) {
    let parmas = Object.keys(req.body)//接收参数
    let folder = '';//获取当前图片所在文件夹
    let imgpath = [];//删除图片的路径
    let delimgpathList = [];//删除图片的绝对路径
    for(let key of parmas){
        if(key.search(/\_/)  != -1){
            folder = key.replace('_','/') 
        }else{
            imgpath.push(key)
        }
    }
    for(let k of imgpath){
        delimgpathList.push(path.normalize(__dirname+'/../uploads/'+k))
    }
    file.delImg(delimgpathList,folder,function(message,backurl){
        res.render("infopage", {
            "title": '删除图片',
            "backurl":backurl,
            "message":message
        });
    })
}