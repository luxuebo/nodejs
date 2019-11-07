const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
let server = http.createServer(function(req,res){
	 fs.readFile("./index.ejs",function(err,data){
        //绑定模板
        var template = data.toString();
        var dictionary = {
            user:{
            	name:"ejs"
            },
            news : [
                {"title":"陈伟我爱你","count":10},
                {"title":"哈哈哈哈","count":20},
                {"title":"逗你玩儿的","count":30}
            ]
        };
        var html = ejs.render(template,dictionary);

        //显示
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        res.end(html);
    });

}).listen(80)