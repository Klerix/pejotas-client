var Marionette = require('backbone.marionette')

var SkillsController = require('../controllers/SkillsController')

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'skills(/)': 'list',
    'events/:eid/classes/:cid/skills/:id(/)': 'single'
  },

  controller: new SkillsController()
})
