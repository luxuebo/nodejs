function get() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/user', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                console.log(JSON.parse(xhr.response))
            }
        }
    }
    xhr.send()
}
function post(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                console.log(JSON.parse(xhr.response))
            }
        }
    }
    var datas = new FormData();
    datas.append('uname', 'hehe');
    datas.append('upass', 123456);
    xhr.open('post', 'http://localhost:3000/user', true);
    xhr.send(datas);
}

post()

