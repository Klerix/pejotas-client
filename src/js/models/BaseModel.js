var Backbone = require('backbone')
var $ = Backbone.$
var Radio = Backbone.Radio

var BaseModel = Backbone.Model.extend({
  endpoint: '',

  initialize: function () {
    this.baseUrl = Radio.channel('app').request('get:apiUrl')
    this.relations = {}
    this.params = {}
  },

  urlRoot: function () {
    return this.baseUrl + this.endpoint + $.param(this.params)
  }
})

module.exports = BaseModel
