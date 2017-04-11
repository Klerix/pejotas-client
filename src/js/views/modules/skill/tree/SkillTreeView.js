var Radio = require('backbone.radio')

var SkillItemView = require('../list/SkillItemView')

module.exports = SkillItemView.extend({
  className: 'skill col-12 col-md-10',
  ui: {
    skill: '.card',
    icon: 'img.d-flex'
  },

  events: {
    'mouseup @ui.icon': 'onIconClick',

    'mouseup @ui.skill': function (e) {
      if (e.which === 2 || e.which === 4) {
        this.onIconClick(e)
      } else if (e.which < 2) {
        Radio.channel('char').trigger('skill:toggle', this.model.get('id'))
      }
    }
  },

  onIconClick: function (e) {
    Radio.channel('app').trigger(
      'link',
      '/events/' + this.options.eventId +
      '/classes/' + this.options.classId +
      '/' + this.model.endpoint + '/' + this.model.get('id'),
      e
    )
  },

  initialize: function () {
    this.model.on('change', this.render.bind(this))
  },

  onRender: function () {
    if (this.model.get('offset')) {
      this.$el.addClass('offset-md-' + this.model.get('offset'))
    }

    if (this.model.get('selected')) {
      this.$el.find('.card').addClass('skill--active')
    } else {
      this.$el.find('.card').removeClass('skill--active')
    }
  }
})
