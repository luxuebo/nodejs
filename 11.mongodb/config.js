let env = 'development'
module.exports={
	env:env,
	server:{
		host:env=='development'?'127.0.0.1':'139.129.97.1',
		port:env=='development'?3000:3000
	}
}
