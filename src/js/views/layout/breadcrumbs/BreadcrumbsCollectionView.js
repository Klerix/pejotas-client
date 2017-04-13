var _ = require('lodash')
var Backbone = require('backbone')
var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

module.exports = Marionette.CollectionView.extend({
  className: 'container breadcrumb',
  tagName: 'ol',
  childView: require('./BreadcrumbsItemView'),

  initialize: function (options) {
    Radio.channel('breadcrumbs').on('set', this.renderCrumbs.bind(this))
    Radio.channel('breadcrumbs').on('set:last', this.setLastCrumb.bind(this))
    Radio.channel('breadcrumbs').on('reset', this.reset.bind(this))
  },

  firstCrumb: {
    pre: '<i class="ra ra-trail" aria-hidden="true"></i>',
    label: 'Inicio',
    active: false,
    nav: '/'
  },

  crumbs: [],

  lastCrumb: null,

  setLastCrumb: function (label) {
    if (label) {
      this.lastCrumb = {
        active: true,
        label: label
      }
    } else {
      this.lastCrumb = null
    }

    this.renderCrumbs()
  },

  renderCrumbs: function (newCrumbs, last) {
    if (last) this.setLastCrumb(last)
    if (newCrumbs) this.crumbs = newCrumbs

    var crumbs = _.clone(this.crumbs)
    crumbs.unshift(this.firstCrumb)
    if (this.lastCrumb) { crumbs.push(this.lastCrumb) }

    if (this.collection) {
      this.collection.reset(crumbs)
    } else {
      this.collection = new Backbone.Collection(crumbs)
    }
    this.render()
  },

  reset: function () {
    this.crumbs = []
    this.lastCrumb = null
  }

})
