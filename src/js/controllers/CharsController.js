var CharSingleView = require('../views/char/CharSingleView');
var EventModel = require('../models/EventModel');
var ClassCollection = require('../collections/ClassCollection');

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'chars/(:event)(/)(:class)(/)(:archetype)(/)(:skills)(/)(:name)(/)': 'compose',
    //'chars/load(/)': 'load',
  },

  controller: {

    compose: function(event, cl, archetype, skills, name) {
      console.log("CharsController::compose")
      var object = {
        event: event || 0,
        class: cl || 0,
        archetype: archetype || 0,
        skills: skills || 0,
        name: name || ''
      };

      var char = $pjs.radio.request("char:decode", object);

      char.eventModel = new EventModel({ id: char.event || 1 });
      char.classCol = new ClassCollection();
      //char.archetypeCol = new ArchetypeCollection();

      $.when(
        char.eventModel.fetch(),
        char.classCol.fetch()
        //char.archetypeCol.fetch()
      ).then(function() {
        var view = new CharSingleView({ char: char });
        $pjs.show(view);
      })
    },

    load: function() {
      console.log("CharsController::load")
    }

  }
});
