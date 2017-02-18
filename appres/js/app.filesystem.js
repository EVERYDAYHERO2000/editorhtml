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

        app.events = new app.e.events();
        
        app.f.getDocumentTree();
        app.f.setHelpers();
        app.f.setStatusBar();
        app.f.setUndoManager();
        
        
      });

    });
  }

});