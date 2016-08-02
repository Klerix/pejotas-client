var BaseCollection = require('./BaseCollection');
var SkillModel = require('../models/SkillModel');

module.exports = BaseCollection.extend({
    model: SkillModel,
    endpoint: "skills"
});
