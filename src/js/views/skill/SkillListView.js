var SkillItemView = require('./SkillItemView');

module.exports = Marionette.View.extend({
  template: require('./templates/list.hbs'),

  regions: {
    wrapper: ".body__wrapper"
  },

  serializeData: function() {
    return {
      title: (this.collection.endpoint == "skills") ? "Habilidades" : "Rasgos"
    };
  },

  onRender: function() {
    var view = new SkillItemView({ collection: this.collection });
    this.showChildView("wrapper", view);
  }
});
