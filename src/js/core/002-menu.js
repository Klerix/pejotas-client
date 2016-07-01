$pjs.director._drawMenu = function() {

    $pjs.divs['menu-container'] = $('<div class="pjs-menu-container" />').appendTo($pjs.divs['main']);
    $pjs.divs['menu'] = $('<div class="pjs-menu" />').appendTo($pjs.divs['menu-container']);
    $(
            '<span style="cursor: pointer;" title="Volver al inicio">' +
            '<span class="pjs-header">' +
            '<i class="ra ' + $pjs.director._rndLogo() + '" aria-hidden="true"></i> ' +
            'Creador de Pejotas' +
            '</span> ' +
            '<em>v' + $pjs.version + '</em>' +
            '</span>'

        )
        .linkTo('/')
        .appendTo($pjs.divs['menu']);

    var $menu = $('<menu />').appendTo($pjs.divs['menu']);
    $('<span id="pjs-menu-selector"></span>').appendTo($menu);
    for (var i = 0; i < $pjs.director.menuItems.length; i++) {
        var item = $pjs.director.menuItems[i];
        $pjs.director._drawMenuItem($menu, item);
    }
};

$pjs.director._drawMenuItem = function($container, item) {
    var html = '<a title="' + item.name + '">' +
        '<i class="' + item.icon + '" aria-hidden="true"></i>' +
        '</a>';

    $(html)
        .on('mouseout', function(ev) {
            $('#pjs-menu-selector').text('');
        })
        .on('mouseover', function(ev) {
            $('#pjs-menu-selector').text(this.title);
        })
        .linkTo(item.route)
        .appendTo($container);
};

$pjs.director._rndLogo = function($container, item) {
    var logoItems = [
        "ra-player-thunder-struck",
        "ra-player-pyromaniac",
        "ra-falling",
        "ra-muscle-fat",
        "ra-hydra",
        "ra-wolf-howl",
        "ra-burning-meteor",
        "ra-hood",
        "ra-castle-emblem",
        //"ra-angel-wings"
    ];
    return logoItems[Math.floor(Math.random() * logoItems.length)];
};
