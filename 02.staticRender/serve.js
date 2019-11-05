const http = require('http');
const fs = require('fs');
const { contentType } = require('./server/contentType.js')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  //路由
  switch (url) {
    case '/':
      resFile('./page/index.html', res);
      break;
    case '/a':
      resFile('./page/a.html', res);
      break;
    case '/b':
      resFile('./page/b.html', res);
      break;
    case '/js/index.js':
      resFile('./js/index.js', res);
      break;
    case '/js/a.js':
      resFile('./js/a.js', res);
      break;
    case '/js/b.js':
      resFile('./js/b.js', res);
      break;
    case '/css/index.css':
      resFile('./css/index.css', res);
      break;
    case '/css/a.css':
      resFile('./css/a.css', res);
      break;
    case '/css/b.js':
      resFile('./css/b.css', res);
      break;
    case '/images/bg.png':
      resFile('./images/bg.png', res);
      break;
    case '/user':
      api('/user',req,res);
      break;
    case '/token':
      api('/token',req,res);
      break;
    case '/authority':
      api('/authority',req,res);
      break;
    default:
      resFile('./page/404.html', res);
      break;
  }

});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function resFile(url, res) {
  //读取静态文件
  let fileType = url.split('.')[2];
  fs.readFile(url, (err, data) => {
    res.writeHead(200, { 'Content-Type': `${contentType(fileType)};charset=UTF-8` });
    res.end(data);
  })
}
function api(url,req,res) {
  if (url == '/user') {
    //连接数据库获取数据
    let data = {
      "code": 200,
      "data": {
        "name": "小明",
        "age": 20
      },
      "msg": "请求成功"
    }
    resData(data,req,res)
    return;

  } else if (url == '/token') {
    let token = {
      "code": 200,
      "data": {
        "token": "xbbsyu891hhjsd",
      },
      "msg": "请求成功"
    }
    resData(token,req,res)
    return;

  } else if (url == '/authority') {
    let authority = {
      "code": 200,
      "data": {
        "roles": ["admin"],
        "info": ""
      },
      "msg": "请求成功"
    }
    resData(authority,req,res)
  }
}
function resData(data,req,res) {
  res.writeHead(200, { 'Content-Type': `application/json;charset=UTF-8` });
  res.end(JSON.stringify(data));
}
