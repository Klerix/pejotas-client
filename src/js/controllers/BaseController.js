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
    if (!this.models[id]) {
      var Model = this.CollectionClass.prototype.model
      this.models[id] = new Model({ id: id })
    }
    return this.models[id]
  },

  getCollection: function (id) {
    if (!this.collection) {
      this.collection = new this.CollectionClass()
    }
    return this.collection
  },

  getRelation: function (id, Collection) {
    var name = Collection.prototype.endpoint
    var model = this.getModel(id)
    if (!model.relations[name]) {
      var NewCol = Collection.extend({
        endpoint: model.endpoint + '/' + id + '/' + name
      })
      model.relations[name] = new NewCol()
    }

    return model.relations[name]
  },

  list: function () {
    if (!this.collection) {
      this.getCollection()
      $.when(
        this.collection.fetch()
      ).then(
        this._renderList.bind(this),
        this._renderError.bind(this)
        )
    } else {
      this._renderList()
    }
  },

  _renderList: function () {
    var view = new this.ListViewClass({ collection: this.collection })
    Radio.channel('app').trigger('render:view', view)
  },

  single: function (data) {
    if (typeof data !== 'object') data = { id: data }

    var fetchables = []
    fetchables.push(this.getModel(data.id).fetch())
    this.relations.forEach(function (rel) {
      fetchables.push(this.getRelation(data.id, rel).fetch())
    }.bind(this))

    $.when
      .apply(this, fetchables)
      .then(this._renderSingle.bind(this, data), this._renderError.bind(this))
  },

  _renderSingle: function (data) {
    data.model = this.getModel(data.id)
    var view = new this.SingleViewClass(data)
    Radio.channel('app').trigger('render:view', view)
  },

  _renderError: function () {
    var view = new NoApiView()
    Radio.channel('app').trigger('render:view', view)
  }
})

module.exports = BaseController
