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
            console.log('TraitsController::list');

            var col = new TraitCollection();
            $.when(col.fetch()).then(function() {
                var view = new SkillListView({ collection: col });
                $pjs.show(view);
            });
        },

        show: function(id) {
            console.log('TraitsController::show');

            var model = new TraitModel({ id: id });
            $.when(model.fetch()).then(function() {
                var view = new SkillSingleView({ model: model });
                $pjs.show(view);
            });
        }
    }
});
