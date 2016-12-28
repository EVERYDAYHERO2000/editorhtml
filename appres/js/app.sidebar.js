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
          name: TEXT['assets'][L],
          id: 'assets'
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
        active: app.settings.window.activeSidebarTab
      });
    }

    setTabs();
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
      toleranceElement: '> div'
    });

    $DOM.find('.ui-sortable-handle').on('mouseup', function (e) {
      $DOM.find('div').removeClass('ui-sortable-selected');
      $(this).addClass('ui-sortable-selected');
      
      app.f.slectElement( $(this).parent().data('node') );
      
      
      


    })

  }
  
  app.e.selectLayer = function(elem){
    $('#sidebarTabs-layers').find('li').each(function () {
        if ($(this).data('node')[0] === elem[0]) {
          //console.log($(this).data('node')[0],$(this)[0])
          $(this).find('div').first().mouseup();
        }
      });
  }

});