var ClassCollection = require('../../collections/ClassCollection');
var ArchetypeCollection = require('../../collections/ArchetypeCollection');
var ClassItemView = require('../class/ClassItemView');

module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  regions: {
    classes: '.skill__availability'
  },

  events: {
    'click .list-link': function() {
      $pjs.navigate(this.model.endpoint + '/');
    },

    'click .pjs-skill': function() {
      $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.skill_id);
    }
  },

  onRender: function() {
    var col;
    if (this.model.attributes.classes) {
      col = new ClassCollection(this.model.attributes.classes);
    } else {
      col = new ArchetypeCollection(this.model.attributes.archetypes);
    }
    $pjs.show(this.getRegion("classes"), new ClassItemView({ collection: col }));
  }
});
