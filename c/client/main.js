import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Items = new Mongo.Collection('items');
window.Items = Items;

Template.list.onCreated(function() {
  Meteor.subscribe('myitems');
  Meteor.subscribe('myitems2');
  Meteor.subscribe('status');
});


Template.list.events({
  'click a.delete': function() {
    Items.remove(this._id);
  },
  'click a.add': function() {
    Items.insert({date1: Date.now(), date2: Date.now()});
  },
  'click a.date1': function() {
    Items.update(this._id, {$set: {date1: Date.now()}});
  },
  'click a.date2': function() {
    Items.update(this._id, {$set: {date2: Date.now()}});
  },

  'click a.delete2': function() {
    Items2.remove(this._id);
  },
  'click a.add2': function() {
    Items2.insert({});
  },
  'click a.addElement': function() {
    var obj = {};
    obj[Date.now()] = 1;
    Items2.update(this._id, {$set: obj});
  },
  'click a.field': function(e) {
    console.log(e.target.dataset.key);
    var obj = {};
    obj[e.target.dataset.key] = "";
    Items2.update(this._id, {$unset: obj});
  },

  'click a.disconnect': function() {
    Meteor.call('disconnect');
  },
  'click a.reconnect': function() {
    Meteor.call('reconnect');
  },
});

Template.list.helpers({
  items() {
    return Items.find();
  },

  items2() {
    return Items2.find();
  },
  mykeys() {    
    return (_.map(_.keys(this), function(key) {
      return "<a href='#' class='field' data-key='"+key+"'>"+key+"</a>";
    })).join(" ");
  },

  connected() {
    const status = Status.findOne("connection");
    return (status && status.connected);
  }
});
