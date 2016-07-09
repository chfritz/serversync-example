import { Meteor } from 'meteor/meteor';
// import { Items } from '../collections.js';

Meteor.startup(() => {
  // code to run on server at startup
  const a = DDP.connect("http://localhost:3000");
  var aItems = new Mongo.Collection('items', a);
  a.subscribe("items");
  aItems.find().observeChanges({
    added(id, fields) {
      var obj = fields;
      obj._id = id;
      obj._updated = Date.now();
      Items.upsert(id, obj);
      console.log("added");
    },
    changed(id, fields) {
      // The document identified by id has changed. fields contains
      // the changed fields with their new values. If a field was
      // removed from the document then it will be present in fields
      // with a value of undefined.
      var obj = fields;
      obj._updated = Date.now();
      Items.update(id, obj);
    },

    // movedBefore(id, before) {
    //   // The document identified by id changed its position in the
    //   // ordered result set, and now appears before the document
    //   // identified by before.

    // },

    removed(id) {
      // The document identified by id was removed from the result
      // set.
      Items.remove(id);
    }
  });
});

Meteor.publish("items");
