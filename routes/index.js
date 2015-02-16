var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//router.get('/', function(req, res){
//    console.log(req);
//    res.sendFile(__dirname + req.path);
//});

//router.get('/:id', function(req, res, next){
//    client.select('1', function(){
//        client.get('post-' + req.params.id, function(err, data) {
//            if (err || data == null) {
//                res.writeHead(404, {"Content-Type": "text/plain"});
//                res.write("404 Not Found\n");
//                res.end();
//                return;
//            } else {
//                res.send(data.toString());
//                return
//            }
//        });
//    });
//});
//
//router.post('/', function(req, res, next){
//    client.select('1', function(){
//        client.get('max-index', function(err, data) {
//            var maxindex;
//            if (err || data == null) {
//                console.log('no max-index found, returning 0');
//                maxindex = 0;
//            } else {
//                console.log('max-index found =', data);
//                maxindex = Number(data.toString());
//            }
//            var newindex = maxindex + 1;
//            console.log('max-index is now', newindex);
//            console.log('set post-' + String(newindex));
//            client.set('max-index', newindex);
//            client.set('post-' + String(newindex), req.body.content);
//            res.redirect('/');
//        });
//    });
//});

module.exports = router;
