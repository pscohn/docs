var express = require('express');
var app = express();
var http = require('http').Server(app);





http.listen(3000, function(){
    console.log('serving on *:3000')
});
