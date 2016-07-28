var MenuItemView = require('./MenuItemView');

module.exports = Marionette.View.extend({

    template: require('./templates/layout.hbs'),

    regions: {
        head: '.pjs__head',
        body: '.pjs__body',
        foot: '.pjs__foot',
        menu: '.pjs-head__menu',
        menuItems: '.menu__items',
    },

    ui: {
        brand: '.pjs-head__brand'
    },

    events: {
        'click @ui.brand': function() {
            $pjs.navigate('eventos/')
        },
    },

    templateContext: {
        version: function() {
            return $pjs.VERSION
        },
        logo: function() {
            var logoItems = [
                "ra-player-thunder-struck",
                "ra-player-pyromaniac",
                "ra-falling",
                "ra-muscle-fat",
                "ra-hydra",
                "ra-wolf-howl",
                "ra-burning-meteor",
                "ra-hood",
                "ra-castle-emblem",
            ];
            return logoItems[Math.floor(Math.random() * logoItems.length)];
        }
    },

    onRender: function() {

        var view = new Marionette.CollectionView({
            childView: MenuItemView,
            tagName: "menu",
            collection: new Backbone.Collection([
                { name: "Inicio", icon: 'ra ra-wooden-sign', route: '/' },
                { name: "Listar Habilidades", icon: 'ra ra-spades-card', route: '/skills/' },
                { name: "Listar Rasgos", icon: 'ra ra-hearts-card', route: '/traits/' },
                { name: "Subir personaje", icon: 'ra ra-player-teleport', route: 'chars/upload/' }
            ])
        });

        this.showChildView("menuItems", view);
    }

});
