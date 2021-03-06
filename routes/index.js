var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();


function getDocumentIDs(callback) {
    client.select('1', function() {
        client.get('max-index', function(err, data) {
            if ( err || data == null ) {
                callback(0);
            } else {
                callback(Number(data.toString()));
            }
        });
    });
}

router.get('/', function(req, res, next){
    getDocumentIDs(function(result) {
        console.log('got', result);
        res.render('home', {maxIndex: result});
    }); 
});

router.get('/:id', function(req, res, next){
    client.select('1', function(){
        var getKey;
        if (isNaN(req.params.id)) {
            getKey = 'post-key:'
        } else {
            getKey = 'post-id:'
        }
        client.get(getKey + req.params.id, function(err, data) {
            if (err || data == null) {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write("404 Not Found\n");
                res.end();
            } else {
                res.render('detail', {id: req.params.id, content: data.toString()});
            }
        });
    });
});


router.post('/:id?', function(req, res, next){
    client.select('1', function(){
        if ( req.params.id == undefined && req.body.slug != '') {
            client.get('post-key:' + req.body.slug, function(err, data) {
                if ( err || data == null ) {
                    client.set('post-key:' + req.body.slug, req.body.content);
                    res.redirect('/' + req.params.id); 
                    return;
                } 
            });
        } else if (isNaN(req.params.id) && req.body.slug == '') {
            client.get('post-key:' + req.params.id, function(err, data) {
                client.set('post-key:' + req.params.id, req.body.content);
                res.redirect('/' + req.params.id);
                return;
            }); 
        } else {
            if (req.params.id != null && req.params.id != undefined) {
                client.set('post-id:' + req.params.id, req.body.content);
                res.redirect('/' + req.params.id);
            } else {
                client.get('max-index', function(err, data) {
                    var maxindex;
                    if (err || data == null) {
                        console.log('no max-index found, returning 0');
                        maxindex = 0;
                    } else {
                        console.log('max-index found =', data);
                        maxindex = Number(data.toString());
                    }
                    var newindex = maxindex + 1;
                    console.log('max-index is now', newindex);
                    console.log('set post-id:' + String(newindex));
                    client.set('max-index', newindex);
                    client.set('post-id:' + String(newindex), req.body.content);
                    res.redirect('/');
                });
            }
        }
    });
});

module.exports = router;
