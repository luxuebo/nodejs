const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
let serveConfig = {
    port: 3000,
    hostname: '127.0.0.1',
    staticRoot: './static'//静态资源根路径
}
//创建服务器
http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    //不处理小图标
    if (pathname == '/favicon.ico') return;
    //默认首页
    if (pathname == '/') pathname = '/index.html'
    //检查文件是否存在
    fs.access(`${serveConfig.staticRoot + pathname}`, fs.constants.F_OK, (err) => {
        if (err) {
            //静态资源不存在
            fs.readFile(`${serveConfig.staticRoot}/404.html`, (err, data) => {
                if (err) {
                    console.log('404页面读取失败')
                    res.writeHead(200, { 'content-Type': 'text/plain;charset=UTF8' })
                    res.end('你访问的页面不存在')
                    return;
                } else {
                    res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' })
                    res.end(data)
                }
            })
        } else {
            //静态资源存在，开始读文件
            fs.readFile(`${serveConfig.staticRoot + pathname}`, (err, data) => {
                //获取文件拓展名
                let extendname = path.extname(pathname);

                if (err) {
                    console.log('文件读取失败')
                    res.writeHead(200, { 'content-Type': 'text/plain;charset=UTF8' })
                    res.end('文件读取失败')
                    return;
                } else {
                    res.writeHead(200, { 'content-Type': `${getContentType(extendname)};charset=UTF8` })
                    res.end(data)
                }
            })
        }
    });
}).listen(serveConfig.port, serveConfig.hostname, () => {
    console.log(`server run in http://${serveConfig.hostname}:${serveConfig.port}`)
})
//获取MIME类型
function getContentType(extendname) {
    let content = 'text';
    let type = 'html';
    switch (extendname) {
        case '.js':
            content = 'application';
            type = 'javascript';
            break;
        case '.css':
            type = 'css';
            break;
        case '.png':
            content = 'image';
            type = 'png';
            break;
        case '.jpg':
            content = 'image';
            type = 'jpeg';
            break;
        case '.jpeg':
            content = 'image';
            type = 'jpeg';
            break;
        case '.gif':
            content = 'image';
            type = 'gif';
            break;
        case '.svg':
            content = 'image';
            type = 'svg+xml';
            break;
        case '.mp3':
            content = 'audio';
            type = 'mpeg';
            break;
        case '.mp4':
            content = 'video';
            type = 'mp4';
            break;
        case '.ttf':
            content = 'application';
            type = 'x-font-ttf';
            break;
        case '.json':
            content = 'application';
            type = 'json';
            break;
        default:
            break;
    }
    return `${content}/${type}`;
}