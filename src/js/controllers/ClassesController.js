var ClassModel = require('../models/ClassModel');
var ClassSingleView = require('../views/class/ClassSingleView');

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'classes/:id(/)': "show",
  },

  controller: {
    show: function(id) {
      console.log('ClassesController::show');

      $pjs.show(new ClassSingleView(), { model: new ClassModel({ id: id }) });
    }
  },

});
