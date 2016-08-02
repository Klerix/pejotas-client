module.exports = Marionette.CollectionView.extend({
    childView: Marionette.View.extend({
        template: require('./templates/item.hbs'),

        events: {
            "click .pjs-skill": function() {
                $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.id);
            }
        },

        ui: {
            box: '.pjs-skill'
        },

        onRender: function() {
            this.ui.box.popover({
                placement: "bottom",
                trigger: "hover",
                content: require('./templates/popover.hbs')(this.model.attributes),
                html: true,
                template: require('../templates/popover_template.hbs')()
            });
        },

        onBeforeDetach: function() {
            this.ui.box.popover('dispose');
        }
    }),
    collection: this.collection
});
