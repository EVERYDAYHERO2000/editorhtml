"use strict";
$(function () {

  app.f.setViewer = function () {

    var $documents = app.e.$documents;

    $documents.append(app.e.$documents__browser);
  }

  app.f.setHelpers = function () {

    var $documents = app.e.$documents;
    var $documents__content = app.e.$documents__content;
    var $documents__browser = app.e.$documents__browser;
    var $helpers = app.e.$helpers = $('<div class="helpers"></div>');

    $documents.append($helpers);


    $(window).resize(function () {
      app.f.virtualbodySizeDetector();
    });


    $documents__content.find('body *:not(".editable")').css({
      'pointer-events': 'none'
    });
    $documents__content.find('*').css({
      'user-select': 'none'
    });

    /*
      Выбираем объект из элементов под курсором с классом .editable
    */

    $documents__content.on('mouseup', function (e) {

      if ($(e.target).is('.editable')) {
        var $selected = ($(e.target).is('.editable')) ? $(e.target) : $(e.target).parents('.editable').first();
        app.f.selectLayer($selected);
        app.f.selectElement($selected);
      } else {
        app.f.selectLayer(null);
        app.f.selectElement(null);
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
    $documents__content.find('.editable').each(function (i, e) {
      var offset = $(e).offset();
      w = ($(e).outerWidth() + offset.left > w) ? $(e).outerWidth() + offset.left : w;
      h = ($(e).outerHeight() + offset.top > h) ? $(e).outerHeight() + offset.top : h;
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
    var $helpers = app.e.$helpers;
    $helpers.empty().removeClass('parent-coord');

    if (elem !== null) {

      var $parents = $selectedElement.parents();
      var $helpers__box = $('<div class="helpers__box">' +
        '<div class="ui-resizable-handle ui-resizable-n"><div class="ui-resizable-handle-area"></div></div>' +
        '<div class="ui-resizable-handle ui-resizable-e"><div class="ui-resizable-handle-area"></div></div>' +
        '<div class="ui-resizable-handle ui-resizable-s"><div class="ui-resizable-handle-area"></div></div>' +
        '<div class="ui-resizable-handle ui-resizable-w"><div class="ui-resizable-handle-area"></div></div>' +
        '<div class="ui-resizable-handle ui-resizable-ne"><div class="ui-resizable-handle-area"></div></div>' +
        '<div class="ui-resizable-handle ui-resizable-se"><div class="ui-resizable-handle-area"></div></div>' +
        '<div class="ui-resizable-handle ui-resizable-sw"><div class="ui-resizable-handle-area"></div></div>' +
        '<div class="ui-resizable-handle ui-resizable-nw"><div class="ui-resizable-handle-area"></div></div>' +
        '</div>');
      var $helpers__drag = $('<div class="helpers__drag"></div>');

      var event = null;
      var shiftX;
      var shiftY;
      var scrollX = false;
      var scrollY = false;
      var $elem;
      var $rect;
      var maxr = 0;

      var $tree = $helpers;

      $($parents.get().reverse()).each(function (i, e) {
        if (i > 1) {

          $tree = $helpers__drag.clone().appendTo($tree);
          $tree.css({
            'width': parseInt(e.style.width) + 'px',
            'height': parseInt(e.style.height) + 'px',
            'top': parseInt(e.style.top) + 'px',
            'left': parseInt(e.style.left) + 'px',
            'transform': $(e).css('transform'),
            'transform-origin': '50% 50% 0'
          });

          maxr += getRotationDegrees($tree);
        }
      });


      $tree.append($helpers__box);
      $helpers__box.parent().addClass('parent-coord');

      $helpers__box.css({
        'width': parseInt($selectedElement[0].style.width) + 'px',
        'height': parseInt($selectedElement[0].style.height) + 'px',
        'top': parseInt($selectedElement[0].style.top) + 'px',
        'left': parseInt($selectedElement[0].style.left) + 'px',
        'transform': $selectedElement.css('transform'),
        'transform-origin': '50% 50% 0'
      });

      $helpers__box.rotatable({
        angle: getRotationDegrees($helpers__box, 'rad'),
        wheelRotate: false,
        rotationCenterX: 50,
        rotationCenterY: 50,
        start: function (e, ui) {
          $helpers.addClass('helpers__active');
          event = 'rotate';
        },
        rotate: function (e, ui) {
          update();
        },
        stop: function (e, ui) {
          event = null;
          $helpers.removeClass('helpers__active');
          update();
        }

      });


      //
      //
      //
      var clicks = 0;
      $helpers__box.on('mousedown', function (e) {

        e.preventDefault();
        clicks++;

        setTimeout(function () {
          clicks = 0;
        }, 400);


        if (clicks === 2) {
          app.f.selectElement(null);
          app.f.selectLayer(null);
          clicks = 0;
          return;

        } else {
          $helpers.addClass('helpers__active');
          scrollX = $documents.scrollLeft();
          scrollY = $documents.scrollTop();


          if ($(e.target).is('.helpers__box')) {

            event = 'drag';
            $helpers.append($helpers__drag);
            $elem = $helpers__box;
            $rect = $helpers__drag;

          } else if ($(e.target).is('.ui-resizable-handle-area')) {

            event = 'resize';
            $helpers.append($helpers__drag);
            $elem = $(e.target).parent().addClass('ui-resizable-handle-active');
            $rect = $helpers__drag;

          }

          $rect.css({
            'width': $elem.css('width'),
            'height': $elem.css('height'),
            'top': $documents.scrollTop() + $elem.offset().top - $documents.offset().top + 'px',
            'left': $documents.scrollLeft() + $elem.offset().left - $documents.offset().left + 'px'
          });

          shiftX = e.pageX - $documents.scrollLeft() - $rect.offset().left + $documents.offset().left;
          shiftY = e.pageY - $documents.scrollTop() - $rect.offset().top + $documents.offset().top;

        }
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
      $(window).on('mouseup', function (e) {
        event = null;
        scrollX = false;
        scrollY = false;
        $helpers.removeClass('helpers__active');
        $helpers__drag.remove();
        $('.ui-resizable-handle-active').removeClass('ui-resizable-handle-active');
        app.f.virtualbodySizeDetector();

      });

      //
      //
      //
      $(window).on('mousemove', function (e) {

        $helpers__drag.css({
          'left': e.pageX - shiftX + 'px',
          'top': e.pageY - shiftY + 'px'
        });
        
        var $active = (event === 'resize') ? $('.ui-resizable-handle-active') : $helpers__box;
        var selfr = (event === 'resize') ? getRotationDegrees($helpers__box) : 0;
        var ghostRect = $helpers__drag.offset();
        var realRect = $active.offset();
        var stepX = ghostRect.left - realRect.left;
        var stepY = ghostRect.top - realRect.top;
        var xy = rotate(0, 0, Math.round(stepX), Math.round(stepY), maxr + selfr, true);
        var corner = 3;

        switch (event) {
          case 'drag':
            
            $helpers__box.css({
              'left': parseInt($helpers__box.css('left')) + xy[0] + 'px',
              'top': parseInt($helpers__box.css('top')) + xy[1] + 'px'
            });

            update();
            break;

          case 'resize':
            var $activePoint = $active;
            if ($activePoint.is('.ui-resizable-n')) {
              // верхняя сторона
              $activePoint.css({
                'top': parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
              });

              $helpers__box.css({
                'top': parseInt($helpers__box.css('top')) + parseInt($activePoint.css('top')) + 'px',
                'height': parseInt($helpers__box[0].style.height) - parseInt($activePoint.css('top')) + 'px'
              });

            } else if ($activePoint.is('.ui-resizable-e')) {
              // правая сторона
              $activePoint.css({
                'left': parseInt($activePoint.css('left')) + xy[0] + corner + 'px'
              });

              $helpers__box.css({
                'width': parseInt($activePoint.css('left')) + 'px'
              });

            } else if ($activePoint.is('.ui-resizable-s')) {
              // нижняя сторона
              $activePoint.css({
                'top': parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
              });

              $helpers__box.css({
                'height': parseInt($activePoint.css('top')) + 'px'
              });

            } else if ($activePoint.is('.ui-resizable-w')) {
              // левая сторона
              $activePoint.css({
                'left': parseInt($activePoint.css('left')) + xy[0] + corner + 'px'
              });

              $helpers__box.css({
                'left': parseInt($helpers__box.css('left')) + parseInt($activePoint.css('left')) + 'px',
                'width': parseInt($helpers__box[0].style.width) - parseInt($activePoint.css('left')) + 'px',
              });

            } else if ($activePoint.is('.ui-resizable-ne')) {
              // верхний правый угол
              $activePoint.css({
                'left': parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
                'top': parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
              });

              $helpers__box.css({
                'top': parseInt($helpers__box.css('top')) + parseInt($activePoint.css('top')) + 'px',
                'height': parseInt($helpers__box[0].style.height) - parseInt($activePoint.css('top')) + 'px',
                'left': parseInt($helpers__box.css('left')) + 'px',
                'width': parseInt($activePoint.css('left')) + 'px'
              });

            } else if ($activePoint.is('.ui-resizable-se')) {
              // нижний правый угол
              $activePoint.css({
                'left': parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
                'top': parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
              });

              $helpers__box.css({
                'width': parseInt($activePoint.css('left')) + 'px',
                'height': parseInt($activePoint.css('top')) + 'px'
              });

            } else if ($activePoint.is('.ui-resizable-sw')) {
              // нижней левый угол
              $activePoint.css({
                'left': parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
                'top': parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
              });

              $helpers__box.css({
                'left': parseInt($helpers__box.css('left')) + parseInt($activePoint.css('left')) + 'px',
                'width': parseInt($helpers__box[0].style.width) - parseInt($activePoint.css('left')) + 'px',
                'height': parseInt($activePoint.css('top')) + 'px'

              });
            } else if ($activePoint.is('.ui-resizable-nw')) {
              // верхний левый угол
              $activePoint.css({
                'left': parseInt($activePoint.css('left')) + xy[0] + corner + 'px',
                'top': parseInt($activePoint.css('top')) + xy[1] + corner + 'px'
              });

              $helpers__box.css({
                'top': parseInt($helpers__box.css('top')) + parseInt($activePoint.css('top')) + 'px',
                'left': parseInt($helpers__box.css('left')) + parseInt($activePoint.css('left')) + 'px',
                'height': parseInt($helpers__box[0].style.height) - parseInt($activePoint.css('top')) + 'px',
                'width': parseInt($helpers__box[0].style.width) - parseInt($activePoint.css('left')) + 'px'
              });

            }

            $('.helpers .ui-resizable-handle').removeAttr('style');

            update();
            break;
        }

      });
    }

    function rotate(cx, cy, x, y, angle, round) {
      var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;

      return (round) ? [Math.round(nx), Math.round(ny)] : [nx, ny];
    }

    function getRotationDegrees(obj, unit) {
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