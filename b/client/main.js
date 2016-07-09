import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { Items } from '../collections.js';

import './main.html';

window.Items = Items;

Template.hello.onCreated(function helloOnCreated() {
});

Template.hello.helpers({
  items() {
    return Items.find();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
