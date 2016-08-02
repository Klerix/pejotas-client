$pjs.views.Habilidad = function(data) {
    this.data = data;

    // calculate
    this.data.className = $pjs.nameToClass(data.nombre);
};

$pjs.views.Habilidad.listar = function(items) {
    var categoria = '';
    var wrapper = $('<div class="pjs-wrapper" />');
    $.each(items, function(k, v) {
        if (categoria != v.categoria) {
            categoria = v.categoria;
            $("<div style='float: left; margin: 0 10px; width: 80%;'><h3>" + categoria + "</h3></div>").appendTo(wrapper);
        }

        var item = new $pjs.views.Habilidad(v);
        item.drawItem({ class: 'linkable' }).appendTo(wrapper);
    });

    return wrapper;
};

$pjs.views.Habilidad.prototype = {

    getIcon: function() {
        return '<div ' +
            'class="pjs-icon icon-' + this.data.className + '" ' +
            'style="background-image:url(../static/images/habilidades/' + this.data.className + '.gif)" ' +
            '/>'
    },

    getEffects: function(style, titles) {
        return '<div class="pjs-effects" style="' + style + '">' + $pjs.views.translateEffects(this.data.efecto, titles) + '</div>';
    },

    getLetania: function() {
        if (this.data.letania != '-')
            return '<p><strong>Letan&iacute;a:</strong> <em>' + this.data.letania + '</em></p>'
        else
            return '';
    },

    getTooltip: function() {
        return '<div>' +
            //this.getEffects('float: right', false) +
            //this.getIcon() +

            '<strong>' + this.data.nombre + '</strong><br />' +
            //'<em>' +
            //this.data.categoria + ', ' +
            //this.data.tipo +
            //'</em><br />' +
            this.getResumen(300) +
            this.getLetania() +
            '</div>';
    },

    getLink: function() {

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
            this.data.categoria + ', ' +
            this.data.tipo +
            '</span></div>'
        ).appendTo(div);

        // tooltip
        div.jqxTooltip({ content: this.getTooltip(), position: 'bottom', showArrow: false, width: "405px" });

        // onclick
        var context = this;
        div.linkTo('/habilidades/mostrar/' + this.data.id);

        return div;
    },

    drawView: function() {
        var div = $('<div />');
        var aside = $('<div style="float: right; width: 250px;" />').appendTo(div);

        // requisito
        this.drawRequirement().appendTo(aside);

        // info

        // clases
        if (this.data.clases) {
            var info = $('<div style="" class="pjs-infobox"/>').appendTo(aside);
            $('<strong>Clases:</strong><ul>').appendTo(info);
            for (var i in this.data.clases) {
                var clase = this.data.clases[i];
                var li = $('<li />')
                    .addLinkTo('/personajes/c' + clase.id, clase.nombre)
                    .append(' por <strong>' + (this.data.ph + clase.extraph) + 'PHs</strong>')
                    .appendTo(info);
            }
            $('</ul>').appendTo(info);
        }

        // body
        $(
            '<div>' +
            this.getEffects('float:right') +
            this.getIcon() +
            '<h2>' + this.data.nombre + '</h2>' +
            '<span style="color: darkgray">' +
            '<strong>Tipo:</strong> ' +
            this.data.categoria + ', ' +
            this.data.tipo +
            '</span></div>' +
            '</div>' +
            '<div style="text-align: justify">' +
            this.data.descripcion +
            '</div>' +
            this.getLetania() +
            '<br/><br/>'
        ).appendTo(div);

        div.addLinkTo('/habilidades/listar/#0', "&lt; Lista de Habilidades");

        return div;
    },

    drawRequirement: function() {
        var div = $('<div style="text-align: right; margin: 0 0 10px 15px;">' +
            '<strong>Requisito:</strong>' +
            '</div>');

        if (this.data.habilidad) {
            var h = new $pjs.views.Habilidad(this.data.habilidad[0]);
            return div.append(
                h.drawItem({ style: 'float: none; width: 223px; cursor: pointer; margin: 0' })
            );
        } else {
            return div.append(" Ninguno");
        }
    }
};
