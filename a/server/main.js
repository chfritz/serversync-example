import { Meteor } from 'meteor/meteor';

// MASTER

Meteor.startup(() => {
  // code to run on server at startup
  console.log(Items.find().count());
  Meteor.publish("items", function(date) {
    console.log("publish", date, Items.find({date1: {$gt: Date.now()}}).count());
    // if a date is given it is interpreted as a "minimum" date, only
    // newer items shown
    // if (date) {
    //   return Items.find({date1: {$gt: date}});
    // } else {
      return Items.find();
    // }
    // return Items.find({date1: {$gt: Date.now()}});
  });

  Meteor.publish("items2", function() {
    return Items2.find();
  });

  // Meteor.publish("_serversync", function() {
  //   return ServerSync.find();
  // });

});


Meteor.methods({
  '_serversync_md5': function() {
    // var wait = Meteor.wrapAsync(function(time, cb) {
    //   Meteor.setTimeout(cb, time);
    // });
    // wait(5000);
    // return true;
    return CryptoJS.MD5(JSON.stringify(Items.find().fetch())).toString();
  }
});
