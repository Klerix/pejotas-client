var BaseCollection = require('./BaseCollection');
var EventModel = require('../models/EventModel');

module.exports = BaseCollection.extend({
    model: EventModel,
    url: function() {
        return $pjs.server + 'events/';
    }
});
