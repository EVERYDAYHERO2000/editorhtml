"use strict";
$(function () {
    
  app.f.create = function () {
    document.title = app.settings.title;
    console.clear();
    

    app.e.$app = $('<div class="app"><div class="app__menu"></div><div class="app__frame"></div></div>');
    app.e.$frame__tools = $('<div class="frame__tools"></div>');
    app.e.$frame__viewer = $('<div class="frame__viewer"></div>');
    app.e.$frame__sidebar = $('<div class="frame__sidebar"></div>');
    app.e.$mainmenu = $('<ul class="mainmenu"></ul>');
    app.e.$documents = $('<div class="documents"></div>');
    app.e.$statusbar = $('<div class="statusbar"></div>');
    app.e.$documents__browser = $('<iframe scrolling="no" class="documents__browser"></iframe>');
    app.e.$documents__content;
    app.e.$selectedElement;
    app.e.$helpers;

    
    $('head').append('<link rel="shortcut icon" href="/appres/icon/icon-16.png" type="image/x-icon">'+
                     '<link rel="icon" href="/appres/icon/icon-16.png" type="image/x-icon" sizes="16x16">'+
                     '<link rel="icon" href="/appres/icon/icon-32.png" type="image/x-icon" sizes="32x32">'+
                     '<meta name="viewport" content="user-scalable=NO, width=device-width, initial-scale=1.0">');
    

    $('body').append(app.e.$app);
    $('.app__frame').append(app.e.$frame__tools, app.e.$frame__viewer, app.e.$frame__sidebar);
    $('.app__menu').append(app.e.$mainmenu);
    app.e.$frame__viewer.append(app.e.$documents, app.e.$statusbar);

    
    $(document).on('dragstart', 'a', function () {
      return false;
    });
    
    
    app.f.setTools();

    app.f.setMenu();

    app.f.setSidebar();

    app.f.loadProject();
    
    

  }
  
});

