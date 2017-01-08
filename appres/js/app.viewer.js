"use strict";
$(function () {

  app.f.setViewer = function () {

    var $documents = app.e.$documents;

    $documents.append(app.e.$documents__browser);
  }

  app.f.setHelpers = function () {

    var $documents = app.e.$documents;
    var $documents__content = app.e.$documents__content;
    var $selectedElement = app.e.$selectedElement;
    var $documents__browser = app.e.$documents__browser;
    var $helpers = app.e.$helpers = $('<div class="helpers"></div>');

    $documents.append($helpers);

    $(window).resize(function () {
      app.f.virtualbodySizeDetector();
    });

    $(document).on('mouseup', function () {
      $documents__browser.removeClass('documents__browser_disabled');
    });

    /*
      Выбираем объект из элементов под курсором с классом .editable
    */



    $documents__content.on('mouseup', function (e) {

      $selectedElement = ($(e.target).is('.editable')) ? $(e.target) : $(e.target).parents('.editable').first();
      app.f.selectLayer($selectedElement);
      app.f.selectElement($selectedElement);

    });

    app.f.virtualbodySizeDetector();
  }

  app.f.virtualbodySizeDetector = function () {

    var $documents = app.e.$documents;
    var $documents__browser = app.e.$documents__browser;
    var $documents__content = app.e.$documents__content;
    var $selectedElement = app.e.$selectedElement;
    var $helpers = app.e.$helpers;



    if ($selectedElement) app.f.selectLayer($selectedElement);

    var width = ($documents__content.outerWidth() >= $documents.outerWidth()) ? $documents__content.outerWidth() : $documents.outerWidth();
    var height = ($documents__content.outerHeight() >= $documents.outerHeight()) ? $documents__content.outerHeight() : $documents.outerHeight();

    $documents__browser.attr({
      'width': width,
      'height': height
    });

    $helpers.css({
      'width': width + 'px',
      'height': height + 'px',
      'min-width:': width + 'px'
    })

  }


  app.f.selectElement = function (elem) {

    var $documents = app.e.$documents;
    var $documents__content = app.e.$documents__content;
    var $documents__browser = app.e.$documents__browser;
    var $selectedElement = app.e.$selectedElement = elem;
    var $parents = $selectedElement.parents();
    var $helpers = app.e.$helpers;
    var $helpers__box = $('<div class="elem helpers__box"><div class="ui-resizable-handle ui-resizable-n"></div><div class="ui-resizable-handle ui-resizable-e"></div><div class="ui-resizable-handle ui-resizable-s"></div><div class="ui-resizable-handle ui-resizable-w"></div><div class="ui-resizable-handle ui-resizable-ne"></div><div class="ui-resizable-handle ui-resizable-se"></div><div class="ui-resizable-handle ui-resizable-sw"></div><div class="ui-resizable-handle ui-resizable-nw"></div><div class="ui-rotatable-handle"></div></div>');
    var $helpers__drag = $('<div class="elem helpers__drag"></div>');
    var $helpers__parent = $('<div class="elem helpers__parent"></div>');
    var $helpers__resize = $('<div class="elem helpers__resize"></div>');

    $helpers.html('');

    var $tree = $helpers;

    $($parents.get().reverse()).each(function (i, e) {
      if (i > 1) {

        var $parentnode = $helpers__parent.clone().appendTo($tree);
        $tree = $parentnode;

        $parentnode.css({
          'position': 'absolute',
          'width': parseInt(e.style.width) + 'px',
          'height': parseInt(e.style.height) + 'px',
          'top': parseInt(e.style.top) + 'px',
          'left': parseInt(e.style.left) + 'px',
          'transform': $(e).css('transform'),
          'transform-origin': $(e).css('transform-origin')
        });
      }
    });

    $tree.append($helpers__box);

    var elem = $selectedElement[0];

    $helpers__box.css({
      'position': 'absolute',
      'width': parseInt(elem.style.width) + 'px',
      'height': parseInt(elem.style.height) + 'px',
      'top': parseInt(elem.style.top) + 'px',
      'left': parseInt(elem.style.left) + 'px',
      'transform': $selectedElement.css('transform'),
      'transform-origin': $selectedElement.css('transform-origin')
    });

    var drag = false;
    var resize = false;
    var shiftX, shiftY;

    //
    //
    //
    $helpers__box.on('mousedown', function (e) {
      $helpers.addClass('helpers__active');
      if ($(e.target).is('.helpers__box')) {
        $helpers.append($helpers__drag);
        $helpers__drag.css({
          'position': 'absolute',
          'width': $helpers__box.css('width'),
          'height': $helpers__box.css('height'),
          'top': $documents.scrollTop() + $helpers__box.offset().top - $documents.offset().top + 'px',
          'left': $documents.scrollLeft() + $helpers__box.offset().left - $documents.offset().left + 'px'
        });
        drag = true;
        shiftX = e.pageX - $documents.scrollLeft() - $helpers__drag.offset().left + $documents.offset().left;
        shiftY = e.pageY - $documents.scrollTop() - $helpers__drag.offset().top + $documents.offset().top;

      } else if ($(e.target).is('.ui-resizable-handle')) {
        $helpers.append($helpers__resize);
        $(e.target).addClass('ui-resizable-handle-active');
        $helpers__resize.css({
          'position': 'absolute',
          'width': $(e.target).css('width'),
          'height': $(e.target).css('height'),
          'top': $documents.scrollTop() + $(e.target).offset().top - $documents.offset().top + 'px',
          'left': $documents.scrollLeft() + $(e.target).offset().left - $documents.offset().left + 'px'
        });
        resize = true;
        shiftX = e.pageX - $documents.scrollLeft() - $helpers__resize.offset().left + $documents.offset().left;
        shiftY = e.pageY - $documents.scrollTop() - $helpers__resize.offset().top + $documents.offset().top;

      }

    });

    //
    //
    //
    $(window).on('mouseup', function (e) {
      drag = false;
      resize = false;
      $helpers.removeClass('helpers__active');
      $helpers__drag.remove();
      $helpers__resize.remove();
      $('.ui-resizable-handle-active').removeClass('ui-resizable-handle-active');
      app.f.virtualbodySizeDetector();
    });

    //
    //
    //
    $(window).on('mousemove', function (e) {
      console.log(1212)
      if (drag === true) {
        $helpers__drag.css({
          left: e.pageX - shiftX + 'px',
          top: e.pageY - shiftY + 'px'
        });

        var dragRect = $helpers__drag.offset();
        var boxRect = $helpers__box.offset();
        var stepX = dragRect.left - boxRect.left;
        var stepY = dragRect.top - boxRect.top;

        $helpers__box.css({
          left: parseInt($helpers__box.css('left')) + stepX + 'px',
          top: parseInt($helpers__box.css('top')) + stepY + 'px'
        });

        update();
      }

      if (resize === true) {
        $helpers__resize.css({
          left: e.pageX - shiftX + 'px',
          top: e.pageY - shiftY + 'px'
        });

        var $active = $('.ui-resizable-handle-active');
        var dragRect = $helpers__resize.offset();
        var activRect = $active.offset();

        var corner = 3;

        var stepX = dragRect.left - activRect.left;
        var stepY = dragRect.top - activRect.top;



        if ( $active.is('.ui-resizable-n') ) {
          // верхняя сторона
          $active.css({
            top: parseInt( $active.css('top') ) + stepY + 'px'
          });

          $helpers__box.css({
            top: parseInt($helpers__box.css('top')) + parseInt( $active.css('top') ) + corner + 'px',
            height: parseInt($('.ui-resizable-s').css('top')) - corner - parseInt($('.ui-resizable-n').css('top')) + corner + 'px'
          });

        } else if ( $active.is('.ui-resizable-e') ) {
          // правая сторона  
          $active.css({
            left: parseInt( $active.css('left') ) + stepX + 'px'
          });

          $helpers__box.css({
            width: parseInt($('.ui-resizable-e').css('left')) - corner - parseInt($('.ui-resizable-w').css('left')) + corner + 'px'
          });

        } else if ( $active.is('.ui-resizable-s') ) {
          // нижняя сторона
          $active.css({
            top: parseInt( $active.css('top') ) + stepY + 'px'
          });

          $helpers__box.css({
            height: parseInt($('.ui-resizable-s').css('top')) - corner - parseInt($('.ui-resizable-n').css('top')) + corner + 'px'
          });

        } else if ( $active.is('.ui-resizable-w') ) {
          // левая сторона
          $active.css({
            left: parseInt( $active.css('left')) + stepX + 'px'
          });

          $helpers__box.css({
            left: parseInt( $helpers__box.css('left') ) + parseInt( $active.css('left') ) + corner + 'px',
            width: parseInt($('.ui-resizable-e').css('left')) - corner - parseInt($('.ui-resizable-w').css('left')) + corner + 'px'
          });

        } else if ( $active.is('.ui-resizable-ne')) {
          // верхний правый угол ?

          $active.css({
            left: parseInt( $active.css('left')) + stepX + 'px',
            top: parseInt( $active.css('top')) + stepY + 'px'
          });

          $helpers__box.css({
            width: parseInt($('.ui-resizable-ne').css('left')) - corner - parseInt($('.ui-resizable-sw').css('left')) + corner + 'px',
            height: parseInt($('.ui-resizable-sw').css('top')) - corner - parseInt($('.ui-resizable-ne').css('top')) + corner + 'px',
          });

        } else if ( $active.is('.ui-resizable-se')) {
          // нижний правый угол
          $active.css({
            left: parseInt( $active.css('left')) + stepX + 'px',
            top: parseInt( $active.css('top')) + stepY + 'px'
          });

          $helpers__box.css({
            width: parseInt($('.ui-resizable-se').css('left')) - corner - parseInt($('.ui-resizable-nw').css('left')) + corner + 'px',
            height: parseInt($('.ui-resizable-se').css('top')) - corner - parseInt($('.ui-resizable-nw').css('top')) + corner + 'px',
          });

        } else if ( $active.is('.ui-resizable-sw')) {
          // нижней левый угол ?
          $active.css({
            left: parseInt( $active.css('left')) + stepX + 'px',
            top: parseInt( $active.css('top')) + stepY + 'px'
          });

          $helpers__box.css({
            width: parseInt($('.ui-resizable-ne').css('left')) + corner - parseInt($('.ui-resizable-sw').css('left')) + corner + 'px',
            height: parseInt($('.ui-resizable-sw').css('top')) - corner - parseInt($('.ui-resizable-ne').css('top')) + corner + 'px',
          });
        } else if ( $active.is('.ui-resizable-nw')) {
          // верхний левый угол
          $active.css({
            left: parseInt( $active.css('left')) + stepX + 'px',
            top: parseInt( $active.css('top')) + stepY + 'px'
          });

          $helpers__box.css({
            top: parseInt( $helpers__box.css('top') ) + parseInt( $active.css('top') ) + corner + 'px',
            left: parseInt( $helpers__box.css('left') ) + parseInt( $active.css('left') ) + corner + 'px',
            width: parseInt($('.ui-resizable-se').css('left')) - corner - parseInt($('.ui-resizable-nw').css('left')) + corner + 'px',
            height: parseInt($('.ui-resizable-se').css('top')) - corner - parseInt($('.ui-resizable-nw').css('top')) + corner + 'px',
          });

        }

        update();

      }

    });

    function update() {

      var elem = $helpers__box[0];

      $selectedElement.css({
        'position': 'absolute',
        'width': parseInt(elem.style.width) + 'px',
        'height': parseInt(elem.style.height) + 'px',
        'top': parseInt(elem.style.top) + 'px',
        'left': parseInt(elem.style.left) + 'px',
        'transform': $helpers__box.css('transform'),
        'transform-origin': $helpers__box.css('transform-origin')
      });

    }

  }


});