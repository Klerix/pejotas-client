var dict = {
  "r:saber": { "icon": "ra-book", "name": "Rasgo: Saber" },
  "r:lengua": { "icon": "ra-speech-bubbles", "name": "Rasgo: Lenguaje" },

  "a:ligera": { "icon": "ra-knight-helmet", "name": "Aptitud: Armadura Ligera" },
  "a:pesada": { "icon": "ra-helmet", "name": "Aptitud: Armadura Pesada" },
  "a:tunica": { "icon": "ra-vest", "name": "Aptitud: T&uacute;nica" },
  "a:escudo": { "icon": " ra-round-shield", "name": "Aptitud: Escudo" },
  "a:torre": { "icon": "ra-eye-shield", "name": "Aptitud: Escudo Torre" },

  "a:desarmado": { "icon": "ra-hand", "name": "Adiestramiento: Combate Desarmado" },
  "a:espada1m": { "icon": "ra-sword", "name": "Adiestramiento: Espada a una mano" },
  "a:espada": { "icon": "ra-relic-blade", "name": "Adiestramiento: Espada" },
  "a:hacha": { "icon": "ra-axe", "name": "Adiestramiento: Hacha" },
  "a:maza": { "icon": "ra-spiked-mace", "name": "Adiestramiento: Mazas a una mano" },
  "a:martillo": { "icon": "ra-large-hammer", "name": "Adiestramiento: Maza y martillo" },
  "a:lanza": { "icon": "ra-spear-head", "name": "Adiestramiento: Lanza" },
  "a:baston": { "icon": "ra-crystal-wand", "name": "Adiestramiento: Bastón" },
  "a:libro": { "icon": "ra-book", "name": "Adiestramiento: Libro" },
  "a:arrojadiza": { "icon": "ra-shuriken", "name": "Adiestramiento: Arrojadiza" },
  "a:arco": { "icon": "ra-crossbow", "name": "Adiestramiento: Arcos y Ballestas" },
  "a:instrumento": { "icon": "ra-ocarina", "name": "Adiestramiento: Instrumento" },
  "a:armafuego": { "icon": "ra-musket", "name": "Adiestramiento: Arma de Fuego" },
  "a:secundaria": { "icon": "ra-crossed-swords", "name": "Adiestramiento: Arma Secundaria" },
  "a:divina": { "icon": "ra-flaming-trident", "name": "Adiestramiento: Arma Divina" },

  "NR": { "icon": "ra-diamond", "name": "Nivel de Riqueza" },
  "NS": { "icon": "ra-pyramids", "name": "Nivel de Suministros" },

  "moral": { "icon": "ra-horn-call", "name": "Afecta a la moral" },
  "miedo": { "icon": "ra-skull", "name": "Causa miedo" },

  "sanar": { "icon": "ra-health", "name": "Sanar" },
  "inducir": { "icon": "ra-frozen-arrow", "name": "Esta habilidad induce da&ntilde;o elemental en un arma" },
  "inmune": { "icon": "ra-fire-shield", "name": "Inmunidad" },
  "esquiva": { "icon": "ra-player-dodge", "name": "Esquiva" },
  "sigilo": { "icon": "ra-hood", "name": "Sigilo" },
  "detectar": { "icon": "ra-eyeball", "name": "Deteci&oacute;n" },
  "autodano": { "icon": "ra-cut-palm", "name": "Causa da&ntilde;os al usuario" },
  "disipar": { "icon": "ra-x-mark", "name": "Disipa magia y efectos" },

  "bendicion": { "icon": "ra-health-increase", "name": "Causa bendici&oacute;n" },
  "maldicion": { "icon": "ra-health-decrease", "name": "Causa maldici&oacute;n" },
  "sellado": { "icon": "ra-speech-bubble", "name": "Causa sellado" },
  "aturdido": { "icon": "ra-broken-skull", "name": "Causa aturdido" },
  "paralizado": { "icon": "ra-bear-trap", "name": "Causa paralizado" },
  "derribado": { "icon": "ra-anchor", "name": "Causa derribado" },
  "despedido": { "icon": "ra-splash", "name": "Causa despedido" },
  "cegado": { "icon": "ra-bleeding-eye", "name": "Causa cegado" },
  "rompe-escudos": { "icon": "ra-cracked-shield", "name": "Rompe escudos" },

  "doble": { "icon": "ra-bomb-explosion", "name": "Doble" },
  "triple": { "icon": "ra-defibrilate", "name": "&iexcl;TRIPLE!" },

  "dirigido": { "icon": "ra-targeted", "name": "Habilidad dirigida" },
  "personal": { "icon": "ra-player", "name": "Personal: solo afecta al usuario" },

  "e:fuego": { "icon": "ra-small-fire", "name": "Elemento fuego" },
  "e:hielo": { "icon": "ra-snowflake", "name": "Elemento hielo" },
  "e:rayo": { "icon": " ra-lightning-bolt", "name": "Elemento rayo" },
  "e:tierra": { "icon": "ra-emerald", "name": "Elemento tierra" },
  "e:viento": { "icon": "ra-fluffy-swirl", "name": "Elemento viento" },
  "e:luz": { "icon": "ra-feather-wing", "name": "Elemento luz" },
  "e:oscuridad": { "icon": "ra-dragon-wing", "name": "Elemento oscuridad" },
  "e:elemental": { "icon": "ra-radial-balance", "name": "Elemento fuego, hielo, rayo, tierra o viento" },
};

module.exports = function(efectos) {
  if (efectos) {
    _.each(dict, function(v, k) {
      efectos = efectos.replace(k, '<i title="' + v.name + '" class="pjs-effects__icon ra ' + v.icon + '" data-toggle="tooltip" data-placement="left"></i>');
    });

    return efectos;
  } else {
    return "";
  }
};
