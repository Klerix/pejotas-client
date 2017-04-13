var Marionette = require('backbone.marionette')

module.exports = Marionette.CollectionView.extend({
  className: 'row',
  childView: require('./EventItemView'),
  emptyView: require('../../common/empty/EmptyView'),
  emptyViewOptions: {
    item: 'eventos'
  }
})
