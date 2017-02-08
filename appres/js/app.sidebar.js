"use strict";
$(function () {
  app.f.setSidebar = function () {

    var $frame__sidebar = app.e.$frame__sidebar;
    var $frame__viewer = app.e.$frame__viewer;
    var $documents__browser = app.e.$documents__browser;

    $frame__sidebar.css({
      width: app.settings.window.sidebarWidth + 'px'
    });

    $frame__sidebar.resizable({
      maxWidth: 500,
      minWidth: 250,
      handles: "w",
      resize: function (event, ui) {
        app.settings.window.sidebarWidth = $frame__sidebar.outerWidth();
        $frame__viewer.css({
          left: app.e.$frame__tools.outerWidth() + 'px',
          width: 'calc(100% - ' + (app.settings.window.sidebarWidth + app.e.$frame__tools.outerWidth()) + 'px)'
        })
      },
      start: function (event, ui) {
        $documents__browser.addClass('documents__browser_disabled');
      },
      stop: function (event, ui) {
        $documents__browser.removeClass('documents__browser_disabled');
        $(this).css({
          left: 'auto',
          right: '0px'
        })
      }
    });

    function setTabs() {

      var tabs = [
        {
          name: TEXT['properties'][L],
          id: 'properties'
          },
        {
          name: TEXT['layers'][L],
          id: 'layers'
          },
        {
          name: TEXT['project'][L],
          id: 'project'
          },
        {
          name: TEXT['history'][L],
          id: 'history'
          }
        ]
      var tab = '',
        $tab;
      var panel = '',
        $panel;

      for (var i = 0; i < tabs.length; i++) {
        tab += '<li><a href="#sidebarTabs-' + tabs[i].id + '">' + tabs[i].name + '</li>';
        panel += '<div class="sidebar__panel" id="sidebarTabs-' + tabs[i].id + '"></div>';
      }

      $tab = $('<ul class="sidebar__tabs">' + tab + '</ul>');
      $panel = $(panel);

      $frame__sidebar.append($tab, $panel);
      $frame__sidebar.tabs({
        active: app.settings.window.activeSidebarTab,
        create: function(e, ui){
          if (ui.panel.is('#sidebarTabs-properties')) {
            app.e.$sidebar__activeTab = ui.panel;
          } else {
            app.e.$sidebar__activeTab = null;
          }
        },
        activate: function (e, ui) {
          if (ui.newPanel.is('#sidebarTabs-properties')) {
            app.e.$sidebar__activeTab = ui.newPanel;
            app.f.createProperties(app.e.$selectedElement);
          }
          if (ui.oldPanel.is('#sidebarTabs-properties')) {
            app.e.$sidebar__activeTab = null;
            $('#sidebarTabs-properties').empty();
          }

        }
      });
    }

    setTabs();
  }

  app.f.createProperties = function (elem) {

    var $frame__sidebar = app.e.$frame__sidebar;
    var $properties = $('#sidebarTabs-properties');

    if (elem === null) {
      $properties.empty();
    } else {
      if (app.e.$sidebar__activeTab !== null) build();
    }

    function build() {
      $properties.append('<div class="proppanel proppanel__main"></div>' +
        '<div class="proppanel proppanel__props"></div>');
      var controlCounter = 0;

      $('.proppanel__main').append(createControl('text', {
        'id': 'id'
      }, ['']));
      
      

      function createControl(type, keys, data, options) {
        controlCounter++;
        var $control = $('<div class="control"><div class="control__left"></div><div class="control__right"></div></div>');

        var $label, $input;
        if (Object.keys(keys).length > 1) {
          $label = $('<select name="speed" id="speed"></select>');
          for (var key in keys) {
            $label.append('<option name="' + key + '">' + keys[key] + '</option>');
          }
          $label.selectmenu();
        } else {
          $label = $('<label for="control_' + controlCounter + '">' + Object.values(keys)[0] + '</label>');
        }

        $control.find('.control__left').append($label);

        switch (type) {
          case 'text':
            $input = $('<input type="text" />')

            break;

          case 'number':
            break;

          case 'color':
            break;

          case 'file':
            break;

          case 'select':
            break;
        }

        $control.find('.control__right').append($input);

        return $control;

      }

    }



  }

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

});