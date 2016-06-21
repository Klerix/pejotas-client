$pjs.controllers.push({
    '/': function(params) {
        $pjs.spinner.show();

        setTimeout(function() {
            $pjs.divs['body'].html("Inicio")
            $pjs.spinner.hide();
        }, 5000);

    }
});
