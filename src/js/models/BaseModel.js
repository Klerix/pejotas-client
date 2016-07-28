module.exports = Backbone.Model.extend({
    baseUrl: 'http://localhost:8080/',

    endpoint: '',

    urlRoot: function() {
        return this.baseUrl + this.endpoint;
    },
});
