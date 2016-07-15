var EventModel = require('../models/EventModel');
var EventsCollection = require('../collections/EventsCollection');
var EventListView = require('../views/event/EventListView');

module.exports = {
    list: function() {
        $pjs.render(EventListView, EventsCollection);


        /*
        $pjs.spinner.show();

        $pjs.ajax('eventos', function(resp) {
            $pjs.divs['body']
                .empty();

            $("<h2>Eventos</h2>")
                .appendTo($pjs.divs['body']);

            $pjs.views.Eventos.list(resp)
                .appendTo($pjs.divs['body']);

            $pjs.spinner.hide();
        });*/
    }
};
