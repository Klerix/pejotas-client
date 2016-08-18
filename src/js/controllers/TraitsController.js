var TraitModel = require('../models/TraitModel');
var TraitCollection = require('../collections/TraitCollection');
var SkillListView = require('../views/skill/SkillListView');
var SkillSingleView = require('../views/skill/SkillSingleView');

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'traits(/)': 'list',
    'traits/:id(/)': 'show',
  },
  controller: {
    list: function() {
      console.log('SkillsController::list');

      $pjs.show(new SkillListView, { collection: new TraitCollection });
    },

    show: function(id) {
      console.log('SkillsController::show');

      $pjs.show(new SkillSingleView, { model: new TraitModel({ id: id }) });
    }
  }
});
