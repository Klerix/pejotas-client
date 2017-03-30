window.jQuery = window.$ = require('jquery')
window.Tether = require('tether')
require('bootstrap')
require('select2')

// jQuery cache
window.$.ajaxSetup({
  cache: process.env.NODE_ENV === 'production'
})
