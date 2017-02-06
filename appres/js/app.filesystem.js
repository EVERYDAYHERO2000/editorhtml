"use strict";
$(function () {

  app.f.loadProject = function () {
    app.f.setViewer();

    var $documents__browser = app.e.$documents__browser;

    $documents__browser.attr('src', '../appres/template/page/page.html');

    $documents__browser.on('load', function () {
      app.e.$documents__content = $documents__browser.contents();

      $.get('../appres/template/page/adobe.html', function (data) {
        var $documentBody = app.e.$documents__content.find('body').html(data);

        app.f.getDocumentTree();
        app.f.setHelpers();
        app.f.setStatusBar();
        app.f.setUndoManager();
      });

    });
  }

  app.f.loadSettings = function (callback) {
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