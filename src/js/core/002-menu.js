$pjs.director.menuItems = [
    { name: "Inicio", icon: 'fa-home', route: '/' },
    { name: "Listar Habilidades", icon: 'fa-list', route: '/habilidades/lista' },
    { name: "Subir personaje", icon: 'fa-cloud-upload', route: 'personajes/subir' }
];

$pjs.director._drawMenu = function() {
    $pjs.divs['menu-container'] = $('<div class="pjs-menu-container" />').appendTo($pjs.divs['main']);
    $pjs.divs['menu'] = $('<div class="pjs-menu" />').appendTo($pjs.divs['menu-container']);
    $('<span>Pejotas <em>v' + $pjs.version + '</em></span>').appendTo($pjs.divs['menu']);

    var $menu = $('<menu />').appendTo($pjs.divs['menu']);
    $('<span id="pjs-menu-selector"></span>').appendTo($menu);
    for (var i = 0; i < $pjs.director.menuItems.length; i++) {
        var item = $pjs.director.menuItems[i];
        $pjs.director._drawMenuItem($menu, item);
    }
};

$pjs.director._drawMenuItem = function($container, item) {
    var html = '<a title="' + item.name + '">' +
        '<i class="fa ' + item.icon + '" aria-hidden="true"></i>' +
        '</a>';

    $(html)
        .on('mouseout', function(ev) {
            $('#pjs-menu-selector').text('');
        })
        .on('mouseover', function(ev) {
            $('#pjs-menu-selector').text(this.title);
        })
        .on('click', function(ev) {
            $pjs.router.navigate(item.route);
        })
        .appendTo($container);
};
