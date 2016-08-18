var SkillModel = require('../models/SkillModel');
var SkillCollection = require('../collections/SkillCollection');
var SkillListView = require('../views/skill/SkillListView');
var SkillSingleView = require('../views/skill/SkillSingleView');

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'skills(/)': 'list',
    'skills/:id(/)': 'show',
  },
  controller: {
    list: function() {
      console.log('SkillsController::list');

      $pjs.show(new SkillListView, { collection: new SkillCollection });
    },

    show: function(id) {
      console.log('SkillsController::show');

      $pjs.show(new SkillSingleView, { model: new SkillModel({ id: id }) });
    }
  }
});
