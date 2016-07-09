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
    Items.insert({});
  }
});

Template.list.helpers({
  items() {
    return Items.find();
  },
});
