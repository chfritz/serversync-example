import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  console.log(Items);
  Meteor.publish("items", function() {
    return Items.find();
  });
});

