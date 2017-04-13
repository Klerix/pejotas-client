var Radio = require('backbone.radio')
var $ = require('jquery')

var BaseController = require('./BaseController')
var SkillsCollection = require('../collections/SkillsCollection')
var SkillSingleView = require('../views/modules/skill/single/SkillSingleView')
var SkillCollectionView = require('../views/modules/skill/list/SkillCollectionView')
var ClassesCollection = require('../collections/ClassesCollection')

module.exports = BaseController.extend({
  channelName: 'skills',
  CollectionClass: SkillsCollection,
  SingleViewClass: SkillSingleView,
  ListViewClass: SkillCollectionView,
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
        }])
      })
    BaseController.prototype.single.call(this, {
      id: id,
      classId: cid,
      eventId: eid
    })
  },

  list: function () {
    BaseController.prototype.list.call(this, function () {
      Radio.channel('breadcrumbs').trigger('set:last', 'Lista de habilidades')
    })
  }
})
