$pjs.spinner = {
    show: function() {
        $pjs.divs['loader'].jqxLoader('open');
        $('div.jqx-tooltip').remove()
    },

    hide: function() {
        $pjs.divs['loader'].jqxLoader("close");
    },

    _draw: function() {
        $pjs.divs['loader'] = $('<div id="jqxLoader" />').appendTo($pjs.divs['main']);
        $pjs.divs['loader'].jqxLoader({ width: 150, height: 100, text: "Cargando..." })
    }
};
