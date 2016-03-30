Template.wolfram.events({
  'click .apitest': function ( e ) {

    var input = $('.inputtext').val();
    if(!input) {
      Bert.alert('Omg no input', 'danger', 'growl-top-right');
      return false;
    } else {
      console.log(input);
    }

    Meteor.call('callWolframAPI', input);
  }
});

Template.wolfram.helpers({
  getWolframOutput: function () {
    //console.log('getting saved response');
    var result = Queries.findOne({});
    if(result){
      return result.result;
    }
  }
});
