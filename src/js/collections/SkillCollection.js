var BaseCollection = require('./BaseCollection');
var SkillModel = require('../models/SkillModel');

module.exports = BaseCollection.extend({
  model: SkillModel,
  endpoint: "skills",

  // Order skills as a tree and add offset to each one
  treeSort: function () {
    this.models = this.getSonsOf(0);
  },

  getSonsOf: function (id, offset) {
    offset = offset || 0;
    var models = [];

    _.each(this.where({ skill_id: id }), function (m) {
      m.attributes.offset = offset;
      models = _.concat(models, [m], this.getSonsOf(m.attributes.id, offset + 1));
    }.bind(this));

    return models;
  }
});
