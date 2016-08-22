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

  Meteor.publish('myitems2', function() {
    return Items2.find();
  });

  Status.remove({});
  Status.insert({
    _id: "connection",
    connected: false
  });
  Meteor.publish('status', function() {
    return Status.find();
  });

  a = new ServerSyncClient("http://localhost:3000", {
    onConnect: function() {
      console.log("connected to master");
    },
    onReconnect: function() {
      console.log("reconnected to master");
    },
    beforeSyncDirty: function(count) {
      console.log("beforeSyncDirty", count);
    },
    afterSyncDirty: function(count) {
      console.log("afterSyncDirty", count);
    }
  });

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
    beforeSyncUp: function(type, id, doc) { 
      console.log("beforeSyncUp", type, id, doc);
    },
    beforeSyncDown: function(type, id, doc) { 
      console.log("beforeSyncDown", type, id, doc);
    },
    afterSyncUp: function(type, id, doc) { 
      console.log("afterSyncUp", type, id, doc);
    },
    afterSyncDown: function(type, id, doc) { 
      console.log("afterSyncDown", type, id, doc);
    },
    
    // args: [Date.now()] // testing selective publications: only get
    // items newer than our start time
  });

  // a.sync('items2', {
  //   collection: Items2
  // });

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

