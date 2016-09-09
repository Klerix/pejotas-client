var SkillCollection = require('../../collections/SkillCollection');

module.exports = Marionette.CollectionView.extend({
  childView: Marionette.View.extend({
    template: require('./templates/tree-item.hbs')
  }),

  serializeData: function() {
    return this.tree;
  },

  onBeforeRender: function() {
    // Order skills
    this.collection = new SkillCollection(this.model.attributes.skills);
    this.collection.treeSort();
  }

});
