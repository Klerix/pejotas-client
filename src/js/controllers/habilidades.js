$.extend($pjs.controllers, {
    '/habilidades/listar': function(params) {
        $pjs.spinner.show();

        $pjs.ajax('habilidades', function(habs) {
            $pjs.ajax('rasgos', function(rasgos) {
                $pjs.divs['body'].empty();

                var div = $('<div class="lista" />').appendTo($pjs.divs['body']);

                var options = {};
                if (location.hash) options.selectedItem = location.hash[1];

                $pjs.views.tabs({
                    "Habilidades": $pjs.views.Habilidad.listar(habs),
                    "Rasgos": $pjs.views.Rasgo.listar(rasgos),
                }, options).on('selected', function(event) {
                    $pjs.router.pause(true);
                    window.location.hash = event.args.item;
                    $pjs.router.pause(false);
                }).appendTo(div);

                $pjs.spinner.hide();
            });
        });
    },
    '/habilidades/mostrar/:id': function(params) {
        $pjs.spinner.show();

        $pjs.ajax('habilidades/' + params.id, function(resp) {
            $pjs.divs['body'].empty();

            var item = new $pjs.views.Habilidad(resp);
            item.drawView().appendTo($pjs.divs['body']);

            $pjs.spinner.hide();
        });
    }
});
