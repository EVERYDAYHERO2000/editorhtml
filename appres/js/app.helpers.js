"use strict";
$(function () {
  app.f.setHelpers = function () {
    var $documents = app.e.$documents;
    var $documents__content = app.e.$documents__content;
    var $selectetElement = app.e.$selectetElement;
    var $helpers = app.e.$helpers = $('<div class="helpers"></div>');
    var $helpers__virtualbody = app.e.$helpers__virtualbody = $('<div class="helpers__virtualbody"></div>');

    $helpers.append($helpers__virtualbody);
    $documents.append($helpers);


    $documents__content.on('mouseup', function (e) {
      $selectetElement = ($(e.target).is('.editable')) ? $(e.target) : $(e.target).parents('.editable').first();

      //app.f.slectElement( $selectetElement );

      $('#sidebarTabs-layers').find('li').each(function () {
        if ($(this).data('node')[0] === $selectetElement[0]) {
          //console.log($(this).data('node')[0],$(this)[0])
          $(this).find('div').first().mouseup();
        }

      });

    });

    $documents__content.on('scroll', function() {
      $helpers.scrollTop( $(this).scrollTop() );
      $helpers.scrollLeft( $(this).scrollLeft() );
    });
    
    function virtualbodySizeDetector() {
      
      
      if ($documents__content.outerWidth() !== $helpers__virtualbody.outerWidth() || 
          $documents__content.outerHeight() !== $helpers__virtualbody.outerHeight() ) {
        
        
        $helpers__virtualbody.css({
          width : $documents__content.outerWidth() + 'px',
          height: $documents__content.outerHeight() + 'px'
        })
        
      }
      setTimeout(virtualbodySizeDetector, 500);
    }

    virtualbodySizeDetector();
    
  }

  app.f.slectElement = function (elem) {

    var $documents__content = app.e.$documents__content;
    var $selectetElement = app.e.$selectetElement = elem;
    var $helpers = app.e.$helpers;
    var $helpers__virtualbody = app.e.$helpers__virtualbody;

    var $helpers__box = $('<div class="helpers__box"></div>');
    var selectedRect = $selectetElement[0].getBoundingClientRect();
    var helpersRect = $helpers[0].getBoundingClientRect();

    $helpers__virtualbody.html('').append($helpers__box);
    $helpers__box.css({
      width: $selectetElement.outerWidth() + 'px',
      height: $selectetElement.outerHeight() + 'px',
      left: $helpers.scrollLeft() + selectedRect.left + 'px',
      top: $helpers.scrollTop() + selectedRect.top + 'px'
    })

  }

})