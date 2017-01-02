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

    $documents__content.find('.editable').css({
      'outline': 'red 1px solid'
    })

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

    var $documents__content = app.e.$documents__content;
    var $documents__browser = app.e.$documents__browser;
    var $selectedElement = app.e.$selectedElement = elem;
    var $helpers = app.e.$helpers;
    var $parent = $selectedElement.parents();
    var $helpers__box = $('<div class="helpers__box"></div>');

    var S_transform = $selectedElement.css('transform');
    var H_transform;
    var angle = getAngle($selectedElement.css('transform'));

    $selectedElement.css({
      'transform': 'none'
    });

    $helpers.html('').append($helpers__box);
    $selectedElement.css('box-sizing', 'border-box');

    var H_selectedPosition;
    var S_selectedPosition = $selectedElement.position();

    var H_top;
    var H_bottom;
    var H_left;
    var H_right;
    var H_width;
    var H_height;

    var S_top;
    var S_bottom;
    var S_left;
    var S_right;
    var S_width;
    var S_height;

    var l = [0];
    var lmax;
    var t = [0];
    var tmax;

    $parent.each(function (i, e) {
      if ($(e).css('position') !== 'static') {
        l.push($(e).offset().left);
        t.push($(e).offset().top);
      }
    }).get();

    lmax = Math.max.apply(Math, l);
    tmax = Math.max.apply(Math, t);

    H_top = S_selectedPosition.top + tmax;
    H_left = S_selectedPosition.left + lmax;
    H_width = parseInt($selectedElement.css('width'));
    H_height = parseInt($selectedElement.css('height'))

    $helpers__box.css({
      width: H_width + 'px',
      height: H_height + 'px',
      left: H_left + 'px',
      top: H_top + 'px',
      transform: S_transform
    });

    $selectedElement.css({
      'transform': S_transform
    });


    $helpers__box.draggable({
      scroll: false,
      start: function (event, ui) {
        $documents__browser.addClass('documents__browser_disabled');
        //updateSelectedElement();

      },
      drag: function (event, ui) {
        updateSelectedElement();

      },
      stop: function (event, ui) {

        updateSelectedElement();
        app.f.virtualbodySizeDetector();
      }

    }).resizable({
      minWidth: 0,
      minHeight: 0,

      handles: 'all',
      start: function (event, ui) {
        $documents__browser.addClass('documents__browser_disabled');
        //updateSelectedElement()
      },
      stop: function (event, ui) {

        updateSelectedElement();
        app.f.virtualbodySizeDetector();
      },
      resize: function (event, ui) {

        updateSelectedElement();
      }
    }).rotatable({
      otationCenterX: 50.0,
      rotationCenterY: 50.0,
      enable: true,
      snap: false,
      angle: angle,
      wheelRotate: false,
      start: function (event, ui) {
        $documents__browser.addClass('documents__browser_disabled');
        updateSelectedElement()
      },
      rotate: updateSelectedElement,
      stop: function (event, ui) {

        updateSelectedElement();
      },
    });

    function getAngle(tr) {
      console.log(tr)
      tr = (tr === 'none') ? 'matrix(1,0,0,1,0,0)' : tr;

      // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

      var values = tr.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var c = values[2];
      var d = values[3];

      var scale = Math.sqrt(a * a + b * b);

      var sin = b / scale;
      // next line works for 30deg but not 130deg (returns 50);
      // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
      var angle = Math.atan2(b, a);

      return angle
    }

    function updateSelectedElement() {

      H_transform = $helpers__box.css('transform');
      $helpers__box.css({
        'transform': 'none'
      });

      H_selectedPosition = $helpers__box.position();

      S_top = H_selectedPosition.top - tmax;
      S_left = H_selectedPosition.left - lmax;
      S_width = parseInt($helpers__box.css('width'));
      S_height = parseInt($helpers__box.css('height'))

      $selectedElement.css({
        position: 'absolute',
        left: S_left + 'px',
        top: S_top + 'px',
        width: S_width + 'px',
        height: S_height + 'px',
        transform: H_transform
      });

      $helpers__box.css({
        'transform': H_transform
      });

    }



  }


});