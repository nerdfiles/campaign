/*
 * @fileOverview ./campaign/index.js
 */

var Curl = require('node-libcurl').Curl;
var fs = require('fs');

module.exports = function (testMode) {
  var recipientList, htmlEmail, textEmail, textSubject, from;

  var _HTTPHEADER = JSON.parse(fs.readFileSync('./HTTPHEADER', 'utf-8'));
  var testRecipientsList = [{ "address": "nerdfiles@gmail.com" }];
  var loadedRecipientsList = fs.readFileSync('./grouped.deduped.txt', 'utf-8');
  var _recipientList = loadedRecipientsList.split('\n');

  if (testMode) {
    console.log('Loading test e-mails list!');
    recipientList = testRecipientsList;
  } else {
    console.log('Loading production e-mails list!');
    for(var i = 0; i < _recipientList.length; ++i) {
      recipientList.push({
        "address": _recipientList[i]
      });
    }
  }

  textEmail = fs.readFileSync('./distText/basic.txt', 'utf-8');
  textSubject = fs.readFileSync('./subjectText/basic.txt', 'utf-8');
  htmlEmail = fs.readFileSync('./dist/basic.html', 'utf-8');
  from = fs.readFileSync('./FROM', 'utf-8');

  var initData = function () {
    var data = {
      "content": {
        "from"    : from.trim(),
        "subject" : textSubject.trim(),
        "text"    : textEmail,
        "html"    : htmlEmail
      },
      "recipients": recipientList
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
  curl.setOpt(Curl.option.VERBOSE, false);

  curl.perform();

  curl.on('end', function (statusCode, body) {
    try {
    var _body = JSON.parse(body);
    console.log("ID: " + _body.results.id);
    console.log("Bounces: " + _body.results.total_rejected_recipients);
    console.log("Successes: " + _body.results.total_accepted_recipients);
    } catch (e) {
      console.log(e);
    }
    this.close();
  });

  curl.on('error', curl.close.bind(curl));

};
