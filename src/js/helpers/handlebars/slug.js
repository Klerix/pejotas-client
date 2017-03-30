const slug = require('url-slug')

module.exports = function (name, options) {
  if (name) {
    return slug(name, '-', 'lowercase')
  } else {
    return ''
  }
}
