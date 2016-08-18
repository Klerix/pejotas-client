var BaseCollection = require('./BaseCollection');
var ClassModel = require('../models/ClassModel');

module.exports = BaseCollection.extend({
  model: ClassModel,
  endpoint: "classes"
});
