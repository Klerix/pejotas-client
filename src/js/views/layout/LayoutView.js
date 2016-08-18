var MenuView = require('./MenuView');

module.exports = Marionette.View.extend({

  template: require('./templates/layout.hbs'),

  regions: {
    head: '.pjs__head',
    body: '.pjs__body',
    foot: '.pjs__foot',
    menu: {
      el: '.pjs-head__menu',
      replaceElement: true
    },
  },

  ui: {
    brand: '.pjs-head__brand'
  },

  events: {
    'click @ui.brand': function() {
      $pjs.navigate('events/');
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

    var view = new MenuView({
      collection: new Backbone.Collection([
        { name: "Eventos", icon: 'ra ra-wooden-sign', route: '/' },
        { name: "Listar Habilidades", icon: 'ra ra-spades-card', route: '/skills/' },
        { name: "Listar Rasgos", icon: 'ra ra-hearts-card', route: '/traits/' },
        { name: "Crear Personaje", icon: 'ra ra-player', route: 'chars/load/' }
      ])
    })

    this.showChildView("menu", view);
  }

});
