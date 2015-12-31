"use strict";
var request = require('request');
var constant = require('./constant')


exports.ticker = function(callback){
    request.get({url: constant.OPT_API_URL + '/ticker'}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            console.log('error: '+ response.statusCode + ' at /ticker');
            callback(error||response.body, null);
        }
    });
}

exports.trades = function(offset, callback){
    request.get({url: constant.OPT_API_URL + '/trades?offset=' + offset}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            console.log('error: '+ response.statusCode + ' at /trades');
            callback(error||response.body, null);
        }
    });
}

exports.depth = function(callback){
    request.get({url: constant.OPT_API_URL + '/order_books'}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            console.log('error: '+ response.statusCode + ' at /order_books');
            callback(error||response.body, null);
        }
    });
}
