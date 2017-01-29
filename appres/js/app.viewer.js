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

      if ($(e.target).is('.editable')){
      
        $selectedElement = ($(e.target).is('.editable')) ? $(e.target) : $(e.target).parents('.editable').first();
        app.f.selectLayer($selectedElement);
        app.f.selectElement($selectedElement);
      } else {
        $selectedElement = null;
        $helpers.html('');

        //$helpers.removeClass('parent-coord');
        $('#sidebarTabs-layers li div').removeClass('ui-sortable-selected');
      }
      
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
    
    var w = 0;
    var h = 0;
    $documents__content.find('.editable').each(function(i,e){
      var offset = $(e).offset();
      w = ( $(e).outerWidth() + offset.left > w ) ? $(e).outerWidth() + offset.left : w;
      h = ( $(e).outerHeight() + offset.top > h ) ? $(e).outerHeight() + offset.top : h;
    });

    var width = (w >= $documents.outerWidth()) ? w : $documents.outerWidth();
    var height = (h >= $documents.outerHeight()) ? h : $documents.outerHeight();

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
    var $helpers__box = $('<div class="helpers__box"><div data="n" class="ui-resizable-handle ui-resizable-n"></div><div data="e" class="ui-resizable-handle ui-resizable-e"></div><div data="s" class="ui-resizable-handle ui-resizable-s"></div><div data="w" class="ui-resizable-handle ui-resizable-w"></div><div data="ne" class="ui-resizable-handle ui-resizable-ne"></div><div data="se" class="ui-resizable-handle ui-resizable-se"></div><div data="sw" class="ui-resizable-handle ui-resizable-sw"></div><div data="nw" class="ui-resizable-handle ui-resizable-nw"></div></div>');
    var $helpers__drag = $('<div class="helpers__drag"></div>');
    var $helpers__parent = $('<div class="helpers__parent"></div>');
    var $helpers__resize = $('<div class="helpers__resize"></div>');
    var $helpers__rotate = $('<div class="helpers__rotate"></div>');

    $helpers.html('').removeClass('parent-coord');
    var $tree = $helpers;

    $($parents.get().reverse()).each(function (i, e) {
      if (i > 1) {

        $tree = $helpers__parent.clone().appendTo($tree);
        $tree.css({
          'width': parseInt(e.style.width) + 'px',
          'height': parseInt(e.style.height) + 'px',
          'top': parseInt(e.style.top) + 'px',
          'left': parseInt(e.style.left) + 'px',
          'transform': $(e).css('transform'),
          'transform-origin': '50% 50% 0'
        });
      }
    });

    $tree.append($helpers__box);

    $helpers__box.parent().addClass('parent-coord')
        
    $helpers__box.css({
      'width': parseInt($selectedElement[0].style.width) + 'px',
      'height': parseInt($selectedElement[0].style.height) + 'px',
      'top': parseInt($selectedElement[0].style.top) + 'px',
      'left': parseInt($selectedElement[0].style.left) + 'px',
      'transform': $selectedElement.css('transform'),
      'transform-origin': '50% 50% 0'
    });

    var event = null;
    var shiftX;
    var shiftY;
    var scrollX = false;
    var scrollY = false;
    var $elem;
    var $rect;
    
    $helpers__box.rotatable({
      angle : getRotationDegrees($helpers__box, 'rad'), 
      wheelRotate: false,
      rotationCenterX : 50, 
      rotationCenterY : 50,
      start: function(e, ui) {
        $helpers.addClass('helpers__active');
        event = 'rotate';
      },
      rotate: function(e, ui) {
        update();
      },
      stop: function(e, ui) {
        event = null;
        $helpers.removeClass('helpers__active');
        update();
      }
       
    });
    
    //
    //
    //
    $helpers__box.on('mousedown', function (e) {
      
      $helpers.addClass('helpers__active');
      scrollX = $documents.scrollLeft();
      scrollY = $documents.scrollTop();
      
      
      
      if ($(e.target).is('.helpers__box')) {
        
        event = 'drag';
        $helpers.append($helpers__drag);
        $elem = $helpers__box;
        $rect = $helpers__drag;

      } else if ($(e.target).is('.ui-resizable-handle')) {
        
        event = 'resize';
        $helpers.append($helpers__resize);
        $elem = $(e.target).addClass('ui-resizable-handle-active');
        $rect = $helpers__resize; 
        
      }
      
      $rect.css({
          'width': $elem.css('width'),
          'height': $elem.css('height'),
          'top': $documents.scrollTop() + $elem.offset().top - $documents.offset().top + 'px',
          'left': $documents.scrollLeft() + $elem.offset().left - $documents.offset().left + 'px'
      });

      shiftX = e.pageX - $documents.scrollLeft() - $rect.offset().left + $documents.offset().left;
      shiftY = e.pageY - $documents.scrollTop() - $rect.offset().top + $documents.offset().top;
      
    });

    //
    //
    //
    $(window).on('mouseup', function (e) {
      event = null;
      scrollX = false;
      scrollY = false;
      $helpers.removeClass('helpers__active');
      $helpers__drag.remove();
      $helpers__resize.remove();
      $helpers__rotate.remove();
      $('.ui-resizable-handle-active').removeClass('ui-resizable-handle-active');
      app.f.virtualbodySizeDetector();
      
    });

    //
    //
    //
    $documents.on('scroll', function (e) {
      if (scrollX !== false) $documents.scrollLeft(scrollX);
      if (scrollY !== false) $documents.scrollTop(scrollY);
    });

    //
    //
    //
    $(window).on('mousemove', function (e) {
      
      if (event){
        var maxr = 0;

        $('.helpers__parent').each(function (i, e) {
          maxr += getRotationDegrees($(e));
        })
      
      }
      
      
      if (event === 'drag') {

        $helpers__drag.css({
          left: e.pageX - shiftX + 'px',
          top: e.pageY - shiftY + 'px'
        });

        var ghostRect = $helpers__drag.offset();
        var realRect = $helpers__box.offset();
        
        var stepX = ghostRect.left - realRect.left;
        var stepY = ghostRect.top - realRect.top;

        var xy = rotate(0, 0, Math.round(stepX), Math.round(stepY), maxr, true);

        $helpers__box.css({
          left: parseInt($helpers__box.css('left')) + xy[0] + 'px',
          top: parseInt($helpers__box.css('top')) + xy[1] + 'px'
        });

        update();
      }

    
      
      if (event === 'resize') {

        var $activePoint = $('.ui-resizable-handle-active');
        
        $helpers__resize.css({
          left: e.pageX - shiftX + 'px',
          top: e.pageY - shiftY + 'px'
        });

        var corner =  3;

        var ghostRect = $helpers__resize.offset();
        var realRect = $activePoint.offset();

        var stepX = ghostRect.left - realRect.left;
        var stepY = ghostRect.top - realRect.top;

        var xy = rotate(0, 0, Math.round(stepX), Math.round(stepY), maxr + getRotationDegrees($helpers__box), true);

        if ($activePoint.is('.ui-resizable-n')) {
          // верхняя сторона
          $activePoint.css({
            top: parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
          });

          $helpers__box.css({
            top: parseInt($helpers__box.css('top')) + parseInt($activePoint.css('top')) + 'px',
            height: parseInt($helpers__box[0].style.height) - parseInt($activePoint.css('top')) + 'px'
          });

        } else if ($activePoint.is('.ui-resizable-e')) {
          // правая сторона
          $activePoint.css({
            left: parseInt($activePoint.css('left')) + xy[0] + corner + 'px'
          });

          $helpers__box.css({
            width: parseInt($activePoint.css('left')) + 'px'
          });

        } else if ($activePoint.is('.ui-resizable-s')) {
          // нижняя сторона
          $activePoint.css({
            top: parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
          });

          $helpers__box.css({
            height: parseInt($activePoint.css('top')) + 'px'
          });

        } else if ($activePoint.is('.ui-resizable-w')) {
          // левая сторона
          $activePoint.css({
            left: parseInt($activePoint.css('left')) + xy[0] + corner + 'px'
          });

          $helpers__box.css({
            left: parseInt($helpers__box.css('left')) + parseInt($activePoint.css('left')) + 'px',
            width: parseInt($helpers__box[0].style.width) - parseInt($activePoint.css('left')) + 'px',
          });

        } else if ($activePoint.is('.ui-resizable-ne')) {
          // верхний правый угол
          $activePoint.css({
            left: parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
            top: parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
          });

          $helpers__box.css({
            top: parseInt($helpers__box.css('top')) + parseInt($activePoint.css('top')) + 'px',
            height: parseInt($helpers__box[0].style.height) - parseInt($activePoint.css('top')) + 'px',
            left: parseInt($helpers__box.css('left')) + 'px',
            width: parseInt($activePoint.css('left')) + 'px'
          });

        } else if ($activePoint.is('.ui-resizable-se')) {
          // нижний правый угол
          $activePoint.css({
            left: parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
            top: parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
          });

          $helpers__box.css({
            width: parseInt($activePoint.css('left')) + 'px',
            height: parseInt($activePoint.css('top')) + 'px'
          });

        } else if ($activePoint.is('.ui-resizable-sw')) {
          // нижней левый угол
          $activePoint.css({
            left: parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
            top: parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
          });

          $helpers__box.css({
            left: parseInt($helpers__box.css('left')) + parseInt($activePoint.css('left')) + 'px',
            width: parseInt($helpers__box[0].style.width) - parseInt($activePoint.css('left')) + 'px',
            height: parseInt($activePoint.css('top')) + 'px'

          });
        } else if ($activePoint.is('.ui-resizable-nw')) {
          // верхний левый угол
          $activePoint.css({
            left: parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
            top: parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
          });

          $helpers__box.css({
            top: parseInt($helpers__box.css('top')) + parseInt($activePoint.css('top')) + 'px',
            left: parseInt($helpers__box.css('left')) + parseInt($activePoint.css('left')) + 'px',
            height: parseInt($helpers__box[0].style.height) - parseInt($activePoint.css('top')) + 'px',
            width: parseInt($helpers__box[0].style.width) - parseInt($activePoint.css('left')) + 'px'
          });

        }

        $('.ui-resizable-ne, .ui-resizable-se, .ui-resizable-sw, .ui-resizable-nw, .ui-resizable-n, .ui-resizable-e, .ui-resizable-s, .ui-resizable-w ').removeAttr('style');

        update();

      }
    });


    function rotate(cx, cy, x, y, angle, round) {
      var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      
        return (round)?[ Math.round(nx),  Math.round(ny) ] : [nx, ny];
    }

    function getRotationDegrees(obj , unit) {
      var matrix = obj.css("-webkit-transform") || obj.css("transform");
      var angle;
      if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        
        angle = (unit === 'rad') ? Math.atan2(b, a) : Math.round(Math.atan2(b, a) * (180 / Math.PI));
          
      } else {
        angle = 0;
      }
      return angle
    }


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