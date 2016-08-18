module.exports = Backbone.Model.extend({
  initialize: function() {
    this.baseUrl = $pjs.server;
  },

  endpoint: '',

  urlRoot: function() {
    return this.baseUrl + this.endpoint;
  },
});
