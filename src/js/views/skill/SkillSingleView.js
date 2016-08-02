module.exports = Marionette.View.extend({
    template: require('./templates/single.hbs'),

    events: {
        'click .link-back': function() {
            $pjs.navigate(this.model.endpoint + '/');
        },

        'click .pjs-skill': function() {
            $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.skill_id);
        }
    }
});
