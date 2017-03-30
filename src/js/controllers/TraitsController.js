var BaseController = require('./BaseController')
var TraitsCollection = require('../collections/TraitsCollection')
var SkillSingleView = require('../views/modules/skill/single/SkillSingleView')
var ClassesCollection = require('../collections/ClassesCollection')

module.exports = BaseController.extend({
  channelName: 'traits',
  CollectionClass: TraitsCollection,
  SingleViewClass: SkillSingleView,
  relations: [ClassesCollection],

  single: function (eid, cid, id) {
    BaseController.prototype.single.call(this, {
      id: id,
      classId: cid,
      eventId: eid
    })
  }
})
