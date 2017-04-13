var Marionette = require('backbone.marionette')

var SkillCollectionView = require('./SkillCollectionView')

module.exports = Marionette.View.extend({
  template: require('./list.hbs'),

  regions: {
    region: {
      el: '.skills__region',
      replaceElement: true
    }
  },

  onRender: function () {
    var view = new SkillCollectionView({ collection: this.collection })
    this.showChildView('region', view)
  }
})
