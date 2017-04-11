var $ = require('jquery')
var Radio = require('backbone.radio')

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
    var event = Radio.channel('events').request('get:model', eid)
    var clase = Radio.channel('classes').request('get:model', cid)
    $.when(
      event.fetch(),
      clase.fetch()
    )
      .then(function () {
        Radio.channel('breadcrumbs').trigger('set', [{
          label: event.get('name'),
          nav: '/events/' + event.get('id')
        }, {
          label: clase.get('name'),
          nav: '/events/' + event.get('id') + '/classes/' + clase.get('id')
        }
        ])
      })

    BaseController.prototype.single.call(this, {
      id: id,
      classId: cid,
      eventId: eid
    })
  }
})
