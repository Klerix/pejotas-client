var Radio = require('backbone.radio')

module.exports = function (efectos) {
  if (efectos) {
    var words = Radio.channel('app').request('get:words').models

    words.forEach(function (v) {
      if (efectos.indexOf(v.get('name')) !== -1) {
        var el = '<i ' +
          'aria-hidden="true" ' +
          'data-toggle="tooltip" ' +
          'data-placement="left" ' +
          'title="' + v.get('description') + '" ' +
          'class="ra ' + v.get('class') + '"></i>'
        efectos = efectos.replace(v.get('name'), el)
      }
    })
  }
  return efectos
}
