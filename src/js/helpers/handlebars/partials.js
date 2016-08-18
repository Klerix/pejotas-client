var Handlebars = require("hbsfy/runtime");

Handlebars.registerPartial('skill-icon', require('../../views/skill/partials/icon.hbs'));
Handlebars.registerPartial('skill-letany', require('../../views/skill/partials/letany.hbs'));
Handlebars.registerPartial('skill-box', require('../../views/skill/partials/box.hbs'));

Handlebars.registerPartial('class-box', require('../../views/class/partials/box.hbs'));
Handlebars.registerPartial('class-icon', require('../../views/class/partials/icon.hbs'));

Handlebars.registerPartial('effects', require('../../views/partials/effects.hbs'));
Handlebars.registerPartial('collapser', require('../../views/partials/collapser.hbs'));
