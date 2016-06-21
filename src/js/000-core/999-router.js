$pjs.router = new Navigo();

$pjs.director._initRouter = function() {
    $.each($pjs.controllers, function(k, v) {
        $pjs.router.on(v).resolve();
    });

    $pjs.router.on('*', function() {
        $pjs.divs['body'].html("Route not found");
    }).resolve();
};
