$pjs.router = new Navigo();

$pjs.director._initRouter = function() {
    $pjs.router.on($pjs.controllers).resolve();

    $pjs.router.on('/', function() {
        $pjs.controllers[$pjs.index](); // redirect to chosen index
    }).resolve();
};
