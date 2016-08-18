var ArchetypeModel = require('../models/ArchetypeModel');
var ClassSingleView = require('../views/class/ClassSingleView');

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'archetypes/:id(/)': "show",
  },

  controller: {
    show: function(id) {
      console.log('ArchetypeesController::show');

      $pjs.show(new ClassSingleView(), { model: new ArchetypeModel({ id: id }) });
    }
  },

});
