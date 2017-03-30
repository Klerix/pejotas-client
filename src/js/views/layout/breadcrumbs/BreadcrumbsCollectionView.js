var Marionette = require('backbone.marionette')

module.exports = Marionette.CollectionView.extend({
  className: 'container breadcrumb',
  tagName: 'ol',

  childView: require('./BreadcrumbsItemView')
})
