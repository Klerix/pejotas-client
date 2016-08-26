var ClassListView = require('../class/ClassListView');
var ClassCollection = require('../../collections/ClassCollection');
var ArchetypeCollection = require('../../collections/ArchetypeCollection');

module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  ui: {
    archetypes: '.event__archetypes',
    classes: '.event__classes',
  },

  regions: {
    archetypes: '.archetypes__wrapper',
    classes: '.classes__wrapper',
  },

  events: {
    'click .list-link': function() {
      $pjs.navigate(this.model.endpoint + '/');
    },

    'click .pjs__create-buton': function() {
      var charcode = $pjs.radio.request('chars:encode', {
        eventId: this.model.attributes.id
      });

      $pjs.navigate('chars/' + charcode);
    }
  },

  onRender: function() {
    $pjs.radio.request('events:setGlobal', this.model.attributes.id);

    if (this.model.attributes.archetypes.length) {
      var acol = new ArchetypeCollection(this.model.attributes.archetypes);
      $pjs.show(this.getRegion("archetypes"), new ClassListView({ collection: acol }))
    } else {
      this.ui.archetypes.hide();
    }

    if (this.model.attributes.classes.length) {
      var ccol = new ClassCollection(this.model.attributes.classes);
      $pjs.show(this.getRegion("classes"), new ClassListView({ collection: ccol }))
    } else {
      this.ui.classes.hide();
    }

  }
});
