"use strict";

const request = require('request');

request({url: 'http://swapi.co/api/people/1'}, (err, response, body) => {
    
    if(err || response.statusCode >= 400){
        return console.log('Error', err, response.statusCode);
    }
    console.log(body);
});