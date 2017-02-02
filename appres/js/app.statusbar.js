"use strict"; 
$(function(){
  app.f.setStatusBar = function(){
  var $statusbar = app.e.$statusbar;
  var $documents__browser = app.e.$documents__browser;
  var $documents__content = app.e.$documents__content;  
  var $helpers = app.e.$helpers;  
    
  var $zoomSlider = $('<div class="statusbar__zoomSlider"></div>');
  $statusbar.append($zoomSlider);
  $zoomSlider.slider({
    min: 1,
    max: 3,
    value: 2,
    step: 0.01,
    slide: function( event, ui ) {
      
      $documents__content.find('body').css({
        'zoom' : ui.value
      })
      $helpers.css({
        'zoom' : ui.value
      })
    }
  });
  }
});