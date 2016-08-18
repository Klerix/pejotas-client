var package = require('../../package.json');
require('./helpers');

// Controllers (routers integrated)
var EventsController = require('./controllers/EventsController');
var SkillsController = require('./controllers/SkillsController');
var TraitsController = require('./controllers/TraitsController');
var CharsController = require('./controllers/CharsController');
var ClassesController = require('./controllers/ClassesController');
var ArchetypesController = require('./controllers/ArchetypesController')

// Layout View
var LayoutView = require('./views/layout/LayoutView');

// Create App
var Pejotas = Marionette.Application.extend({
  VERSION: package.version,
  server: 'http://pejotas.klerix.com:8080/',
  cache: { cache: true },

  onBeforeStart: function() {
    console.log("onBeforeStart")

    this.radio = Backbone.Radio.channel('services');

    this.controllers = {
      events: new EventsController(),
      skills: new SkillsController(),
      traits: new TraitsController(),
      chars: new CharsController(),
      classes: new ClassesController(),
      archetypes: new ArchetypesController(),
    };
  },

  onStart: function(options) {
    console.log("onStart")

    this.rootView = new LayoutView();
    this.body = this.rootView.getRegion("body");
    this.showView(this.rootView);

    Backbone.history.start();
  },

  show: function(region, view, fetchables) {
    if (!(region instanceof Marionette.Region)) { // If not region, shift attributes to right
      fetchables = view;
      view = region;
      region = this.body;
    }

    if (fetchables) {
      view.data = fetchables;
      var arr = _.map(fetchables, function(v) {
        return v.fetch($pjs.cache);
      });

      if (fetchables.collection) view.collection = fetchables.collection;
      if (fetchables.model) view.model = fetchables.model;

      var promise = $.when.apply($, arr);
      promise.then(function() {
        region.show(view);
      }.bind(this));
    } else {
      region.show(view);
    }
  },

  navigate: function(url, options) {

    options = _.defaults(options || {}, {
      trigger: true
    });

    Backbone.history.navigate(url, options)
  },
});

module.exports = Pejotas;
