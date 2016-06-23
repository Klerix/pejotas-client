$pjs.views.Eventos = {
    list: function(items) {
        var wrapper = $('<div class="pjs-wrapper" />').appendTo($pjs.divs['body']);
        $.each(items, function(k, v) {
            $pjs.views.Eventos.view(v)
                .appendTo(wrapper);
        });

        return wrapper;
    },

    view: function(item) {
        // Wrapper
        var div = $('<div class="pjs-box pjs-evento" />');

        // Desc + TT
        var desc = '<h3>' + item.nombre + '</h3><p>' + item.descripcion + '</p>';

        // Logo or Body
        if (item.custom_logo) {
            div.css("background", "url(" + item.custom_logo + ") no-repeat");
        } else {
            div.html('<div style="padding: 5px">' + desc + '</div>');
        }

        // tooltip
        div.jqxTooltip({ content: desc, position: 'mouse' });

        // onclick
        div.on("click", function() {
            $pjs.router.navigate('/eventos/' + item.id + '/crearpj/')
        });

        return div;
    }
};
