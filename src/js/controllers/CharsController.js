var CharSingleView = require('../views/char/CharSingleView');
var EventCollection = require('../collections/EventCollection');
var CharRadio = require('../radios/CharRadio');

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'chars/(:event)(/)(:class)(/)(:archetype)(/)(:skills)(/)(:name)(/)': 'compose',
  },

  initialize: function() {
    this.radio = new CharRadio;
  },

  controller: {

    compose: function(eid, cid, aid, sids, name) {
      console.log("CharsController::compose")

      if (!eid) eid = 0;
      if (!cid) cid = 0;
      if (!aid) aid = 0;
      if (!sids) sids = "";
      if (!name) name = "";

      var char = $pjs.radio.request("chars:decode", {
        eventId: eid,
        classId: cid,
        archetypeId: aid,
        skillIds: sids,
        name: name || 'Nuevo Personaje'
      });

      var view = new CharSingleView();
      view.char = char;

      $pjs.show(view, {
        eventsCol: new EventCollection()
      });
    },

    load: function() {
      console.log("CharsController::load")
    },

  }
});
