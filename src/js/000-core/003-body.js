$pjs.director._drawBody = function() {
    $pjs.divs['body-container'] = $('<div class="pjs-body-container" />').appendTo($pjs.divs['main']);
    $pjs.divs['body'] = $('<div class="pjs-body" />').appendTo($pjs.divs['body-container']);
};
