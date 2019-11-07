const http = require('http');
const formidable = require('formidable');//接收上产文件的模块
const fs = require('fs');
const whiteList = ['http://localhost:3000','http://127.0.0.1:3000']
http.createServer(function(req,res){
	if(whiteList.includes(req.headers.origin)){
		res.setHeader('Access-Control-Allow-Origin',req.headers.origin)
	}
	if(req.method.toLowerCase()=='post'){
		if(req.url=='/upload'){
			let form = new formidable.IncomingForm({
				 uploadDir : "files",//上传目录，指的是服务器的路径，如果不存在将会报错。
			});
			form.parse(req,function(err,fields,files){
				res.writeHead(200,{'content-Type':'application/json;chaarset=UTF8'})
				if(err){
					console.log(err);
					res.end(`{"code":"001","msg":"上传失败"}`);
					return;
				}
				let resdata = {
					code:"000",
					msg:'上传成功'
				}
				let oldpath = __dirname+'/'+files.file.path;
				let newpath = __dirname+'/files/'+files.file.name;
				fs.rename(oldpath,newpath,function(err){
					if(err){
						console.log('上传文件重命名失败')
					}
				})
				res.end(JSON.stringify(resdata))
			})
		}
	}else{
		res.end()
	}

}).listen(8080,()=>{
	console.log(`api upload server run at http://localhost:8080`)
})