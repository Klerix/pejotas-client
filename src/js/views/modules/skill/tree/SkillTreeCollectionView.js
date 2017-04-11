var Marionette = require('backbone.marionette')

module.exports = Marionette.CollectionView.extend({
  childView: require('./SkillTreeView'),
  childViewOptions: function () {
    return {
      eventId: this.options.eventId,
      classId: this.options.classId
    }
  },

  emptyView: require('../../common/empty/EmptyView'),
  emptyViewOptions: function () {
    return {
      item: this.options.item || 'habilidades'
    }
  }
})
