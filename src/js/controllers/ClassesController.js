var BaseController = require('./BaseController')
var ClassesCollection = require('../collections/ClassesCollection')
var ClassSingleView = require('../views/modules/class/single/ClassSingleView')
var SkillsCollection = require('../collections/SkillsCollection')
var TraitsCollection = require('../collections/TraitsCollection')
var EventsCollection = require('../collections/EventsCollection')

var ClassesController = BaseController.extend({
  channelName: 'classes',
  CollectionClass: ClassesCollection,
  SingleViewClass: ClassSingleView,
  relations: [SkillsCollection, TraitsCollection, EventsCollection],

  single: function (eid, id) {
    BaseController.prototype.single.call(this, {
      id: id,
      eventId: eid
    })
  }
})

module.exports = ClassesController
