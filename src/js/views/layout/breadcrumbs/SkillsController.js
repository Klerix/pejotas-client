var BaseController = require('./BaseController')
var SkillsCollection = require('../collections/SkillsCollection')
var SkillSingleView = require('../views/modules/skill/single/SkillSingleView')
var ClassesCollection = require('../collections/ClassesCollection')

module.exports = BaseController.extend({
  CollectionClass: SkillsCollection,
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
