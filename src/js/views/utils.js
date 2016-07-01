$pjs.views.tabs = function(object, options) {

    var tabs = $('<div class="pjs-tabs" />').appendTo($pjs.divs['body']);
    var ul = $('<ul/>').appendTo(tabs);

    for (var k in object) {
        var content = object[k];
        if (typeof content == "string") {
            $('<div>' + content + '</div>').appendTo(tabs);
        } else {
            var div = $('<div />').appendTo(tabs);
            content.appendTo(div);
        }
        $('<li>' + k + '</li>').appendTo(ul);
    }

    tabs.jqxTabs(options || {});

    return tabs;
};

$pjs.views.translateDict = {
    "nr": { "icon": "ra-diamond", "name": "Nivel de Recursos" },
    "ns": { "icon": "ra-pyramids", "name": "Nivel de Suministros/Ciclo" },
    "moral": { "icon": "ra-horn-call", "name": "Moral" },
    "sanar": { "icon": "ra-health", "name": "Sanar" },
    "bendicion": { "icon": "ra-health-increase", "name": "Bendici&oacute;n" },
    "maldicion": { "icon": "ra-health-decrease", "name": "Maldición" },

    "r:saber": { "icon": "ra-book", "name": "Rasgo: Saber" },
    "r:comercio": { "icon": "ra-wooden-sign", "name": "Rasgo: Comercio" },
    "r:alquimia": { "icon": "ra-potion", "name": "Rasgo: Alquimia" },
    "r:herreria": { "icon": "ra-anvil", "name": "Rasgo: Herrer&iacute;a" },
    "r:protector": { "icon": "ra-shield", "name": "Rasgo: Protector" },
    "r:paz": { "icon": "ra-two-hearts", "name": "Rasgo: Aura de Paz" },
    "r:lengua": { "icon": "ra-speech-bubbles", "name": "Rasgo: Lenguaje" },
    "r:escribir": { "icon": "ra-quill-ink", "name": "Rasgo: Leer y Escribir" },
    "r:adiccion": { "icon": "ra-beer", "name": "Rasgo: Adicci&oacute;n" },
    "r:hurtar": { "icon": "ra-nuclear", "name": "Rasgo: Hurtar" },
    "r:interrogar": { "icon": "ra-gears", "name": "Rasgo: Interrogar" },
    "r:pacifista": { "icon": "ra-cancel", "name": "Rasgo: Pacifista" },

    "a:ligera": { "icon": "ra-knight-helmet", "name": "Aptitud: Armadura Ligera" },
    "a:pesada": { "icon": "ra-helmet", "name": "Aptitud: Armadura Pesada" },
    "a:tunica": { "icon": "ra-vest", "name": "Aptitud: T&uacute;nica" },
    "a:escudo": { "icon": " ra-round-shield", "name": "Aptitud: Escudo" },
    "a:torre": { "icon": "ra-eye-shield", "name": "Aptitud: Escudo Torre" },


    "a:desarmado": { "icon": "ra-hand", "name": "Adiestramiento: Combate Desarmado" },
};

$pjs.views.translateEffects = function(efectos) {
    if (efectos) {
        $.each($pjs.views.translateDict, function(k, v) {
            efectos = efectos.replace(k, '<i title="' + v.name + '" class="ra ' + v.icon + '"></i>');
        });

        return efectos;

    } else {

        return "";
    }

};

$pjs.views.link = function(href, text) {
    return $('<a href="javascript:void(0, \'' + href + '\')">' + text + '</a>')
        .linkTo(href);
}

$.fn.linkTo = function(href) {
    return this.on('click', function(e) {
        e.preventDefault();
        switch (e.which) {
            case 1: // left
                $pjs.router.navigate(href);
                break;
            case 2: // middle
                window.open($pjs.router.link(href), '_blank');
                break;
        }
    });
};


$.fn.addLinkTo = function(href, text) {
    return this.append($pjs.views.link(href, text));
};
