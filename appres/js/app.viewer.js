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
      'border' : 'red 1px solid'
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


    var $helpers__box = $('<div class="helpers__box"></div>');
    var transform = $selectedElement.css('transform');
    
    $selectedElement.css({
      'transform': 'none'
    });

    var selectedRect = $selectedElement[0].getBoundingClientRect();




    $helpers.html('').append($helpers__box);

    //

    //

    $helpers__box.css({
      width: selectedRect.width + 'px',
      height: selectedRect.height + 'px',
      left: selectedRect.left + 'px',
      top: selectedRect.top + 'px',
      transform: transform
    }).draggable({
      scroll: false,
      start: function (event, ui) {
        $documents__browser.addClass('documents__browser_disabled');
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
        $documents__browser.addClass('documents__browser_disabled');
        updateSelectedElement(event, ui)
      },
      stop: function (event, ui) {

        updateSelectedElement(event, ui);
        app.f.virtualbodySizeDetector();
      },
      resize: function (event, ui) {

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
        $documents__browser.addClass('documents__browser_disabled');
        updateSelectedElement(event, ui)
      },
      rotate: updateSelectedElement,
      stop: function (event, ui) {

        updateSelectedElement(event, ui);
      },
    });

    $selectedElement.css({
      'transform': transform
    });


    function updateSelectedElement(event, ui) {

      var top, bottom, left, right, width, height;
      var $parent = $selectedElement.parents();
      var transform = $helpers__box.css('transform');
      var selectedHelperPosition = $helpers__box.position();

      $helpers__box.css({
        'transform': 'none'
      });

      var l = [0],
        lmax, t = [0],
        tmax;
      $parent.each(function (i, e) {
        if ($(e).css('position') !== 'static') {
          l.push($(e).offset().left);
          t.push($(e).offset().top);
        }
      }).get();


      lmax = Math.max.apply(Math, l);
      tmax = Math.max.apply(Math, t);




      top = selectedHelperPosition.top - tmax;
      left = selectedHelperPosition.left - lmax;
      width = parseInt($helpers__box.css('width'));
      height = parseInt($helpers__box.css('height'))

      $selectedElement.css('box-sizing','border-box');

      $selectedElement.css({
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
        transform: transform
      })

      $helpers__box.css({
        'transform': transform
      })

    }

  }


});