var Backbone = require('backbone')
var $ = Backbone.$
var Radio = Backbone.Radio

var BaseCollection = Backbone.Collection.extend({
  endpoint: '',

  params: {},

  initialize: function () {
    this.baseUrl = Radio.channel('app').request('get:apiUrl')
  },

  url: function () {
    return this.baseUrl + this.endpoint + $.param(this.params)
  }
})

module.exports = BaseCollection
