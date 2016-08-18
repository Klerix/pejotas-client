module.exports = Backbone.Collection.extend({
  initialize: function() {
    this.baseUrl = $pjs.server;
  },
  endpoint: '',
  params: {},

  url: function() {
    return this.baseUrl + this.endpoint + $.param(this.params)
  }
});
