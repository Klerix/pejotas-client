var EventModel = require('../models/EventModel');
var EventCollection = require('../collections/EventCollection');
var EventListView = require('../views/event/EventListView');
var EventSingleView = require('../views/event/EventSingleView');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        '': "list",
        'events(/)': "list",
        'events/:id(/)': "show",
    },

    controller: {
        list: function() {
            console.log('EventsController::list');

            var col = new EventCollection();
            $.when(col.fetch()).then(function() {
                var view = new EventListView({ collection: col });
                $pjs.show(view);
            });

        },
        show: function(id) {
            console.log('EventsController::show');

            var model = new EventModel({ id: id });
            $.when(model.fetch()).then(function() {
                var view = new EventSingleView({ model: model });
                $pjs.show(view);
            });
        }
    }


});
