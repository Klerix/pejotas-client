// jQuery
window.jQuery = window.$ = require('jquery');
$.ajaxSetup({ cache: false });

// Lo-dash
window._ = require('lodash');

// Tether
window.Tether = require('tether');

// Backbone
window.Backbone = require('backbone');
Backbone.$ = $

// Marionette
window.Marionette = require('backbone.marionette')

// Bootstrap
require('bootstrap/dist/js/bootstrap')

// Handlebars
window.Handlebars = require('handlebars');

// slugify
window.slugify = require('url-slug');
