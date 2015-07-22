
var Future = Npm.require('fibers/future');
var xmlParser = Meteor.npmRequire('xml2js');
var parseString = xmlParser.parseString;

Meteor.methods({

  'parseResponse': function (raw) {
    check(raw, Object);
    var future = new Future();
    console.log('XML parsing initiated...');
    parseString(raw.content, function (err, result) {
      if (err) {
        console.log(err);
        future.return(err);
      } else {
        future.return(result);
      }
    });
    return future.wait();
  }
});