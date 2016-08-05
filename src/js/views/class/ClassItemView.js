module.exports = Marionette.CollectionView.extend({
  childView: Marionette.View.extend({
    template: require('./templates/item.hbs'),

    className: 'pjs-box pjs-class linkable',

    events: {
      'click': function() {
        var charcode = $pjs.radio.request('char:encode', { class: this.model.attributes.id });

        $pjs.navigate('chars/' + charcode);
      }
    },

    onRender: function() {
      //this.ui.box.tooltip();
    },

    onBeforeDetach: function() {
      //this.ui.box.tooltip('dispose');
    }
  }),

  collection: this.collection
});
