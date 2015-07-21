/*
 * Publications: Example
 * Data publications for the Example collection.
 */

Meteor.publish('Queries', function(){

    var data = Queries.find({});

    return data;
});
