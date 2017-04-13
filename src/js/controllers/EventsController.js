var BaseController = require('./BaseController')
var EventsCollection = require('../collections/EventsCollection')
var EventListView = require('../views/modules/event/list/EventListView')
var EventSingleView = require('../views/modules/event/single/EventSingleView')
var ClassesCollection = require('../collections/ClassesCollection')

var EventsController = BaseController.extend({
  channelName: 'events',
  CollectionClass: EventsCollection,
  ListViewClass: EventListView,
  SingleViewClass: EventSingleView,
  relations: [ClassesCollection]
})

module.exports = EventsController
