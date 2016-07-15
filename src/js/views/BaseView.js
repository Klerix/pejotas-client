var BaseView = Backbone.View.extend({

    model: new Backbone.Model,

    render: function() {
        console.log(arguments)
        if (this.collection) {
            this.$el.html(this.template(this.collection.toJSON()));
        } else {
            this.$el.html(this.template(this.model.toJSON()));
        }
        return this
    }

});

module.exports = BaseView;
