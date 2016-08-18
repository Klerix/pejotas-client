var TraitCollection = require('../../collections/TraitCollection');
var SkillCollection = require('../../collections/SkillCollection');

module.exports = Marionette.CollectionView.extend({
  childView: Marionette.View.extend({
    template: require('./templates/item.hbs'),

    events: {

      'click .pjs-skill': function() {
        $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.id);
      }
    },

    ui: {
      box: '.pjs-skill'
    },

    onRender: function() {
      this.ui.box.popover({
        placement: "bottom",
        trigger: "hover",
        content: require('./templates/popover.hbs')(this.model.attributes),
        html: true,
        template: require('../templates/popover_template.hbs')(),
        container: '#app'
      });
    },

    onBeforeDetach: function() {
      this.ui.box.popover('dispose');
    }
  }),


  onBeforeRender: function() {
    if (!this.collection && this.model) {
      if (this.model.endpoint == "archetypes") {
        this.collection = new TraitCollection(this.model.attributes.traits);
      } else if (this.model.endpoint == "classes") {
        this.collection = new SkillCollection(this.model.attributes.skills);
      }
    }
  },


});
