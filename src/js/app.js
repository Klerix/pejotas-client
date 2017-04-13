require('../css')
require('./vendor')

var App = require('./Pejotas')

var app = new App()
app.start()

module.exports = app
