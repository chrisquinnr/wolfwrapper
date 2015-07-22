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
                    var meta = result.queryresult.$;
                    var pods = result.queryresult.pod;
                    console.log(pods[0].subpod.plaintext);
                    console.log(pods[0].subpod.img);
                    console.log(pods[1].subpod.plaintext);
                    //console.log(pods[2]);
                    //console.log(pods[3]);
                    //console.log(pods[4]);
                    //console.log(pods[5]);
                    //console.log(pods[6]);
                    //console.log(pods[7]);
                    //console.log(pods[8]);
                    //console.log(pods[9]);
                    return;
                    return Queries.insert({related: meta.related, timing: meta.timing, pods: pods});
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