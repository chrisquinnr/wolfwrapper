Template.wolfram.events({
    'click #apitest': function (e){
        Meteor.call('callWolframAPI', function(err, resp){
            if(err){
                console.log(err);
            } else {
                if (resp) {
                    //console.log(resp);
                    var message = 'Wolfram API success, import ' + resp + ' complete';
                    Bert.alert('success', message, 'growl-top-right');
                }
            }
        });
    }
})

Template.wolfram.helpers({
    getWolframOutput: function (){
        //console.log('getting saved response');
        var data = Queries.find({});
        return data;
    }
})