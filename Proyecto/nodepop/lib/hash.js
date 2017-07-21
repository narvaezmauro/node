"use strict";
// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'sha256',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createHash(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.digest('hex');
  return crypted;
}
 

module.exports = {encrypt};