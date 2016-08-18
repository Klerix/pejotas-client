module.exports = Marionette.CollectionView.extend({
  childView: Marionette.View.extend({
    template: require('./templates/item.hbs'),

    events: {
      'click': function() {
        $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.id);
      }
    },

    ui: {
      box: '.pjs-box'
    },

    onRender: function() {
      this.ui.box.tooltip();
    },

    onBeforeDetach: function() {
      this.ui.box.tooltip('dispose');
    }
  })
});
