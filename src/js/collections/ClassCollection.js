var BaseCollection = require('./BaseCollection');
var ClassModel = require('../models/EventModel');

module.exports = BaseCollection.extend({
    model: ClassModel,
    endpoint: "classes"
});
