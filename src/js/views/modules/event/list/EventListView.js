var Marionette = require('backbone.marionette')

var EventCollectionView = require('./EventCollectionView')

module.exports = Marionette.View.extend({
  template: require('./list.hbs'),

  regions: {
    region: {
      el: '.body__region',
      replaceElement: true
    }
  },

  onRender: function () {
    var view = new EventCollectionView({ collection: this.collection })
    this.showChildView('region', view)
  }
})
