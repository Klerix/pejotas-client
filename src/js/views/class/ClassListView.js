var ClassItemView = require('./ClassItemView');

module.exports = Marionette.View.extend({
    template: require('./templates/list.hbs'),

    regions: {
        wrapper: ".body__wrapper"
    },

    onRender: function() {
        var view = new ClassItemView({ collection: this.collection });
        this.showChildView("wrapper", view);
    }
});
