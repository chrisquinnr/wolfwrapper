var Future = Npm.require('fibers/future');

Meteor.methods({
  'callWolframAPI': function (input) {
    console.log('We made it onto the server, with input: ' + input);
    if(!input) return false;
    input = input.toLowerCase();
    console.log('invoking wrapper... (1)');
    Meteor.call('wolframAPIWrapper', input, function ( err, resp ) {
      if (err) {
        console.log('Error in Wolfram API processing, response not captured');
      } else {
        if (resp) {
          console.log('......complete (1)');
          var result = Meteor.call('parseResponse', resp);

          // check meta
          var meta = _.first(_.values(_.pick(result.queryresult, '$')));
          if(meta.success !== 'true'){
            console.log(meta);
            return false;
          } else {
            console.log('meta says this is good')
          }

          //loop pods
          var pods = result.queryresult.pod;
          console.log(pods);
          _.each(pods, function(elem){
            var podelem = _.first(_.values(_.pick(elem, '$')));
            if(podelem.title === 'Organism weight'){
              var subpod = _.pick(elem, 'subpod');
              console.log(_.pick(subpod.subpod[0], '$'));
              console.log(_.pick(subpod.subpod[0], 'img'));
              console.log(_.pick(subpod.subpod[0], 'plaintext'));
              var state = _.pick(elem, 'states');
              console.log(state);
            }
          });

          return true;
          //Queries.insert({related: meta.related, timing: meta.timing, pods: pods});
        }
      }
    });

  },
  'wolframAPIWrapper': function (input) {
    console.log('passing on request... (2)');
    var promise = new Future();
    Meteor.call('wolframAPI', input, function ( err, resp ) {
      if (resp) {
        console.log('......complete (2)');
        promise.return(resp);
      }
    });
    return promise.wait();
  },
  'wolframAPI': function (input) {
    //check(params, Object);
    var endpoint = "http://api.wolframalpha.com/v2/query?input="+input+"&appid=6TKGHR-L4T3W4R5RY";
    console.log('sending POST request');
    return HTTP.call("POST", endpoint);
  }
});
