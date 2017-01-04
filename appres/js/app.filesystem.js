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


        /*app.e.$documents__content.find('.editable').draggable({

          start: function (e, u) {

            var __this__ = $(e.currentTarget);
            $('#sidebarTabs-layers').find('li').each(function () {

              if ($(this).data('node')[0] === __this__[0]) {

                $(this).find('div').first().click();

              }
            })

          }
        }).on('mousedown', function (e) {

        });

        app.e.$documents__content.find('body').selectable({

        });*/
        

        app.f.getDocumentTree();
        app.f.setHelpers();
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