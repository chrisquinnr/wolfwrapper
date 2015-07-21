var Future = Npm.require('fibers/future');

Meteor.methods({
    'callWolframAPI': function(){
        var promise = new Future();
        Meteor.call('wolframAPI', function(err, resp){
            if(resp){
                Queries.insert({content: resp.content});
                promise.return(resp.content);
            }
        });
        return promise.wait();
    },
    'wolframAPI': function(){
        //check(params, Object);
        var endpoint = "http://api.wolframalpha.com/v2/query?input=pi&appid=6TKGHR-L4T3W4R5RY";
        //console.log(endpoint);
        var promise = new Future();
        HTTP.call("POST", endpoint, function(err, resp){
            //console.log(resp.content);
            promise.return(resp);
        });

        return promise.wait();
    }
});