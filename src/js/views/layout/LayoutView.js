var BaseView = require('../BaseView');

var LayoutView = BaseView.extend({

    template: require('./templates/layout.hbs'),
    el: 'div',

    events: {
        'click .pjs-head__brand': function() {
            $pjs.router.navigate('eventos/', { trigger: true })
        },
    },

    initialize: function() {
        this.model.set({ version: $pjs.VERSION, logo: this.randomLogo() });
    },

    randomLogo: function() {
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

});

module.exports = LayoutView;
