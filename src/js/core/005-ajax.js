$pjs.ajax = function(service, cb) {
    var request = $.ajax({
        url: $pjs.config.server + service,
        dateType: "json"
    });

    request.done(function(response) {
        cb(response);
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
        $pjs.notify("La conexi&oacute;n no se ha podido establecer.", "error");
        console.error("Ajax request failed", errorThrown);
        $pjs.spinner.hide();
    });
};
