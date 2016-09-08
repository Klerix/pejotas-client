module.exports = Marionette.CollectionView.extend({
    childView: Marionette.View.extend({
        template: require('./templates/item.hbs'),

        events: {
            'click': function() {
                var charcode = $pjs.radio.request('chars:encode', {
                    eventId: this.model.attributes.id
                });

                $pjs.navigate('chars/' + charcode);
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
