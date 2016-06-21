$pjs.spinner = {
    show: function() {
        $pjs.divs['body'].html('Cargando...');
        $pjs.divs['menu-container'].addClass("loading");
    },

    hide: function() {
        $pjs.divs['menu-container'].removeClass("loading");
    }
};
