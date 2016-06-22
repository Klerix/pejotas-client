$pjs.controllers.push({
    '/': function(params) {
        $pjs.spinner.show();

        $pjs.ajax('eventos', function(resp) {
            $("<h2>Eventos</h2>").appendTo($pjs.divs['body']);
            var wrapper = $('<div class="pjs-wrapper" />').appendTo($pjs.divs['body']);
            $.each(resp, function(k, v) {
                var div = $('<div class="pjs-box pjs-evento" />').appendTo(wrapper);
                if (v.custom_logo) {
                    div.css("background", "url(" + v.custom_logo + ") no-repeat");
                } else {
                    div.html('<div style="padding: 5px"><h3>' + v.nombre + '</h3><p>' + v.descripcion + '</p></div>');
                }
            });

            $pjs.spinner.hide();
        });
    }
});
