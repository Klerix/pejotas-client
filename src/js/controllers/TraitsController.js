var TraitsController = Backbone.Controller.extend($pjs.controllers, {
    '/rasgos/mostrar/:id': function(params) {
        $pjs.spinner.show();

        $pjs.ajax('rasgos/' + params.id, function(resp) {
            $pjs.divs['body'].empty();

            var item = new $pjs.views.Rasgo(resp);
            item.drawView().appendTo($pjs.divs['body']);

            $pjs.spinner.hide();
        });
    }
});

module.exports = TraitsController;
