/*
 * @fileOverview ./campaign/index.js
 */

var Curl = require('node-libcurl').Curl;
var fs = require('fs');
var _HTTPHEADER = JSON.parse(fs.readFileSync('./HTTPHEADER', 'utf-8'));

var testRecipientsList = [{ "address": "nerdfiles@gmail.com" }];
var loadedRecipientsList = fs.readFileSync('./grouped.deduped.txt', 'utf-8');
// console.log(loadedRecipientsList);
var htmlEmail, textEmail, textSubject;

textEmail = fs.readFileSync('./distText/basic.txt');
textSubject = fs.readFileSync('./subjectText/basic.txt');
htmlEmail = fs.readFileSync('./dist/basic.txt');

var initData = function () {
  var data = {
    "content": {
      "from"    : "sandbox@sparkpostbox.com",
      "subject" : textSubject,
      "text"    : textEmail,
      "html"    : htmlEmail
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

curl.perform();

curl.on('end', function (statusCode, body) {
  console.log(body);
  this.close();
});

curl.on('error', curl.close.bind(curl));

