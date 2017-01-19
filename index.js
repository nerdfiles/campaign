/*
 * @fileOverview ./campaign/index.js
 */

var Curl = require('node-libcurl').Curl;
var querystring = require( 'querystring' );
var fs = require('fs');
var _HTTPHEADER = JSON.parse(fs.readFileSync('./HTTPHEADER', 'utf-8'));

var testRecipientsList = [{ "address": "nerdfiles@gmail.com" }];
var loadedRecipientsList = fs.readFileSync('./grouped.deduped.txt', 'utf-8');
// console.log(loadedRecipientsList);

var initData = function () {
  var data = {
    "content": {
      "from"    : "sandbox@sparkpostbox.com",
      "subject" : "Test Subject Line",
      "text"    : "Test Body"
    },
    "recipients": testRecipientsList
  };
  return data;
};


var curl = new Curl();
var url  = 'https://api.sparkpost.com/api/v1/transmissions';
var data = initData();

data = JSON.stringify(data);

curl.setOpt(Curl.option.URL, url);
curl.setOpt(Curl.option.POSTFIELDS, data);
curl.setOpt(Curl.option.HTTPHEADER, _HTTPHEADER.HTTPHEADER);
curl.setOpt(Curl.option.VERBOSE, true);

console.log(querystring.stringify(data));

curl.perform();

curl.on('end', function (statusCode, body) {
  console.log(body);
  this.close();
});

curl.on('error', curl.close.bind(curl));

