var dict = {
  "Pasiva": { "icon": "ra-cycle" },
  "Activa (Infinita)": { "icon": "ra-recycle" },
  "Activa (1/Escena)": { "icon": "ra-hourglass" },
  "Activa (1/Ciclo)": { "icon": "ra-stopwatch" },
  "Activa (1/Partida)": { "icon": "ra-moon-sun" },
};

module.exports = function(type) {
  if (type) {
    var v = dict[type];
    if (v) {
      return '<i class="pjs-effects__icon ra ' + v.icon + '" data-toggle="tooltip" data-placement="left"></i> ' + type;
    } else {
      return type;
    }
  } else {
    return "";
  }
};
