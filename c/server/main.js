import { Meteor } from 'meteor/meteor';
import ServerSyncClient from 'meteor/chfritz:serversync';

// SLAVE
// *with* serversync package

a = null;

Meteor.startup(() => {
  // code to run on server at startup

  a = new ServerSyncClient("http://localhost:3000");
  // a = new ServerSyncClient("http://localhost:3000", "online-write");
  // a = new ServerSyncClient("http://localhost:3000", "write");

  console.log("sync");
  a.sync('items', {
    // mode: "read",
    mode: "online-write",
    // collection: Items,
    onReady: function() {
      var coll = a.getCollection('items');
      console.log("ready", coll.find().count());
    }
  });

});


Meteor.methods({
  'disconnect': function() {
    console.log("try to disconnect");
    a._connection.disconnect();
  },
  'reconnect': function() {
    console.log("try to reconnect");
    a._connection.reconnect();
  }
});

