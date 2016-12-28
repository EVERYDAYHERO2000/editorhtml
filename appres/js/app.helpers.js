"use strict";
$(function () {
  app.f.setHelpers = function () {
    var $documents = app.e.$documents;
    var $documents__content = app.e.$documents__content;
    var $selectedElement = app.e.$selectedElement;
    var $helpers = app.e.$helpers = $('<div class="helpers"></div>');
    var $helpers__virtualbody = app.e.$helpers__virtualbody = $('<div class="helpers__virtualbody"></div>');

    $helpers.append($helpers__virtualbody);
    $documents.append($helpers);


    $documents__content.on('mouseup', function (e) {
      $selectedElement = ($(e.target).is('.editable')) ? $(e.target) : $(e.target).parents('.editable').first();

      app.e.selectLayer($selectedElement);


    });

    $helpers.on('scroll', function () {

      $documents__content.scrollTop($(this).scrollTop());
      $documents__content.scrollLeft($(this).scrollLeft());
    }).on('click', function (e) {
      if (!$(e.target).is('.ui-resizable-handle, .ui-rotatable-handle')) {
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

        app.e.selectLayer($(elems[0]));
      }
    });


    function virtualbodySizeDetector() {

      var $selectedElement = app.e.$selectedElement;

      if (!$helpers.is('.helpers_lock') &&
        $documents__content.outerWidth() !== $helpers__virtualbody.outerWidth() ||
        $documents__content.outerHeight() !== $helpers__virtualbody.outerHeight()) {

        

        $helpers__virtualbody.css({
          width: $documents__content.outerWidth() + 'px',
          height: $documents__content.outerHeight() + 'px'
        })

        if ($selectedElement) app.e.selectLayer($selectedElement);
      }
      setTimeout(virtualbodySizeDetector, 100);
    }

    virtualbodySizeDetector();

  }

  app.f.slectElement = function (elem) {

    var $documents__content = app.e.$documents__content;
    var $selectedElement = app.e.$selectedElement = elem;
    var $helpers = app.e.$helpers;
    var $helpers__virtualbody = app.e.$helpers__virtualbody;

    var $helpers__box = $('<div class="helpers__box"></div>');
    var selectedRect = $selectedElement[0].getBoundingClientRect();


    $helpers__virtualbody.html('').append($helpers__box);
    $helpers__box.css({
      width: $selectedElement.outerWidth() + 'px',
      height: $selectedElement.outerHeight() + 'px',
      left: $helpers.scrollLeft() + selectedRect.left + 'px',
      top: $helpers.scrollTop() + selectedRect.top + 'px',
      transform: $selectedElement.css('transform')
    }).draggable({
      start: function (event, ui) {
        $helpers.addClass('helpers_lock');
        updateSelectedElement(event, ui);
      },
      drag: updateSelectedElement,
      stop: function (event, ui) {
        $helpers.removeClass('helpers_lock');
        updateSelectedElement(event, ui);
      }

    }).resizable({
      handles: 'all',
      start: function (event, ui) {
        $helpers.addClass('helpers_lock');
        updateSelectedElement(event, ui)
      },
      stop: function (event, ui) {
        $helpers.removeClass('helpers_lock');
        updateSelectedElement(event, ui);
      },
      resize: updateSelectedElement
    }).rotatable({
      otationCenterX: 50.0,
      rotationCenterY: 50.0,
      enable: true,
      snap: false,
      angle: 0,
      wheelRotate: false,
      start: function (event, ui) {
        $helpers.addClass('helpers_lock');
        updateSelectedElement(event, ui)
      },
      rotate: updateSelectedElement,
      stop: function (event, ui) {
        $helpers.removeClass('helpers_lock');
        updateSelectedElement(event, ui);
      },
    });

    function updateSelectedElement(event, ui) {

      var top, bottom, left, right, width, height;
      var $parent = $selectedElement.parents();
      var selectedHelperPosition = $helpers__box.position();



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




      top = selectedHelperPosition.top - tmax + $documents__content.scrollTop();
      left = selectedHelperPosition.left - lmax + $documents__content.scrollLeft();



      width = $helpers__box.css('width');
      height = $helpers__box.css('height');

      $selectedElement.css({
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        width: width,
        height: height,
        transform: $helpers__box.css('transform')
      })
    }

  }

})