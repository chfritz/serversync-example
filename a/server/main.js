import { Meteor } from 'meteor/meteor';

// MASTER

Meteor.startup(() => {
  // code to run on server at startup
  console.log(Items.find().count());
  Meteor.publish("items", function(id) {
    console.log("publish", id, Items.find().count());
    // if a date is given it is interpreted as a "minimum" date, only
    // newer items shown
    // if (date) {
    //   return Items.find({date1: {$gt: date}});
    // } else {
      return Items.find();
    // }
  });
});

