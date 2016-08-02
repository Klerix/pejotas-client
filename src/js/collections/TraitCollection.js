var BaseCollection = require('./BaseCollection');
var TraitModel = require('../models/TraitModel');

module.exports = BaseCollection.extend({
    model: TraitModel,
    endpoint: "traits"
});
