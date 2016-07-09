import { Meteor } from 'meteor/meteor';
import ServerSyncClient from 'meteor/chfritz:serversync';

// *with* serversync package

a = null;

Meteor.startup(() => {
  // code to run on server at startup

  a = new ServerSyncClient("http://localhost:3000");
  // a = new ServerSyncClient("http://localhost:3000", "online-write");
  // a = new ServerSyncClient("http://localhost:3000", "write");

  a.sync('items', {
    mode: "read",
    collection: Items,
    onReady: function() {
      var coll = a.getCollection('items');
      console.log("ready", coll.find().count());
    }
  });

});



