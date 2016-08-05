module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  initialize: function(options) {
    this.char = options.char;
  },

  serializeData: function() {
    console.log(this.char)
    return this.char;
  },

  onRender: function() {
    console.log(this.char)
  }
});
