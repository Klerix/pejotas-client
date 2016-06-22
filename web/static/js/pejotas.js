/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

var $pjs = $pjs || {
    config: {
        server: 'http://localhost:8080/'
    },
    version: "4.0.0",
    divs: {},
    controllers: [],
};

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

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

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

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

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

$pjs.director._drawBody = function() {
    $pjs.divs['body-container'] = $('<div class="pjs-body-container" />').appendTo($pjs.divs['main']);
    $pjs.divs['body'] = $('<div class="pjs-body" />').appendTo($pjs.divs['body-container']);
};

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

$pjs.spinner = {
    show: function() {
        $pjs.divs['loader'].jqxLoader('open');
    },

    hide: function() {
        $pjs.divs['loader'].jqxLoader("close");
    },

    _draw: function() {
        $pjs.divs['loader'] = $('<div id="jqxLoader" />').appendTo($pjs.divs['main']);
        $pjs.divs['loader'].jqxLoader({ width: 150, height: 100, text: "Cargando..." })
    }
};

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

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

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

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

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

$pjs.router = new Navigo();

$pjs.director._initRouter = function() {
    $.each($pjs.controllers, function(k, v) {
        $pjs.router.on(v).resolve();
    });

    $pjs.router.on('*', function() {
        $pjs.divs['body'].html("Route not found");
    }).resolve();
};

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

$pjs.controllers.push({
    '/habilidades/lista': function(params) {
        $pjs.divs['body'].html("habs");
    }
});

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

$pjs.controllers.push({
    '/personajes/subir': function(params) {
        $pjs.divs['body'].html("upload")
    }
})

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

$pjs.controllers.push({
    '/': function(params) {
        $pjs.spinner.show();

        $pjs.ajax('eventos', function(resp) {
            $("<h2>Eventos</h2>").appendTo($pjs.divs['body']);
            var wrapper = $('<div class="pjs-wrapper" />').appendTo($pjs.divs['body']);
            $.each(resp, function(k, v) {
                var div = $('<div class="pjs-box pjs-evento" />').appendTo(wrapper);
                if (v.custom_logo) {
                    div.css("background", "url(" + v.custom_logo + ") no-repeat");
                } else {
                    div.html('<div style="padding: 5px"><h3>' + v.nombre + '</h3><p>' + v.descripcion + '</p></div>');
                }
            });

            $pjs.spinner.hide();
        });
    }
});

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

(function($) {

    $.fn.pejotas = function(grid) {
        $pjs.render(this);
    };

}(jQuery));

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

/**
 * @license
 * YouboraLib Report
 * Copyright NicePopleAtWork <http://nicepeopleatwork.com/>
 */

/**
 * $pjs.report will show all messages inferior to this level.
 * 0: no errors;
 * 1: errors;
 * 2: + warnings;
 * 3: + life-cycle logs;
 * 4: + debug messages;
 * 5: + expose HTTP requests;
 * You can specify youbora-debug="X" inside the &lt;script&gt; tag to force level.
 *
 * @default 2
 * @memberof $pjs
 * @see {@link $pjs.report}
 */
$pjs.debugLevel = 2;

$pjs.messageLevels = {
    1: "e", // Error
    2: "w", // Warning
    3: "n", // Notice
    4: "d", // Debug
    5: "v" // Verbose
}

/**
 * If true, console outputs will always be outputed without colors (for debbugin in devices).
 * @default false
 * @memberof $pjs
 */
$pjs.plainConsole = false;

/**
 * Returns a console message
 *
 * @memberof $pjs
 * @private
 * @param {(string|object|array)} msg Message string, object or array of messages.
 * @param {number} [debugLevel=3] Defines the level of the error sent. Only errors with level lower than $pjs.debugLevel will be displayed.
 * @param {string} [color=darkcyan] Color of the header
 * @see {@link $pjs.debugLevel}
 */
$pjs.report = function(msg, debugLevel, color) {
    if (console && console.log) {
        debugLevel = debugLevel || 4;
        color = color || 'darkcyan';
        var letter = $pjs.messageLevels[debugLevel];
        var prefix = '[Youbora] ' + letter + ': ';

        // If RemoteLog is available & enabled
        if (typeof $pjs.remoteLog != "undefined" && $pjs.remoteLog.enabled === true) {
            $pjs.remoteLog(prefix + msg);
        }

        // Show messages in actual console if level is enought
        if ($pjs.debugLevel >= debugLevel) {

            if ($pjs.plainConsole || document.documentMode) { //document.documentMode exits only in IE
                // Plain log for IE and devices
                $pjs.plainReport(msg, prefix);
            } else {
                // choose log method
                var logMethod = console.log;
                if (debugLevel == 1 && console.error) {
                    logMethod = console.error;
                } else if (debugLevel == 2 && console.warn) {
                    logMethod = console.warn;
                } else if (debugLevel >= 4 && console.debug) {
                    logMethod = console.debug;
                }

                // print message
                prefix = '%c' + prefix;
                if (msg instanceof Array) {
                    msg.splice(0, 0, prefix, 'color: ' + color);
                    logMethod.apply(console, msg);
                } else {
                    logMethod.call(console, prefix, 'color: ' + color, msg);
                }
            }
        }
    }
};


/**
 * Returns a console message without style
 *
 * @memberof $pjs
 * @since  5.3
 * @private
 * @param {(string|object|array)} msg Message string, object or array of messages.
 */
$pjs.plainReport = function(msg, prefix) {
    if (msg instanceof Array) {
        for (var m in msg) {
            $pjs.plainReport(m);
        }
    } else {
        if (typeof msg == 'string') {
            console.log(prefix + msg);
        } else {
            console.log(prefix + '<next line>');
            console.log(msg);
        }
    }
};

/**
 * Sends an error (level 1) console log.
 * Supports unlimited arguments: ("this", "is", "a", "message")
 * @memberof $pjs
 * @see {@link $pjs.report}
 */
$pjs.error = function( /*...*/ ) {
    $pjs.report([].slice.call(arguments), 1, 'darkred');
};

/**
 * Sends a warning (level 2) console log.
 * Supports unlimited arguments: ("this", "is", "a", "message")
 * @memberof $pjs
 * @see {@link $pjs.report}
 */
$pjs.warn = function( /*...*/ ) {
    $pjs.report([].slice.call(arguments), 2, 'darkorange');
};

/**
 * Sends a notice (level 3) console log.
 * Supports unlimited arguments: ("this", "is", "a", "message")
 * @memberof $pjs
 * @see {@link $pjs.report}
 */
$pjs.notice = function( /*...*/ ) {
    $pjs.report([].slice.call(arguments), 3, 'darkcyan');
};

/**
 * Sends a notice (level 3) console log.
 * Use this function to report service calls "/start", "/error"...
 * Supports unlimited arguments: ("this", "is", "a", "message")
 * @memberof $pjs
 * @see {@link $pjs.report}
 */
$pjs.noticeRequest = function( /*...*/ ) {
    $pjs.report([].slice.call(arguments), 3, 'darkgreen');
};

/**
 * Sends a debug message (level 4) to console.
 * Supports unlimited arguments: ("this", "is", "a", "message")
 * @memberof $pjs
 * @see {@link $pjs.report}
 */
$pjs.debug = function( /*...*/ ) {
    $pjs.report([].slice.call(arguments), 4, 'indigo');
};

/**
 * Sends a verbose message (level 5) to console.
 * Supports unlimited arguments: ("this", "is", "a", "message")
 * @memberof $pjs
 * @see {@link $pjs.report}
 */
$pjs.verbose = function( /*...*/ ) {
    $pjs.report([].slice.call(arguments), 5, 'navy');
};
