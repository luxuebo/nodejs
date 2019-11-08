let file = require('../models/file')
//首页
exports.showIndex = function(req,res,next){
    file.getAllAlbums(function(err,allFiles){
        //err是字符串
        if(err){
            next(); //交给下面适合他的中间件
            return;
        }
        res.render("index",{
            "albums" : allFiles
        });
    })
}
//相册
exports.showAlbum = function(req,res,next){
    let albumName = req.params.albumname;
    file.getAlbumAllImages(albumName,function(err,allFiles){
        //err是字符串
        if(err){
            next(); //交给下面适合他的中间件
            return;
        }
        res.render("album",{
            "images" : allFiles,
            "albumName":albumName
        });
    })
}
