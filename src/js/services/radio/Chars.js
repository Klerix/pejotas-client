var Base64 = require('./Base64');
var EventModel = require('../../models/EventModel');

var Chars = Marionette.Object.extend({

  channelName: 'services',

  radioRequests: {
    'char:encode': 'encode',
    'char:decode': 'decode'
  },

  encode: function(char) {
    var o = _.extend({ event: 0, class: 0, archetype: 0, skills: [], name: '' }, char);
    var text = Base64.fromInt(o.event) +
      '/' + Base64.fromInt(o.class) +
      '/' + Base64.fromInt(o.archetype) +
      '/' + _.join(_.map(o.skills, Base64.fromInt), '&') +
      '/' + o.name;

    console.log(text)

    return text;
  },

  decode: function(char) {
    var o = _.extend({ event: 0, class: 0, archetype: 0, skills: '', name: '' }, char);

    return {
      event: Base64.toInt(o.event),
      class: Base64.toInt(o.class),
      archetype: Base64.toInt(o.archetype),
      skills: _.map(_.split(o.skills, '&'), Base64.toInt),
      name: o.name
    };
  }

})

module.exports = new Chars;
