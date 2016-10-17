var express = require('express')
var app = express()
var port = 8080


app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'))

app.all('*',function(req,res) {
	res.render('index',{})
})

app.listen(port,function() {
	console.log('Server started on port:',port)
})