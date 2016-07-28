var EventItemView = require('./EventItemView');

module.exports = Marionette.View.extend({
    template: require('./templates/list.hbs'),

    regions: {
        wrapper: ".body__wrapper"
    },

    onRender: function() {
        var view = new Marionette.CollectionView({
            childView: EventItemView,
            collection: this.collection
        });

        this.showChildView("wrapper", view);
    }
});
