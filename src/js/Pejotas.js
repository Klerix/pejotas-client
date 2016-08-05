var package = require('../../package.json');
require('./services');

$.ajaxSetup({ cache: false }); // remove in pro


// Controllers (routers integrated)
var EventsController = require('./controllers/EventsController'),
  SkillsController = require('./controllers/SkillsController'),
  TraitsController = require('./controllers/TraitsController'),
  CharsController = require('./controllers/CharsController');

// Layout View
var LayoutView = require('./views/layout/LayoutView');

// Create App
var Pejotas = Marionette.Application.extend({
  VERSION: package.version,

  onBeforeStart: function() {
    console.log("onBeforeStart")

    this.radio = Backbone.Radio.channel('services');

    this.controllers = {
      events: new EventsController(),
      skills: new SkillsController(),
      traits: new TraitsController(),
      chars: new CharsController()
    };
  },

  onStart: function(options) {
    console.log("onStart")

    this.rootView = new LayoutView();
    this.body = this.rootView.getRegion("body");
    this.showView(this.rootView);

    Backbone.history.start();
  },

  show: function(view) {
    this.body.show(view);
  },

  navigate: function(url, options) {

    options = _.defaults(options || {}, {
      trigger: true
    });

    Backbone.history.navigate(url, options)
  },
});

module.exports = Pejotas;
