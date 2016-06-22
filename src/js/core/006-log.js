$pjs.notify = function(message, template) {
    template = template || "error";

    $('<div style="margin: 0 auto"><div>' + message + '</div></div>')
        .jqxNotification({
            opacity: 0.9,
            autoOpen: true,
            appendContainer: ".pjs-body",
            template: template
        })
        .on("close", function() {
            this.remove()
        });
};
