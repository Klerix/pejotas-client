var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')
var Backbone = require('backbone')
var $ = require('jquery')

var NoApiView = require('../views/layout/noApi/NoApiView')

var BaseController = Marionette.Object.extend({
  channelName: 'controller',

  radioRequests: {
    'get:model': 'getModel',
    'get:collection': 'getCollection',
    'get:relation': 'getRelation'
  },

  CollectionClass: Backbone.Collection,
  ListViewClass: Marionette.View,
  SingleViewClass: Marionette.View,
  relations: [],

  initialize: function () {
    this.models = {}
  },

  getModel: function (id) {
    if (id) {
      if (!this.models[id]) {
        var Model = this.CollectionClass.prototype.model
        this.models[id] = new Model({ id: id })
      }
      return this.models[id]
    } else {
      return null
    }
  },

  getCollection: function () {
    if (!this.collection) {
      this.collection = new this.CollectionClass()
    }
    return this.collection
  },

  getRelation: function (id, Collection) {
    if (id) {
      var name = Collection.prototype.endpoint
      var model = this.getModel(id)
      if (!model.relations[name]) {
        var NewCol = Collection.extend({
          endpoint: model.endpoint + '/' + id + '/' + name
        })
        model.relations[name] = new NewCol()
      }

      return model.relations[name]
    } else {
      return null
    }
  },

  list: function (cb) {
    if (!this.collection) {
      this.getCollection()
      $.when(
        this.collection.fetch()
      ).then(
        this._renderList.bind(this, cb),
        this._renderError.bind(this)
        )
    } else {
      this._renderList()
      if (cb) cb()
    }
  },

  _renderList: function (cb) {
    var view = new this.ListViewClass({ collection: this.collection })
    Radio.channel('app').trigger('render:view', view)
    Radio.channel('breadcrumbs').trigger('set:last', '')
    if (cb) cb()
  },

  single: function (data, cb) {
    if (typeof data !== 'object') data = { id: data }

    var fetchables = []
    fetchables.push(this.getModel(data.id).fetch())
    this.relations.forEach(function (rel) {
      fetchables.push(this.getRelation(data.id, rel).fetch())
    }.bind(this))

    $.when
      .apply(this, fetchables)
      .then(this._renderSingle.bind(this, data, cb), this._renderError.bind(this))
  },

  _renderSingle: function (data, cb) {
    data.model = this.getModel(data.id)
    var view = new this.SingleViewClass(data)
    Radio.channel('app').trigger('render:view', view)
    Radio.channel('breadcrumbs').trigger('set:last', data.model.get('name'))
    if (cb) cb()
  },

  _renderError: function () {
    var view = new NoApiView()
    Radio.channel('app').trigger('render:view', view)
    Radio.channel('breadcrumbs').trigger('set:last', 'Error')
  }
})

module.exports = BaseController
