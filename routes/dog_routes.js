'use strict';

const Dog = require('../models/dog_model.js');
const _ = require('lodash');

module.exports = function(app) {
   
    /* Create */
    app.post('/dog', function(req, res) {
        var newCat = new Dog(req.body);
        newCat.save(function(err) {
            if(err) {
                res.json({ info: 'error during dog create', error: err});
            }
            res.json({info: 'cat created successfully'});
        });
    });
    
    /* Read */
    app.get('/dog', function (req, res) {
        Dog.find(function(err, dogs) {
            if(err) {
                res.json({ info: 'error during dog create', error: err});
            }
            res.json({info: 'dogs found successfully', data: dogs});            
        });
    });
    
    app.get('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function(err, dog) {
            if(err) {
                res.json({ info: 'error during dog create', error: err});
            }
            if (dog) {
                res.json({ info: 'dog found successfully', data: dog});
            }
            res.json({info: 'dog not found'});            
        });
    });
    
    /* Update */
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function(err, dog) {
            if(err) {
                res.json({ info: 'error during dog create', error: err});
            }
            if (dog) {
                _.merge(dog, req.body);
                dog.save(function(err){
                    if (err){
                        res.json({info: 'error during dog update', error: err});
                    }
                    res.json({info: 'dog updated successfully'});
                });
            } else {
               res.json({info: 'dog not found'});  
            }                      
        });
    });
    
    /* Delete */
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function(err) {
            if(err) {
                res.json({ info: 'error during dog create', error: err});
            }
            res.json({info: 'dog removed successfully'});            
        });
    });

};