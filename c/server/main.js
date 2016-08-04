import { Meteor } from 'meteor/meteor';
import ServerSyncClient from 'meteor/chfritz:serversync';

// SLAVE
// *with* serversync package

a = null;

Meteor.startup(() => {
  // code to run on server at startup

  Meteor.publish('myitems', function() {
    return Items.find();
  });

  Status.remove({});
  Status.insert({
    _id: "connection",
    connected: false
  });
  Meteor.publish('status', function() {
    return Status.find();
  });

  a = new ServerSyncClient("http://localhost:3000");

  Status.update("connection", {
    connected: true
  });

  console.log("sync");
  a.sync('items', {
    // mode: "read",
    mode: "write",
    collection: Items,
    onReady: function() {
      var coll = a.getCollection('items');
      console.log("ready", coll.find().count());
    },
    beforeSyncUp: function(type, doc) { 
      console.log("beforeSyncUp", type, doc);
    },
    beforeSyncDown: function(type, doc) { 
      console.log("beforeSyncDown", type, doc);
    },
    afterSyncUp: function(type, doc) { 
      console.log("afterSyncUp", type, doc);
    },
    afterSyncDown: function(type, doc) { 
      console.log("afterSyncDown", type, doc);
    }
    // args: [Date.now()] // testing selective publications: only get
    // items newer than our start time
  });

});


Meteor.methods({
  'disconnect': function() {
    console.log("try to disconnect");
    a._connection.disconnect();
    Status.update("connection", {
      connected: false
    });
  },
  'reconnect': function() {
    console.log("try to reconnect");
    a._connection.reconnect();
    Status.update("connection", {
      connected: true
    });
  }
});

