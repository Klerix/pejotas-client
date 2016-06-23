$pjs.views.Habilidades = {
    list: function(items) {
        var wrapper = $('<div class="pjs-wrapper" />').appendTo($pjs.divs['body']);
        $.each(items, function(k, v) {
            $pjs.views.Habilidades.view(v)
                .appendTo(wrapper);
        });
        return wrapper;
    },

    view: function(item) {
        item.className = $pjs.nameToClass(item.nombre);
        var div = $('<div class="pjs-box pjs-skill" />');

        // Tipo
        $('<div style="float: right; color: darkgray;">' + item.tipo + '</div>')
            .appendTo(div);

        // Icono
        $($pjs.views.Habilidades.icon(item))
            .appendTo(div);

        // Name & desc
        var resumen = item.resumen.length > 55 ? item.resumen.substring(0, 55) + '...' : item.resumen;
        $('<div><strong>' + item.nombre + '</strong><br /><span>' + resumen + '</span></div>')
            .appendTo(div);

        // tooltip
        div.jqxTooltip({ content: $pjs.views.Habilidades.tooltip(item), position: 'mouse' });

        // onclick
        //div.on("click", function() {
        //    $pjs.router.navigate('/habilidades/' + item.id + '/ver/')
        //});

        return div;
    },

    tooltip: function(item) {
        return '<div>' +
            $pjs.views.Habilidades.icon(item) +
            '<strong>' + item.nombre + '</strong><br />' +
            '<em>' + item.categoria + '</em><br />' +
            '<b>Tipo:</b> ' + item.tipo + '<br />' +
            '<b>Letan&iacute;a:</b> <em>' + item.letania + '</em><br />' +
            '<br />' +
            '<span>' + item.resumen + '</span>' +
            '</div>';
    },

    icon: function(item) {
        return '<div class="pjs-icon icon-' + item.className + '" style="background-image:url(../static/images/hab/' + item.className + '.gif)" />'
    }
};
/*
< div id = "habilidad-tt"
class = "tt" >
    < div class = "head-tt" >
    < img class = "imagen-tt"
src = "estatico/img/spinner.gif" / >
    < strong > < span class = "nombre-tt" > < /span></strong > < br / >
    < em > < span class = "categoria-tt" > < /span></em > < br / >
    < /div> < b > Tipo: < /b > < span class = "tipo-tt" > < /span > < br / >
    < b > Letanía: < /b> <em><span class="letania-tt"></span > < /em><br/ >
    < br / >
    < span class = "resumen-tt" > < /span> < /div >
*/
