module.exports = Marionette.CollectionView.extend({
  childView: Marionette.View.extend({
    template: require('./templates/item.hbs'),

    ui: {
      box: '.pjs-class'
    },

    events: {
      'click .btn': function(e) {
        e.stopPropagation()
        var charcode = $pjs.radio.request('chars:encode', {
          classId: this.model.attributes.id
        });

        $pjs.navigate('chars/' + charcode);
      },

      'click @ui.box': function() {
        $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.id);
      },

    },

    onRender: function() {
      this.ui.box.popover({
        placement: "bottom",
        trigger: "hover",
        content: require('./templates/popover.hbs')(this.model.attributes),
        html: true,
        template: require('../templates/popover_template.hbs')(),
        container: '#app'
      });
    },

    onBeforeDetach: function() {
      this.ui.box.popover('dispose');
    }
  })
});
