Template.wolfram.events({
    'click #apitest': function (e){
        Meteor.call('callWolframAPI', function(err, resp){
            if(err){
                console.log(err);
            } else {
                if (resp) {
                    //console.log(resp);
                    Bert.alert('success', 'Wolfram API success', 'growl-top-right');
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