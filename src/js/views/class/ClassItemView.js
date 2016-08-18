module.exports = Marionette.CollectionView.extend({
  childView: Marionette.View.extend({
    template: require('./templates/item.hbs'),

    events: {
      'click .btn': function(e) {
        e.stopPropagation()
        var charcode = $pjs.radio.request('chars:encode', {
          classId: this.model.attributes.id
        });

        $pjs.navigate('chars/' + charcode);
      },

      'click .pjs-class': function() {
        $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.id);
      },


    },

    onRender: function() {
      //this.ui.box.tooltip();
    },

    onBeforeDetach: function() {
      //this.ui.box.tooltip('dispose');
    }
  })
});
