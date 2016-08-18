module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  events: {
    'click .list-link': function() {
      $pjs.navigate(this.model.endpoint + '/');
    },

    'click .pjs-skill': function() {
      $pjs.navigate(this.model.endpoint + '/' + this.model.attributes.skill_id);
    },

    'click .pjs-class': function(e) {
      var el = $(e.currentTarget);
      var aid = el.attr("aid");
      if (aid) {
        $pjs.navigate('archetypes/' + aid);
      } else {
        var cid = el.attr("cid");
        $pjs.navigate('classes/' + cid);
      }
    }
  }
});
