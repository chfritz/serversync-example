import { Meteor } from 'meteor/meteor';

// MASTER

Meteor.startup(() => {
  // code to run on server at startup
  console.log(Items.find().count());
  Meteor.publish("items", function() {
    console.log("publish", Items.find().count());   
    return Items.find();
  });
});

