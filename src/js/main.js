var Pejotas = require('./Pejotas')

// extend jquery
$.fn.pejotas = function() {
    window.$pjs = new Pejotas({ region: this.selector });
    return $pjs.start();
}
