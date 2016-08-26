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
    eventLabel: '.char__event-label',
    afterEvent: '.char__after-event',

    archetypes: '.char__archetype',
    archetypesLabel: '.char__archetype-label',

    class: '.char__class',
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
    //$pjs.navigate('chars/' + url, { trigger: false, replace: true });

  },

  onAttach: function() {
    this.populateList(this.ui.event, this.data.eventsCol);
    this.setEvent(this.char.eventId);

    $('select').select2({
      templateResult: this.selectFormat,
      templateSelection: this.selectFormat,
      minimumResultsForSearch: Infinity
    });

  },

  selectFormat: function(data) {
    if (!data.id) return data.text;
    var img = $(data.element).data("thumbnail");
    if (img) {
      return $('<span><img src="' + img + '" class="pjs-icon pjs-icon-big" /> ' + data.text + '</span>');
    } else {
      return data.text;
    }
  },

  populateList: function(list, col) {
    list.empty();

    _.each(col.models, function(v) {
      var $el = $('<option />')
        .attr("endpoint", col.endpoint)
        .attr("value", v.attributes.id)
        .text(v.attributes.name)
        .data("thumbnail", v.attributes.custom_logo || 'images/' + col.endpoint + '/' + slugify(v.attributes.name) + '.png')
        .on('click', this.optionSelected.bind(this));

      $el.appendTo(list);
    }.bind(this));

  },

  optionSelected: function(e) {
    console.log(e)
    var el = $(e.currentTarget);

    switch (el.attr("endpoint")) {
      case 'archetypes':
        this.setTraits()
        break;

      case 'classes':
        this.setSkills();
        break;

      case 'events':
        this.setEvent(this.ui.events.val())
        break;
    }
  },

  setEvent: function(id) {
    if (id) {
      if (!this.data.event || this.data.event.attributes.id != id) {
        $pjs.radio.request('events:setGlobal', id);

        this.ui.afterEvent.show();
        this.updateUrl({ eventId: id });

        this.data.event = new EventModel({ id: id });
        $.when(this.data.event.fetch($pjs.cache)).then(function() {

          this.populateList(this.ui.archetypes, new ArchetypeCollection(this.data.event.attributes.archetypes));
          this.setTraits();

          this.populateList(this.ui.class, new ClassCollection(this.data.event.attributes.classes));
          this.setSkills();

        }.bind(this));

      }
    } else {
      this.ui.afterEvent.hide();
    }
  },

  setTraits: function() {
    var id = this.ui.archetypes.val();

    this.updateUrl({ archetypeId: id });
    this.getRegion("traits").empty();

    if (id) {
      var content = this.ui.archetypes.find('[archetypes="' + id + '"]').html();
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
      var content = this.ui.class.find('[classes="' + id + '"]').html();
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
