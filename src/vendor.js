// jQuery
window.jQuery = window.$ = require('jquery');
$.ajaxSetup({ cache: false });

// Lo-dash
window._ = require('lodash');

// Backbone
window.Backbone = require('backbone');
Backbone.$ = $

// Tether
window.Tether = require('tether');

// Bootstrap
require('bootstrap/dist/js/bootstrap')

// Handlebars
window.Handlebars = require('handlebars');
