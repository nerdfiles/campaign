/* @fileOverview ./src/mailer.js
 * @description
 * Mailer that redundant (and untested) Curl-based code for interacting with
 * SparkPost's REST API.
 * @TODO
 * 1. Idea: Proof-of-Existence on output and ID published to Bitcoin blockchain. Perform momentum level differential check to automate re-sending templates based on Bitcoin price given tracking feedback analytics. If the price drops below a certain threshold, re-send templated e-mails of certain categories, etc.
 */

import C      from 'node-libcurl';
import fs     from 'fs';
import colors from 'colors';

var Curl = C.Curl;

module.exports = function (testMode) {
  let recipientList, htmlEmail, textEmail, textSubject, from;

  const _HTTPHEADER = JSON.parse(fs.readFileSync('./HTTPHEADER', 'utf-8'));
  const testRecipientsList = fs.readFileSync('./TEST_RECIPIENT', 'utf-8');
  const _testRecipientsList = testRecipientsList.trim();
  const __testRecipient = [{ "address": _testRecipientsList }];
  const loadedRecipientsList = fs.readFileSync('./grouped.deduped.txt', 'utf-8');
  const _recipientList = loadedRecipientsList.split('\n');

  if (testMode) {
    console.log('Loading test e-mail recipient!');
    recipientList = __testRecipient;
  } else {
    console.log('Loading production e-mails list!');
    for(let i = 0; i < _recipientList.length; ++i) {
      recipientList.push({
        "address": _recipientList[i]
      });
    }
  }

  textEmail = fs.readFileSync('./distText/basic.txt', 'utf-8');
  textSubject = fs.readFileSync('./subjectText/basic.txt', 'utf-8');
  htmlEmail = fs.readFileSync('./dist/basic.html', 'utf-8');
  from = fs.readFileSync('./FROM', 'utf-8');

  const initData = function () {
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


  const curl = new Curl();
  const url  = 'https://api.sparkpost.com/api/v1/transmissions';
  let data = initData();

  data = JSON.stringify(data);

  curl.setOpt(Curl.option.URL, url);
  curl.setOpt(Curl.option.POSTFIELDS, data);
  curl.setOpt(Curl.option.HTTPHEADER, _HTTPHEADER.HTTPHEADER);
  curl.setOpt(Curl.option.VERBOSE, false);

  curl.perform();

  curl.on('end', function (statusCode, body) {
    try {
      const _body = JSON.parse(body);
      console.log("ID: " + _body.results.id.toString().rainbow);
      console.log("Bounces: " + _body.results.total_rejected_recipients.toString().rainbow);
      console.log("Successes: " + _body.results.total_accepted_recipients.toString().rainbow);
    } catch (e) {
      console.log(e);
    }
    this.close();
  });

  curl.on('error', curl.close.bind(curl));

};
