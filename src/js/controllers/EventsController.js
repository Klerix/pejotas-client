var EventModel = require('../models/EventModel');
var EventCollection = require('../collections/EventCollection');
var EventListView = require('../views/event/EventListView');
var EventSingleView = require('../views/event/EventSingleView');
var EventRadio = require('../radios/EventRadio');

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    '': "list",
    'events(/)': "list",
    'events/:id(/)': "show",
  },

  initialize: function() {
    this.radio = new EventRadio;
  },

  controller: {
    list: function() {
      console.log('EventsController::list');

      $pjs.show(new EventListView(), { collection: new EventCollection() });
    },
    show: function(id) {
      console.log('EventsController::show');

      $pjs.show(new EventSingleView(), { model: new EventModel({ id: id }) });
    }
  },

});
