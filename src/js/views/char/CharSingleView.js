var ArchetypeModel = require('../../models/ArchetypeModel');
var ClassModel = require('../../models/ClassModel');
var EventModel = require('../../models/EventModel');
var SkillItemView = require('../skill/SkillItemView');
var ClassCollection = require('../../collections/ClassCollection');
var ArchetypeCollection = require('../../collections/ArchetypeCollection');

module.exports = Marionette.View.extend({
  template: require('./templates/single.hbs'),

  serializeData: function() {
    return _.extend({}, this.char, this.data);
  },

  ui: {
    name: '.char__name',

    event: '.char__event',
    eventList: '.char__event-list',
    eventLabel: '.char__event-label',
    afterEvent: '.char__after-event',

    archetypes: '.char__archetype',
    archetypesList: '.char__archetype-list',
    archetypesLabel: '.char__archetype-label',

    class: '.char__class',
    classList: '.char__class-list',
    classLabel: '.char__class-label',
  },

  regions: {
    traits: '.char__traits',
    skills: '.char__skills'
  },

  events: {
    'change @ui.name': 'nameChanged',

    'click @ui.eventLabel': function() {
      $pjs.navigate('events/' + ((this.char.eventId) ? this.char.eventId : ''));
    }

  },

  updateUrl: function(char) {
    this.char = _.extend(this.char, char);
    var url = $pjs.radio.request('chars:encode', this.char);
    $pjs.navigate('chars/' + url, { trigger: false, replace: true });

  },

  onAttach: function() {
    this.populateList(this.ui.eventList, this.data.eventsCol);
    this.setEvent(this.char.eventId);
  },

  setEvent: function(id) {
    if (id) {
      if (!this.data.event || this.data.event.attributes.id != id) {
        $pjs.radio.request('events:setGlobal', id);

        this.ui.afterEvent.show();
        this.updateUrl({ eventId: id });
        this.data.event = new EventModel({ id: id });

        $.when(this.data.event.fetch($pjs.cache)).then(function() {
          this.ui.event.text(this.data.event.attributes.name);

          this.populateList(this.ui.archetypesList, new ArchetypeCollection(this.data.event.attributes.archetypes));
          this.setTraits();

          this.populateList(this.ui.classList, new ClassCollection(this.data.event.attributes.classes));
          this.setSkills();
        }.bind(this));
      }
    } else {
      this.ui.afterEvent.hide();
    }
  },

  populateList: function(list, col) {
    list.empty();

    _.each(col.models, function(v) {
      var $el = $('<a/>')
        .addClass("linkable dropdown-item")
        .attr(col.endpoint, v.attributes.id)
        .on('click', this.optionSelected.bind(this));

      var url = 'images/' + col.endpoint + '/' + slugify(v.attributes.name) + '.png';
      if (v.attributes.custom_logo) url = v.attributes.custom_logo;
      $('<img />')
        .attr("title", v.attributes.name)
        .attr("src", url)
        .appendTo($el);

      if (!v.attributes.custom_logo) $el.append(" " + v.attributes.name);

      $el.appendTo(list);
    }.bind(this));

  },

  optionSelected: function(e) {
    var el = $(e.currentTarget);
    if (el.attr('archetypes')) {
      this.ui.archetypes.val(el.attr('archetypes'));
      this.setTraits()
    } else if (el.attr('classes')) {
      this.ui.class.val(el.attr('classes'));
      this.setSkills();
    } else if (el.attr('events')) {
      this.ui.event
        .val(el.attr('events'));
      this.setEvent(el.attr('events'))
    }
  },

  setTraits: function() {
    var id = this.ui.archetypes.val();

    this.updateUrl({ archetypeId: id });
    this.getRegion("traits").empty();

    if (id) {
      var content = this.ui.archetypesList.find('[archetypes="' + id + '"]').html();
      this.ui.archetypes.html(content);

      var model = new ArchetypeModel({ id: id });
      $pjs.show(this.getRegion("traits"), new SkillItemView(), { model: model });
    } else {
      this.ui.archetypes.html("Arquetipo...");
      this.getRegion("traits").$el.html("<p>Elige un arquetipo...</p>");
    }
  },

  setSkills: function() {
    var id = this.ui.class.val();

    this.updateUrl({ classId: id });
    this.getRegion("skills").empty();

    if (id) {
      var content = this.ui.classList.find('[classes="' + id + '"]').html();
      this.ui.class.html(content);

      var model = new ClassModel({ id: id });
      $pjs.show(this.getRegion("skills"), new SkillItemView(), { model: model });
    } else {
      this.ui.class.html("Clase...");
      this.getRegion("skills").$el.html("<p>Elige una clase...</p>");
    }

  },

  nameChanged: function() {
    this.updateUrl({ name: this.ui.name.val() });
  }

});
