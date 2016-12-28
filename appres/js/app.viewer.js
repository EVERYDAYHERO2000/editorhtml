"use strict";
$(function () {
  app.f.setViewer = function () {
    var $documents = app.e.$documents;
    $documents.append(app.e.$documents__browser);
    
  }
/*
  app.f.slectElement = function (elem) {

    var $documents__content = app.e.$documents__content;
    var $selectetElement = app.e.$selectetElement = elem;
    var $helpers = app.e.$helpers;
    
    
    
    $documents__content.find('.selected').removeClass('selected');
    elem.addClass('selected');
    $documents__content.find('.ui-resizable').resizable('destroy');
    
    elem.resizable({
      handles: 'all'
    }).rotatable({
      otationCenterX: 50.0,
      rotationCenterY: 50.0,
      enable : true,
      snap : false,
      angle: 0,
      wheelRotate: false,
      start: function (event, ui) {
        
      },
      rotate: function (event, ui) {
        
      },
      // Callback fired on rotation end.
      stop: function (event, ui) {
        
      },
    });
   
  } */

});