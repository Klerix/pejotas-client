var Marionette = require('backbone.marionette')
var Backbone = require('backbone')
var _ = require('lodash')
var $ = Backbone.$
var Radio = Backbone.Radio

var RootView = require('./views/layout/root/RootView')
var createRouters = require('./routers')
var ErrorRouter = require('./routers/ErrorRouter')
var WordsCollection = require('./collections/WordsCollection')

// Create App
var Pejotas = Marionette.Application.extend({
  region: {
    el: '#app',
    replaceElement: true
  },

  channelName: 'app',

  radioEvents: {
    'navigate': 'navigate',
    'link': 'link'
  },

  radioRequests: {
    'get:apiUrl': 'getApiUrl',
    'get:version': 'getVersion',
    'get:words': 'getWords'
  },

  onBeforeStart: function () {
    this.routers = createRouters()
    this.errorRouter = new ErrorRouter()
    this.wordsCollection = new WordsCollection()
  },

  onStart: function (options) {
    $.when(this.wordsCollection.fetch())
      .then(this._startNavigation.bind(this), this._renderError.bind(this))

    this.rootView = new RootView()
    this.showView(this.rootView)
  },

  _startNavigation: function () {
    var loadUrl = Backbone.History.prototype.loadUrl
    _.extend(Backbone.History.prototype, {
      /**
       * Override loadUrl & watch return value. Trigger event if no route was matched.
       * @return {Boolean} True if a route was matched
       */
      loadUrl: function () {
        var matched = loadUrl.apply(this, arguments)
        if (!matched) {
          this.trigger('routeNotFound', arguments)
        }
        return matched
      }
    })

    var success = Backbone.history.start({
      root: '/',
      pushState: true
    })

    if (!success) {
      Radio.channel('errors').trigger('show:404')
    }
  },

  _renderError: function () {
    Radio.channel('errors').trigger('show:503')
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

  link: function (url, e, options) {
    if (e.which < 2) {
      e.stopPropagation()
      this.navigate(url, options)
    } else if (e.which === 2 || e.which === 4) {
      e.stopPropagation()
      window.open(window.location.origin + url, '_blank')
    }
  },

  navigate: function (url, options) {
    console.log('nav to ' + url)
    Radio.channel('breadcrumbs').trigger('reset')
    options = _.defaults(options || {}, {
      trigger: true
    })

    Backbone.history.navigate(url, options)
    if (options.trigger) window.scrollTo(0, 0)
  }
})

module.exports = Pejotas
