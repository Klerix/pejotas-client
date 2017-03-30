var ArchetypeModel = require('../../../models/ArchetypeModel')
var ClassModel = require('../../../models/ClassModel')
var EventModel = require('../../../models/EventModel')
var SkillTreeView = require('../skill/SkillTreeView')
var ClassCollection = require('../../../collections/ClassCollection')
var ArchetypeCollection = require('../../../collections/ArchetypeCollection')

module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  chosenSkills: [],
  phs: 0,

  serializeData: function () {
    return _.extend({}, this.char, this.data)
  },

  ui: {
    name: '.char__name',

    event: '.char__event',
    eventLabel: '.char__event-label',
    afterEvent: '.char__after-event',

    archetypes: '.char__archetype',
    archetypesLabel: '.char__archetype-label',
    archetypesSection: '.char__archetypes-section',

    class: '.char__class',
    classLabel: '.char__class-label',
    classesSection: '.char__classes-section',

    phsCounter: '.char__phs-counter'
  },

  regions: {
    // traits: '.char__traits',
    skills: '.char__skills'
  },

  events: {
    'change @ui.name': function () {
      this.updateUrl({ name: this.ui.name.val() })
    },

    'change @ui.class': function () {
      this.chosenSkills = []
      this.updateUrl({ skillIds: [] })
      this.setClass()
    },

    'change @ui.archetypes': function () {
      this.setArchetype()
    },

    'click .action__event': function () {
      $pjs.navigate('events/')
    },

    /* Remove /events/ sections * /
    'click @ui.eventLabel': function() {
        $pjs.navigate('events/' + ((this.char.eventId) ? this.char.eventId : ''));
    },
    /**/

    'click @ui.classLabel': function () {
      $pjs.navigate('classes/' + ((this.char.classId) ? this.char.classId : ''))
    },

    'click @ui.archetypesLabel': function () {
      $pjs.navigate('archetypes/' + ((this.char.archetypeId) ? this.char.archetypeId : ''))
    },

    'click .pjs-skill': function (e) {
      var el = $(e.currentTarget)
      this.toggleSkill({
        id: parseInt(el.attr('sid')),
        phs: parseInt(el.attr('phs')),
        parent: parseInt(el.attr('parent')),
        el: el
      })
    }
  },

  onAttach: function () {
    this.ui.event.text(this.data.event.attributes.name)

    if (this.data.event.attributes.archetypes.length) {
      this.populateList(this.ui.archetypes, new ArchetypeCollection(this.data.event.attributes.archetypes))
      this.setArchetype(this.char.archetypeId)
    } else {
      this.ui.archetypesSection.hide()
      this.ui.classesSection
        .removeClass('col-md-6')
        .addClass('col-md-12')
    }

    if (this.data.event.attributes.classes.length) {
      this.populateList(this.ui.class, new ClassCollection(this.data.event.attributes.classes))
      this.setClass(this.char.classId)
    } else {
      this.ui.classesSection.hide()
    }

    $('select').select2({
      templateResult: this.selectFormat,
      templateSelection: this.selectFormat
    })
  },

  selectFormat: function (data) {
    if (!data.id) return data.text
    var img = $(data.element).data('thumbnail')
    if (img) {
      return $('<span><img src="' + img + '" class="pjs-icon pjs-icon-big" /> ' + data.text + '</span>')
    } else {
      return data.text
    }
  },

  populateList: function (list, col, selected) {
    list.empty()

    _.each(col.models, function (v) {
      var $el = $('<option />')
        .attr('endpoint', col.endpoint)
        .attr('value', v.attributes.id)
        .attr('selected', v.attributes.id == selected)
        .text(v.attributes.name)
        .data('thumbnail', 'images/' + col.endpoint + '/' + slugify(v.attributes.name) + '.png')
        .on('click', this.optionSelected.bind(this))

      $el.appendTo(list)
    }.bind(this))
  },

  optionSelected: function (e) {
    var el = $(e.currentTarget)

    switch (el.attr('endpoint')) {
      case 'archetypes':
        this.setArchetype(this.ui.archetypes.val())
        break

      case 'classes':
        this.setClass(this.ui.class.val())
        break
    }
  },

  setArchetype: function (id) {
    if (id) {
      this.ui.archetypes.val(id)
    } else {
      id = this.ui.archetypes.val()
    }

    this.updateUrl({ archetypeId: id })
  },

  setClass: function (id) {
    if (id) {
      this.ui.class.val(id)
    } else {
      id = this.ui.class.val()
    }

    this.updateUrl({ classId: id })
    this.getRegion('skills').empty()

    if (id) {
      var content = this.ui.class.find('[classes="' + id + '"]').html()
      this.ui.class.html(content)

      var region = this.getRegion('skills')
      var model = new ClassModel({ id: id })
      $pjs.show(region, new SkillTreeView(), { model: model }, function () {
        _.each(this.char.skillIds, function (v) {
          var el = region.$el.find('.pjs-box[sid="' + v + '"]')
          this.toggleSkill({
            id: parseInt(el.attr('sid')),
            phs: parseInt(el.attr('phs')),
            parent: parseInt(el.attr('parent')),
            el: el
          })
        }.bind(this))
        this.updateChar()
      }.bind(this))
    } else {
      this.ui.class.html('Clase...')
      this.getRegion('skills').$el.html('<p>Elige una clase...</p>')
    }
  },

  updateUrl: function (char) {
    this.char = _.extend(this.char, char)
    var url = $pjs.radio.request('chars:encode', this.char)

    $pjs.navigate('chars/' + url, { trigger: false, replace: true })
  },

  toggleSkill: function (skill) {
    if (_.find(this.chosenSkills, { id: skill.id })) {
      this.removeSkill(skill)
    } else {
      this.addSkill(skill)
    }

    this.updateUrl({ skillIds: _.map(this.chosenSkills, 'id') })
    this.updateChar()
  },

  addSkill: function (skill) {
    if (!skill.parent || _.find(this.chosenSkills, { id: skill.parent })) {
      this.chosenSkills.push(skill)

      skill.el.addClass('pjs-box--chosen')
    }
  },

  removeSkill: function (skill) {
    _.remove(this.chosenSkills, { id: skill.id })
    skill.el.removeClass('pjs-box--chosen')

    var child
    while (child = _.find(this.chosenSkills, { parent: skill.id })) {
      this.removeSkill(child)
    }
  },

  updatePHs: function () {
    var sum = 0
    sum = _.reduce(this.chosenSkills, function (result, value) {
      result += value.phs
      return result
    }, 0)

    this.ui.phsCounter.text(sum)
  },

  updateChar: function () {
    this.updatePHs()
  }

})
