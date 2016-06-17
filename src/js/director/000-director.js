$pjs.director = {
    menuItems: [
        { name: "Inicio", icon: 'fa-home' },
        { name: "Listar Habilidades", icon: 'fa-list' },
        { name: "Subir personaje", icon: 'fa-cloud-upload' },
        { name: "Descargar personaje", icon: 'fa-cloud-download' }

    ],
    render: function($container) {
        $pjs.divs['main'] = $('<div class="pjs" />').appendTo($container);

        $pjs.director._drawMenu();
    },

    _drawMenu: function() {
        $pjs.divs['menu'] = $('<div class="pjs-menu" />').appendTo($pjs.divs['main']);
        $('<span>Pejotas <em>v' + $pjs.version + '</em></span>').appendTo($pjs.divs['menu']);

        var $menu = $('<menu />').appendTo($pjs.divs['menu']);
        $('<span id="pjs-menu-selector"></span>').appendTo($menu);
        for (var i = 0; i < $pjs.director.menuItems.length; i++) {
            var item = $pjs.director.menuItems[i];
            $pjs.director._drawMenuItem($menu, item);
        }
    },

    _drawMenuItem($container, item) {
        var html = '<a title="' + item.name + '">' +
            '<i class="fa ' + item.icon + '" aria-hidden="true"></i>' +
            '</a>';

        $(html)
            .appendTo($container)
            .on('mouseout', function(ev) {
                $('#pjs-menu-selector').text('');
            })
            .on('mouseover', function(ev) {
                $('#pjs-menu-selector').text(this.title);
            });
    }

};
