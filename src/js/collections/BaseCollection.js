module.exports = Backbone.Collection.extend({
    baseUrl: 'http://localhost:8080/',
    endpoint: '',
    params: {},

    url: function() {
        return this.baseUrl + '/' + this.endpoint + $.param(this.params)
    }
});
