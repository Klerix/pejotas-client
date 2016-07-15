var BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({
    urlRoot: function() {
        return $pjs.server + 'events/';
    }
});
