var md = require('showdown')

var rpgawesome = function () {
  return {
    type: 'lang',
    regex: /@@(\S*)/g,
    replace: '<i class="ra ra-$1" aria-hidden="true"></i>'
  }
}
var converter = new md.Converter({ extensions: [rpgawesome] })

module.exports = function (text) {
  return converter.makeHtml(text)
}
