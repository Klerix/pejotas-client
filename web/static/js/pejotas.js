/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

var $pjs = $pjs || {
    version: "4.0.0",
    divs: {},


};

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

(function($) {

    $.fn.pejotas = function(grid) {
        $pjs.director.render(this);
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

/**
 * pejotas 4.0.0
 * @license ARV Klerix @ 2016 
 * @author: Jordi Aguilar <klerix.com>
 */

$pjs.director = {
    menuItems: [
        { name: "Inicio", icon: 'fa-home' },
        { name: "Listar Habilidades", icon: 'fa-list' },
        { name: "Subir personaje", icon: 'fa-cloud-upload' },
        { name: "Descargar personaje", icon: 'fa-cloud-download' }

    ],
    render: function($container) {
        $pjs.divs['main'] = $('<div class="pjs" />').appendTo($container);

        $pjs.director._drawMenu();
    },

    _drawMenu: function() {
        $pjs.divs['menu'] = $('<div class="pjs-menu" />').appendTo($pjs.divs['main']);
        $('<span>Pejotas <em>v' + $pjs.version + '</em></span>').appendTo($pjs.divs['menu']);

        var $menu = $('<menu />').appendTo($pjs.divs['menu']);
        $('<span id="pjs-menu-selector"></span>').appendTo($menu);
        for (var i = 0; i < $pjs.director.menuItems.length; i++) {
            var item = $pjs.director.menuItems[i];
            $pjs.director._drawMenuItem($menu, item);
        }
    },

    _drawMenuItem($container, item) {
        var html = '<a title="' + item.name + '">' +
            '<i class="fa ' + item.icon + '" aria-hidden="true"></i>' +
            '</a>';

        $(html)
            .appendTo($container)
            .on('mouseout', function(ev) {
                $('#pjs-menu-selector').text('');
            })
            .on('mouseover', function(ev) {
                $('#pjs-menu-selector').text(this.title);
            });
    }

};
