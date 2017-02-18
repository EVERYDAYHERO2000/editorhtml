"use strict";

var app = {};
var TEXT, L;

app.ui = {};


app.settings = {
  title: null,
  window: {
    sidebarWidth: null,
    windowWidth: null,
  },
  lang: null
};

app.jslibs = {
  $: $,
  _: _,
  less: less
}

app.translate = {};

app.f = {};

app.e = {};

app.document = {};

$(function () {

  app.create = function () { 
    loadSettings(create);
  }
  
  app.close = function(){
    
  }

  function create() {
    document.title = app.settings.title;
    //console.clear();

    //main app blocks
    app.e.$frame__viewer = $('<div class="frame__viewer"></div>');
    app.e.$frame__sidebar = $('<div class="frame__sidebar"></div>');
    app.e.$documents = $('<div class="documents"></div>');
    app.e.$statusbar = $('<div class="statusbar"></div>');
    app.e.$documents__browser = $('<iframe scrolling="no" class="documents__browser"></iframe>');
    app.e.$documents__content;
    app.e.$selectedElement = null;
    app.e.$helpers;
    app.e.$sidebar__activeTab = null;

    $('head').append(
      '<link rel="shortcut icon" href="/appres/icon/icon-16.png" type="image/x-icon">' +
      '<link rel="icon" href="/appres/icon/icon-16.png" type="image/x-icon" sizes="16x16">' +
      '<link rel="icon" href="/appres/icon/icon-32.png" type="image/x-icon" sizes="32x32">' +
      '<meta name="viewport" content="user-scalable=NO, width=device-width, initial-scale=1.0">'
    );

    $('body').append(
      '<div class="app">' +
      '<div class="app__menu"></div>' +
      '<div class="app__frame"></div>' +
      '</div>'
    );

    
    app.ui.mainMenu = new app.f.mainMenu();
    app.ui.tools = new app.f.tools();
    
    
    
    $('.app__frame').append( app.ui.tools.elem, app.e.$frame__viewer, app.e.$frame__sidebar );
    $('.app__menu').append( app.ui.mainMenu.elem );
    app.e.$frame__viewer.append(app.e.$documents, app.e.$statusbar);

    $(document).on('dragstart', 'a', function () {
      return false;
    });


    app.f.setSidebar();

    app.f.loadProject();

    
    
  }

  function loadSettings(callback) {
    var settingsData, langData;
    $.when(
      $.getJSON('../settings.json', function (data) {
        settingsData = data;
      }),
      $.getJSON('../appres/lang/lang.json', function (data) {
        langData = data;
      })
    ).then(function () {
      app.settings = settingsData;
      app.translate = langData;

      TEXT = app.translate;
      L = app.settings.lang;

      callback();
    });
  };


});