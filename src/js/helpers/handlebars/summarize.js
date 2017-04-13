var _ = require('lodash')
var md = require('./md')

module.exports = function (text) {
  var lines = text.split('\n\n')
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim()
    if (!_.startsWith(line, '*')) {
      return md(line)
    }
  }

  return text
}
