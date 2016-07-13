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

    getIcon: function() {
        return '<div ' +
            'class="pjs-icon icon-' + this.data.className + '" ' +
            'style="background-image:url(../static/images/rasgos/' + this.data.className + '.gif)" ' +
            '/>'
    },

    getTooltip: function($container) {
        return '<div>' +
            //this.getEffects('float: right', false) +
            //this.getIcon() +
            '<strong>' + this.data.nombre + '</strong><br />' +
            //'<em>' +
            //this.data.categoria + ', ' +
            //this.data.tipo +
            //'</em><br />' +
            this.getResumen(300) +
            '</div>';
    },

    getEffects: function(style) {
        return '<div class="pjs-effects" style="' + style + '">' + $pjs.views.translateEffects(this.data.efecto) + '</div>';
    },

    getResumen: function(max) {
        max = max || 55;
        return this.data.descripcion.length > max ? this.data.descripcion.substring(0, max) + '...' : this.data.descripcion;
    },

    drawItem: function(options) {
        options = options || {};
        var div = $('<div class="pjs-box pjs-skill ' + options.class + '" style="' + options.style + '" />');

        // Tipo
        $(this.getEffects('float: right', false)).appendTo(div);

        // Icono
        $(this.getIcon()).appendTo(div);

        // Name & desc
        $('<div><strong>' +
            this.data.nombre +
            '</strong><br />' +
            '<span style="color: darkgray">' +
            //this.data.categoria + ', ' +
            this.data.tipo +
            '</span></div>'
        ).appendTo(div);

        // tooltip
        div.jqxTooltip({ content: this.getTooltip(), position: 'bottom', showArrow: false, width: "405px" });

        // onclick
        var context = this;
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
        $(
            '<div>' +
            this.getEffects('float:right') +
            this.getIcon() +
            '<h2>' + this.data.nombre + '</h2>' +
            '<span style="color: darkgray">' +
            '<strong>Tipo:</strong> ' +
            //this.data.categoria + ', ' +
            this.data.tipo +
            '</span></div>' +
            '</div>' +
            '<div style="text-align: justify">' +
            this.data.descripcion +
            '</div>' +
            '<br/><br/>'
        ).appendTo(div);

        div.addLinkTo('/habilidades/listar/#1', "&lt; Lista de Ragos");

        return div;
    },
};
