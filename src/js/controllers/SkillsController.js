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

            var col = new SkillCollection();
            $.when(col.fetch()).then(function() {
                var view = new SkillListView({ collection: col });
                $pjs.show(view);
            });
        },

        show: function(id) {
            console.log('SkillsController::show');

            var model = new SkillModel({ id: id });
            $.when(model.fetch()).then(function() {
                var view = new SkillSingleView({ model: model });
                $pjs.show(view);
            });
        }
    }
});
