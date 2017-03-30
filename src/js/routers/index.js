// var CharsRouter = require('./CharsRouter')
var ClassesRouter = require('./ClassesRouter')
var EventsRouter = require('./EventsRouter')
var SkillsRouter = require('./SkillsRouter')
var TraitsRouter = require('./TraitsRouter')

module.exports = function () {
  return {
    // chars: new CharsRouter(),
    classes: new ClassesRouter(),
    events: new EventsRouter(),
    skills: new SkillsRouter(),
    traits: new TraitsRouter()
  }
}
