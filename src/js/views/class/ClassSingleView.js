var SkillCollection = require('../../collections/SkillCollection');
var SkillItemView = require('../skill/SkillItemView');
var EventCollection = require('../../collections/EventCollection');
var EventItemView = require('../event/EventItemView');


module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  regions: {
    skills: '.skills__wrapper',
    events: '.events__wrapper',
  },

  onRender: function() {

    var scol = new SkillCollection(this.model.attributes.skills || this.model.attributes.traits);
    $pjs.show(this.getRegion("skills"), new SkillItemView({ collection: scol }));

    var ecol = new EventCollection(this.model.attributes.events);
    $pjs.show(this.getRegion("events"), new EventItemView({ button: "1", collection: ecol }));
  }
});
