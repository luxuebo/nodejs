let enviroment = 'development' //development,production
let server={}
if(enviroment == 'development'){
	server={
		host:'127.0.0.1',
		port:'3000'
	}
}else if(enviroment=='production'){
	server={
		host:'139.129.97.1',
		port:'3000'
	}	
}
module.exports=server
