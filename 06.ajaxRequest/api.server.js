let http = require('http');
let qs = require('querystring');
let url = require('url');
const whiteList = ['http://127.0.0.1:3000','http://localhost:3000']//允许跨域的源
let server = http.createServer(function(req,res){
	if(whiteList.includes(req.headers.origin)){
		res.setHeader('Access-Control-Allow-Origin',req.headers.origin)//解决跨域
	}
	res.writeHead(200,{'Content-Type':'application/json;charset=UTF8'});//设置响应头
	if(req.url == '/favicon.ico'){
		//不处理小图标
		return;
	}
	if(req.method.toLowerCase()=='get'){
		let pathname = url.parse(req.url).pathname//请求路径
		let query = url.parse(req.url).query;//请求参数
		let reqdata =  qs.parse(query)
		if(pathname == '/testget'){
			console.log('接收的数据:'+query)
			let resdata={
				code:200,
				msg:'get请求成功'
			}
			res.end(JSON.stringify(resdata))//向前端返回数据
		}
	}
	if(req.url == '/testpost'&&req.method.toLowerCase()=='post'){
		//post 请求,地址为:http://localhost:4000/testpost
		let reqdata = "";
		//一段一段的来接收post请求传递的数据
		req.addListener('data',function(chunk){
			reqdata+=chunk;
		})
		//接收完成
		req.addListener('end',function(chunk){
			let data = qs.parse(reqdata)//将接收的数据转换成对象
			console.log('接收的数据:'+reqdata)
			let resdata={
				code:200,
				msg:'post请求成功'
			}
			res.end(JSON.stringify(resdata))//向前端返回数据
		})
	}
})
server.listen(4000,()=>{
	console.log(`api.server run at http://localhost:4000`)
})