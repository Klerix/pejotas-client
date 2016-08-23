var Handlebars = require("hbsfy/runtime");
var translateEffects = require('../../utils/translate-effects');
var translateType = require('../../utils/translate-type');

Handlebars.registerHelper('unique', function(item, options) {
  if ($pjs._hbsUnique != item && item) {
    $pjs._hbsUnique = item;
    return options.fn(this);
  }
});

Handlebars.registerHelper('remove-diacritics', function(name, options) {
  if (name) {
    return slugify(name, '-', 'lowercase');
  } else {
    return "";
  }
});


Handlebars.registerHelper('iconize-effects', function(name) {
  return translateEffects(name);
});


Handlebars.registerHelper('iconize-type', function(type) {
  return translateType(type);
});

Handlebars.registerHelper('summ', function(text) {
  var lines = text.split("\n\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!_.startsWith(line, "<p><em>")) {
      return line;
    }
  }

  return text;
});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});
