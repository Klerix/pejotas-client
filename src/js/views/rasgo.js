$pjs.views.Rasgo = function(data) {
    this.data = data;

    // calculate
    this.data.className = $pjs.nameToClass(data.nombre);
};

$pjs.views.Rasgo.listar = function(items) {
    var wrapper = $('<div class="pjs-wrapper" />');
    $("<div style='float: left; margin: 0 10px; width: 80%;'><h3>Rasgos</h3></div>").appendTo(wrapper);

    $.each(items, function(k, v) {
        var item = new $pjs.views.Rasgo(v);
        item.drawItem({ class: 'linkable' }).appendTo(wrapper);
    });

    return wrapper;
};

$pjs.views.Rasgo.prototype = {

    drawIcon: function() {
        return '<div ' +
            'class="pjs-icon icon-' + this.data.className + '" ' +
            'style="background-image:url(../static/images/rasgos/' + this.data.className + '.gif)" ' +
            '/>'
    },

    drawTooltip: function($container) {
        var content = '<div>' +
            this.drawEffects('float: right') +
            this.drawIcon() +
            '<strong style="font-size: 12px; line-height: 24px">' + this.data.nombre + '</strong><br/>' +
            '<strong>Tipo:</strong> <em>' + this.data.tipo + '</em><br />' +
            this.getResumen(55) +
            '</div>';

        $container.jqxTooltip({ content: content, position: 'mouse', autoHide: false, width: "400px" });
    },

    drawEffects: function(style) {
        return '<div class="pjs-effects" style="' + style + '">' + $pjs.views.translateEffects(this.data.efecto) + '</div>';
    },

    drawItem: function(options) {
        options = options || {};
        var div = $('<div class="pjs-box pjs-skill ' + options.class + '" />');

        // Tipo
        $('<div style="float: right; color: darkgray;">' + this.data.tipo + '</div>').appendTo(div);

        // Icono
        $(this.drawIcon()).appendTo(div);

        // Name & desc
        $('<div><strong>' + this.data.nombre + '</strong><br /><span>' + this.getResumen() + '</span></div>').appendTo(div);

        // tooltip
        this.drawTooltip(div);

        // onclick
        div.linkTo('/rasgos/mostrar/' + this.data.id);

        return div;
    },

    drawView: function() {
        var div = $('<div />');

        // info
        var info = $('<div style="float: right" class="pjs-infobox">' +
            '<strong>Tipo:</strong> ' + this.data.tipo + '<br />' +
            '</div>'
        ).appendTo(div);


        // clases
        if (this.data.arquetipos) {
            var wrap = $('<div/>').appendTo(info);
            $('<hr/><br /><strong>Arquetipos:</strong><ul>').appendTo(wrap);
            for (var i in this.data.arquetipos) {
                var arquetipo = this.data.arquetipos[i];
                var li = $('<li />')
                    .addLinkTo('/personajes/a' + arquetipo.id, arquetipo.nombre)
                    .appendTo(wrap);
            }
            $('</ul>').appendTo(wrap);
        }

        // body
        $('<div>' +
            this.drawEffects('float:right') +
            this.drawIcon() +
            '<h2>' + this.data.nombre + '</h2>' +
            '</div>' +
            '<div style="text-align: justify">' +
            this.data.descripcion +
            '</div>' +
            '<br/><br/>'
        ).appendTo(div);

        div.addLinkTo('/habilidades/listar/#1', "&lt; Lista de Ragos");

        return div;
    },

    getResumen: function() {
        return this.data.descripcion.length > 55 ? this.data.descripcion.substring(0, 55) + '...' : this.data.descripcion;
    }

};
