const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
	if(req.url =='/favicon.ico'){
		res.end('')
		return;
	}
	if(req.url == '/index.html'){
		fs.readFile(`${__dirname+req.url}`,(err,data)=>{
			if(err){

			}else{
				res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' })
				res.end(data)
			}
		})
	}
	if(req.url == '/jquery-3.2.1.min.js'){
		fs.readFile(`${__dirname+req.url}`,(err,data)=>{
			if(err){

			}else{
				res.writeHead(200, { 'content-Type': 'application/javascript;charset=UTF8' })
				res.end(data)
			}
		})
	}
}).listen(3000,'127.0.0.1',()=>{
	console.log(`static server run at http://localhost:3000`)
})