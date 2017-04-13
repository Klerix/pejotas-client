var Backbone = require('backbone')
var Radio = require('backbone.radio')
var Marionette = require('backbone.marionette')

var BreadcrumbsCollectionView = require('../breadcrumbs/BreadcrumbsCollectionView')

var RootView = Marionette.View.extend({
  template: require('./root.hbs'),

  className: 'pjs',

  regions: {
    body: '.pjs__body',
    breadcrumbs: '.pjs__breadcrumbs'
  },

  ui: {
    brand: '.head__brand'
  },

  events: {
    'click @ui.brand': function () {
      Radio.channel('app').trigger('navigate', '/')
    }
  },

  templateContext: {
    version: function () {
      return Radio.channel('app').request('get:version')
    }
  },

  initialize: function (options) {
    Radio.channel('app').on('render:view', this.renderView.bind(this))
    Radio.channel('app').on('set:breadcrumbs', this.setBreadcrumbs.bind(this))
  },

  renderView: function (view) {
    this.showChildView('body', view)
  },

  setBreadcrumbs: function (breadcrumbs) {

  },

  onRender: function () {
    this.showChildView('breadcrumbs', new BreadcrumbsCollectionView())
  }

})

module.exports = RootView
