var md = require('showdown')
var converter = new md.Converter()

module.exports = function (text) {
  return converter.makeHtml(text)
}
