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
