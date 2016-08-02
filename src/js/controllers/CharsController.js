module.exports = Marionette.AppRouter.extend({

    appRoutes: {
        'char/:code(/)': 'compose',
        'char/load(/)': 'load',
    },
    controller: {
        compose: function() {
            console.log("CharsController::compose")
        },
        load: function() {
            console.log("CharsController::load")
        }
    }
});
