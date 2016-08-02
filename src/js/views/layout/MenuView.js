module.exports = Marionette.CollectionView.extend({
    childView: Marionette.View.extend({
        tagName: 'menuitem',
        className: 'pjs-menu__item',
        template: require('./templates/menuItem.hbs'),

        events: {
            'click': function() {
                $pjs.navigate(this.model.attributes.route);
            }
        },

        onRender: function() {
            this.$el.attr("title", this.model.attributes.name)
            this.$el.tooltip({ placement: 'bottom' });
        },

        onBeforeDetach: function() {
            this.$el.tooltip('dispose');
        }
    }),
    tagName: "menu",
    className: 'pjs-head__menu'
});
