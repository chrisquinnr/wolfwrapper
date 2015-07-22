var Future = Npm.require('fibers/future');

Meteor.methods({
    'callWolframAPI': function(){
        console.log('invoking wrapper... (1)');
        Meteor.call('wolframAPIWrapper', function(err, resp){
            if(err){
                console.log('Error in Wolfram API processing, response not captured');
            } else {
                if(resp){
                    console.log('......complete (1)');
                    var result = Meteor.call('parseResponse', resp);
                    return Queries.insert({content: result});
                }
            }
        });

    },
    'wolframAPIWrapper': function(){
        console.log('passing on request... (2)');
        var promise = new Future();
        Meteor.call('wolframAPI', function(err, resp){
            if(resp){
                console.log('......complete (2)');
                promise.return(resp);
            }
        });
        return promise.wait();
    },
    'wolframAPI': function(){
        //check(params, Object);
        var endpoint = "http://api.wolframalpha.com/v2/query?input=pi&appid=6TKGHR-L4T3W4R5RY";
        console.log('sending POST request');
        return HTTP.call("POST", endpoint);
    }
});