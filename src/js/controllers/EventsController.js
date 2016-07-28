var EventModel = require('../models/EventModel');
var EventsCollection = require('../collections/EventsCollection');
var EventListView = require('../views/event/EventListView');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        '': "list",
        'eventos(/)': "list",
    },

    controller: {
        list: function() {
            console.log('EventsController::list');

            var col = new EventsCollection();
            $.when(col.fetch()).then(function() {
                var view = new EventListView({ collection: col });
                $pjs.show(view);
            });

        }
    }


});
