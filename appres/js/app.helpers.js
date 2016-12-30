"use strict";
$(function () {
  app.f.setHelpers = function () {
    
    var $documents = app.e.$documents;
    var $documents__content = app.e.$documents__content;
    var $selectedElement = app.e.$selectedElement;
    var $documents__browser = app.e.$documents__browser;
    var $helpers = app.e.$helpers = $('<div class="helpers"></div>');
    
    $documents.append($helpers);

    
    $(window).on('resize', function(){
     // if ($selectedElement){
        app.f.virtualbodySizeDetector();
      //}
    });
    
    /*
      Выбираем объект из элементов под курсором с классом .editable
    */
    $documents__content.on('mouseup', function(e){
      
      $selectedElement = ( $(e.target).is('.editable') ) ? $(e.target) : $(e.target).parents('.editable').first();
      app.f.selectLayer( $selectedElement );
      app.f.slectElement( $selectedElement );
      
    });
    /*
    $helpers.on('click', function (e) {
      if (!$(e.target).is('.ui-resizable-handle, .ui-rotatable-handle')) {
        console.clear();
        var elems = $documents__content.find('.editable').map(function (i, el) {
          var rect = el.getBoundingClientRect()
          
          
          if (
            e.pageY > rect.top &&
            e.pageY < rect.top + rect.height &&
            e.pageX > rect.left &&
            e.pageX < rect.left + rect.width
          ) {
            return $(this);
          }

        }).get().reverse();

        app.f.selectLayer( $(elems[0]) );
        app.f.slectElement( $(elems[0]) );
      }
    })
   */ 
    app.f.virtualbodySizeDetector();
  }

  app.f.virtualbodySizeDetector = function () {
    
    var $documents__browser = app.e.$documents__browser;
    var $documents__content = app.e.$documents__content;
    var $selectedElement = app.e.$selectedElement;
    var $helpers = app.e.$helpers;
    

    //if ($helpers.attr('.helpers_lock') !== 'false') {
    //  if ($documents__content.outerWidth() !== $helpers.outerWidth() ||
    //    $documents__content.outerHeight() !== $helpers.outerHeight()) {
        
        if ($selectedElement) app.f.selectLayer($selectedElement);      
        
        
        $documents__browser.css({
          'width' : $documents__content.outerWidth() + 'px',
          'height': $documents__content.outerHeight() + 'px',
        })
        
        $helpers.css({
          'width' : $documents__browser.outerWidth() + 'px',
          'height': $documents__browser.outerHeight() + 'px',
        })
        
        console.log($documents__browser.css('width'),$helpers.css('width') )
        
        
        /*console.log($helpers__virtualbody[0])
        console.log('helper W: ' + $helpers__virtualbody.css('width'));
        console.log('helper H: ' + $helpers__virtualbody.css('height'));
        console.log($documents__content[0])
        console.log('doc W: ' + $documents__content.outerWidth());
        console.log('doc H: ' + $documents__content.outerHeight());
        console.log('')
        */
        
        
    //  }
    //}
    //setTimeout(virtualbodySizeDetector, 500);
  }

  app.f.slectElement = function (elem) {

    var $documents__content = app.e.$documents__content;
    var $selectedElement = app.e.$selectedElement = elem;
    var $helpers = app.e.$helpers;
    
    
    var $helpers__box = $('<div class="helpers__box"></div>');
    var transform = $selectedElement.css('transform');
    $selectedElement.css({
      'transform' : 'none'
    });
    
    var selectedRect = $selectedElement[0].getBoundingClientRect();
    

    
    
    $helpers.html('').append($helpers__box);

    //
    
    //

    $helpers__box.css({
      width: selectedRect.width + 'px',
      height: selectedRect.height + 'px',
      //left: $helpers.scrollLeft() + selectedRect.left + 'px',
      //top: $helpers.scrollTop() + selectedRect.top + 'px',
      left: $helpers.scrollLeft() + selectedRect.left + 'px',
      top: $helpers.scrollTop() + selectedRect.top + 'px',
      transform: transform
    }).draggable({
      scroll: false,
      start: function (event, ui) {
        updateSelectedElement(event, ui);

      },
      drag: function (event, ui) {
        updateSelectedElement(event, ui);

      },
      stop: function (event, ui) {
        updateSelectedElement(event, ui);
        app.f.virtualbodySizeDetector();
      }

    }).resizable({
      minWidth: 0,
      minHeight: 0,
      
      handles: 'all',
      start: function (event, ui) {

        updateSelectedElement(event, ui)
      },
      stop: function (event, ui) {
        updateSelectedElement(event, ui);
        app.f.virtualbodySizeDetector();
      },
      resize: function (event, ui){
        
        updateSelectedElement(event, ui);
      }
    }).rotatable({
      otationCenterX: 50.0,
      rotationCenterY: 50.0,
      enable: true,
      snap: false,
      angle: 0,
      wheelRotate: false,
      start: function (event, ui) {
    
        updateSelectedElement(event, ui)
      },
      rotate: updateSelectedElement,
      stop: function (event, ui) {

        updateSelectedElement(event, ui);
      },
    });
    
    $selectedElement.css({
      'transform' : transform
    });
    

    function updateSelectedElement(event, ui) {

      var top, bottom, left, right, width, height;
      var $parent = $selectedElement.parents();
      var transform = $helpers__box.css('transform');
      var selectedHelperPosition = $helpers__box.position();

      $helpers__box.css({
        'transform' : 'none'
      })

      var l = [0],
        lmax, t = [0],
        tmax;
      $parent.each(function (i, e) {
        if ($(e).css('position') !== 'static') {
          l.push( $(e).offset().left );
          t.push( $(e).offset().top );
        }
      }).get();


      lmax = Math.max.apply(Math, l);
      tmax = Math.max.apply(Math, t);




      top = selectedHelperPosition.top - tmax; // + $documents__content.scrollTop();
      left = selectedHelperPosition.left - lmax; // + $documents__content.scrollLeft();
      //top = parseInt( $helpers__box.css('top') ) - tmax; // + $documents__content.scrollTop();
      //left = parseInt( $helpers__box.css('left') ) - lmax; // + $documents__content.scrollLeft();

      //width = $helpers__box.outerWidth();
      //height = $helpers__box.outerHeight();
      width = parseInt( $helpers__box.css('width') );
      height = parseInt( $helpers__box.css('height') )



      $selectedElement.css({
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
        transform: transform
      })
      
      $helpers__box.css({
        'transform' : transform
      })
      
    }

  }

})