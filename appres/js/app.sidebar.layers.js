"use strict";
$(function(){
  app.f.getDocumentTree = function () {

    var $documents__content = app.e.$documents__content;

    var $DOM = $('<ol class="layers__tree"></ol>');
    var DOMtree = $documents__content.find('.editable').map(function (i, e) {

      return {
        elem: $(this),
        parent: $(this).parents('.editable').first(),
        tagname: $(this).prop('tagName')
      }
    }).get();

    $.each(DOMtree, function (index, value) {

      var $e = $('<li><div>' + value.tagname + '</div></li>').data('node', value.elem);

      if (!value.parent.length) {

        $DOM.append($e);
      } else {

        $DOM.find('li').each(function (i, e) {

          if ($(this).data('node')[0] === value.parent[0]) {

            if (!$(this).children('.level').first().length) {

              $(this).append('<ol class="level"></ol>')

            }
            $(this).children('.level').first().append($e)

          }

        });

      }
    });

    $('#sidebarTabs-layers').append($DOM);

    $DOM.nestedSortable({
      handle: 'div',
      items: 'li',
      toleranceElement: '> div',
      relocate: function (e, ui) {



        $DOM.find('.ui-sortable-handle').each(function (i, e) {

          var $parent = ($($(e).parents('li')[1]).data('node')) ? $($(e).parents('li')[1]).data('node') : $documents__content.find('body');

          $parent.append($($(e).closest('li')[0]).data('node'));
        });

        app.f.selectElement($(ui.item[0]).data('node'));
      }
    });

    $DOM.find('.ui-sortable-handle').on('click', function (e) {
      $DOM.find('div').removeClass('ui-sortable-selected');
      $(this).addClass('ui-sortable-selected');

      app.f.selectElement($(this).parent().data('node'));
    });

  }



  app.f.selectLayer = function (elem) {

    if (elem === null) {
      $('#sidebarTabs-layers li div').removeClass('ui-sortable-selected');

    } else {

      $('#sidebarTabs-layers').find('li').each(function () {
        if ($(this).data('node')[0] === elem[0]) {

          $(this).find('div').addClass('ui-sortable-selected');
        } else {
          $(this).find('div').removeClass('ui-sortable-selected');
        }
      });
    }
  }
})