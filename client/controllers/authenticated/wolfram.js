Template.wolfram.events({
  'click .apitest': function ( e ) {

    var input = $('.inputtext').val();
    if(!input) {
      Bert.alert('Omg no input', 'danger', 'growl-top-right');
      return false;
    } else {
      console.log(input);
    }

    Meteor.call('callWolframAPI', input, function ( err, resp ) {
      if (err) {
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
  getWolframOutput: function () {
    //console.log('getting saved response');
    var data = Queries.find({});
    return data;
  }
})
