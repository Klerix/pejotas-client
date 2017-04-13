let lastUnique

module.exports = function (item, options) {
  if (lastUnique !== item && item) {
    lastUnique = item
    return options.fn(this)
  }
}
