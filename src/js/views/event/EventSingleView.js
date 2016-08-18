var ClassListView = require('../class/ClassListView');
var ClassCollection = require('../../collections/ClassCollection');
var ArchetypeCollection = require('../../collections/ArchetypeCollection');

module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  regions: {
    archetypes: '.archetypes__wrapper',
    classes: '.classes__wrapper',
  },

  onRender: function() {
    $pjs.radio.request('events:setGlobal', this.model.attributes.id);

    var acol = new ArchetypeCollection(this.model.attributes.archetypes);
    $pjs.show(this.getRegion("archetypes"), new ClassListView({ collection: acol }))

    var ccol = new ClassCollection(this.model.attributes.classes);
    $pjs.show(this.getRegion("classes"), new ClassListView({ collection: ccol }))

  }
});
