 module.exports = Marionette.Object.extend({
   channelName: 'services',

   radioRequests: {
     'events:setGlobal': 'setGlobalEvent',
     'events:getGlobal': 'getGlobalEvent'
   },

   setGlobalEvent: function(event) {
     this.event = event;
   },

   getGlobalEvent: function() {
     return this.event;
   }
 });
