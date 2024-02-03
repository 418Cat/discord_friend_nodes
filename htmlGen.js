var express = require('express')
var app = express()

app.use(express.static(__dirname + '/webFiles'));


var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)
})

