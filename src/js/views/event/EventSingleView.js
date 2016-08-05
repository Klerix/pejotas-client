var ClassListView = require('../class/ClassListView');
var ClassCollection = require('../../collections/ClassCollection');

module.exports = Marionette.View.extend({
    template: require('./templates/single.hbs'),

    regions: {
        classes: {
            el: '.event__classes',
            replaceElement: true
        }
    },

    onRender: function() {
        var col = new ClassCollection();
        col.add(this.model.attributes.classes);

        var view = new ClassListView({ collection: col });
        this.showChildView("classes", view);
    }
});
