var BaseCollection = require('./BaseCollection');
var ArchetypeModel = require('../models/ArchetypeModel');

module.exports = BaseCollection.extend({
  model: ArchetypeModel,
  endpoint: "archetypes"
});
