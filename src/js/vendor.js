window.jQuery = window.$ = require('jquery')
window.Tether = require('tether')
require('bootstrap')

// jQuery cache
window.$.ajaxSetup({
  cache: process.env.NODE_ENV === 'production'
})
