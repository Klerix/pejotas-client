var Marionette = require('backbone.marionette')
var Backbone = require('backbone')
var _ = require('lodash')
var $ = Backbone.$

var RootView = require('./views/layout/root/RootView')
var createRouters = require('./routers')
var WordsCollection = require('./collections/WordsCollection')

// Create App
var Pejotas = Marionette.Application.extend({
  region: {
    el: '#app',
    replaceElement: true
  },

  channelName: 'app',

  radioEvents: {
    'navigate': 'navigate'
  },

  radioRequests: {
    'get:apiUrl': 'getApiUrl',
    'get:version': 'getVersion',
    'get:words': 'getWords'
  },

  onBeforeStart: function () {
    this.routers = createRouters()
    this.wordsCollection = new WordsCollection()
  },

  onStart: function (options) {
    $.when(
      this.wordsCollection.fetch()
    ).then(function () {
      this.rootView = new RootView()
      this.showView(this.rootView)

      Backbone.history.start({
        root: '/',
        pushState: true
      })
    }.bind(this))
  },

  getVersion: function () {
    return VERSION
  },

  getApiUrl: function () {
    return 'http://pejotas.klerix.com/api/klerix/'
  },

  getWords: function () {
    return this.wordsCollection
  },

  navigate: function (url, options) {
    console.log('nav to ' + url)
    options = _.defaults(options || {}, {
      trigger: true
    })

    Backbone.history.navigate(url, options)
    if (options.trigger) window.scrollTo(0, 0)
  }
})

module.exports = Pejotas
