import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { Items } from '../collections.js';

import './main.html';

window.Items = Items;

Template.list.onCreated(function() {
  Meteor.subscribe('items');
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
});

Template.list.helpers({
  items() {
    return Items.find();
  },
});
