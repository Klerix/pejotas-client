var BaseCollection = require('./BaseCollection')
var WordModel = require('../models/WordModel')

module.exports = BaseCollection.extend({
  model: WordModel,
  endpoint: 'words'
})
