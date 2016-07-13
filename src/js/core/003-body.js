$pjs.director._drawBody = function() {
    $pjs.divs['body-container'] = $('<div class="pjs-body-container" />').appendTo($pjs.divs['main']);
    $pjs.divs['body'] = $('<div class="pjs-body" />').appendTo($pjs.divs['body-container']);
    $('<div style="clear: both;" />').appendTo($pjs.divs['main']);

};

$pjs.director._drawFooter = function() {
    $pjs.divs['footer-container'] = $('<div class="pjs-footer-container" />').appendTo($pjs.divs['main']);
    $pjs.divs['footer'] = $('<div class="pjs-footer">&copy; ARV Kl&eacute;rix 2016</div>').appendTo($pjs.divs['footer-container']);
};
