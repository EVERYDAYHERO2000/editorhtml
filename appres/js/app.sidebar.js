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



  

});