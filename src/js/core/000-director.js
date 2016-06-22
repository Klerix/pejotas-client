$pjs.director = {
    render: function($container) {
        // Create main container
        $pjs.divs['main'] = $('<div class="pjs" />').appendTo($container);

        // Draw menu
        $pjs.director._drawMenu();

        // Draw body
        $pjs.director._drawBody();

        // Draw loader
        $pjs.spinner._draw();


        // Finally: Initialize routes
        $pjs.director._initRouter();
    },
};


$pjs.render = function($container) {
    $pjs.director.render($container);
};
