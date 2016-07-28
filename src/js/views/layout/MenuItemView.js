module.exports = Marionette.View.extend({
    tagName: 'menuitem',
    template: require('./templates/menuItem.hbs'),

    events: {
        'mouseover menuitem': function() {
            $('.menu__section-name').text(this.model.attributes.name);
        },
        'mouseout menuitem': function() {
            $('.menu__section-name').text('');
        },
    }
});
