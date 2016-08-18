var Base64 = require('../utils/Base64');

module.exports = Marionette.Object.extend({

  channelName: 'services',

  radioRequests: {
    'chars:encode': 'encode',
    'chars:decode': 'decode',
  },

  encode: function(char) {
    var o = _.extend({
      eventId: $pjs.radio.request('events:getGlobal'),
      classId: 0,
      archetypeId: 0,
      skillIds: [],
      name: ''
    }, char);

    var text = Base64.fromInt(o.eventId) +
      '/' + Base64.fromInt(o.classId) +
      '/' + Base64.fromInt(o.archetypeId) +
      '/' + _.join(_.map(o.skillIds, Base64.fromInt), '&') +
      '/' + o.name;

    return text;
  },

  decode: function(char) {
    var o = _.extend({ eventId: "0", classId: "0", archetypeId: "0", skillIds: '', name: '' }, char);

    return {
      eventId: Base64.toInt(o.eventId),
      classId: Base64.toInt(o.classId),
      archetypeId: Base64.toInt(o.archetypeId),
      skillIds: _.map(_.split(o.skillIds, '&'), Base64.toInt),
      name: o.name
    };
  }
});
