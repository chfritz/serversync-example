import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Items = new Mongo.Collection('items');
window.Items = Items;

Template.list.onCreated(function() {
  Meteor.subscribe('items');
});


Template.list.events({
  'click a.delete': function() {
    Items.remove(this._id);
  },
  'click a.add': function() {
    Items.insert({date: Date.now()});
  },
  'click a.update': function() {
    Items.update(this._id, {date: Date.now()});
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
});
