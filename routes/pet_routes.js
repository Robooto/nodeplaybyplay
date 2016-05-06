'use strict';

const r = require('request').defaults({
    json: true
});

const async = require('async');
const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

module.exports = function(app) {
    app.get('/catname/:id', function(req, res) {
        
        client.get(req.params.id, function(error, cat) {
            if (error) {throw error;}
            if (cat) {
                res.json(JSON.parse(cat));
            } else {
                r({uri: 'http://localhost:3000/cat'}, function(error, response, body) {
                    if (error) {throw error; }
                    if (!error && response.statusCode === 200) {
                        res.json(body);
                        client.set(req.params.id, JSON.stringify(body), function(error) {
                            if (error) {throw error;}
                        });
                    } else {
                        res.send(response.statusCode);
                    }
                }); 
            }
        });
        
    });
    
    app.get('/pets', function(req, res) {
        
        async.parallel({
            cat: function (callback) {
                r({uri: 'http://localhost:3000/cat'}, function(error, response, body) {
                    if(!error && response.statusCode === 200) {
                        callback(null, body.data);
                    } else {
                        callback(response.statusCode);
                    }
                });                
            },
            dog: function (callback) {
                r({uri: 'http://localhost:3001/dog'}, function(error, response, body) {
                    if(!error && response.statusCode === 200) {
                        callback(null, body.data);
                    } else {
                        callback(response.statusCode);
                    }
                });                
            }
        },
        function(error, results){
            res.json({
                error: error,
                results: results
            });
        });
    });
};
