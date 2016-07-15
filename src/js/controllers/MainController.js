var LayoutView = require("../views/layout/LayoutView");


var fetchModel = function(model, data) {
    var deferred = $.Deferred();

    model.fetch({
        data: data,
        success: deferred.resolve,
        error: deferred.reject
    });

    return deferred.promise()
};

var renderModel = function(view) {
    view.$el = $pjs.div;
    view.render();
}

var renderCollection = function(view) {
    view.$el = $pjs.div;
    view.render();
}

module.exports = {

    init: function($container) {

        var layout = new LayoutView;
        layout.$el = $container;
        layout.render();

        window.$pjs.div = $('.pjs__body');

        Backbone.history.start();
    },

    render: function(viewClass, modelClass, data) {
        var model = new modelClass();
        var promise = fetchModel(model, data);

        $.when(promise).then(function(m, res) {
            if (m instanceof Backbone.Collection) {
                var view = new viewClass({ collection: m });
                renderCollection(view);
            } else {
                var view = new viewClass({ model: m });
                renderModel(view);
            }
            console.log("Rendering view:", view);
        });
    },

};
