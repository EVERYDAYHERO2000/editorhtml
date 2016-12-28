"use strict";
$(function () {
  app.f.setTools = function () {

    var $frame__tools = app.e.$frame__tools;
    var $toolButton = $('<button class="tools__button"></button>');
    var tools = [
      {
        title: TEXT['div'][L],
        event: '',
        icon: '../appres/img/icons/tool_div.svg',
        },
      {
        title: TEXT['text'][L],
        event: '',
        icon: '../appres/img/icons/tool_text.svg',
        },
      {
        title: TEXT['image'][L],
        event: '',
        icon: '../appres/img/icons/tool_image.svg',
        },
      {
        title: TEXT['forms'][L],
        event: '',
        icon: '../appres/img/icons/tool_form.svg',
        },
      {
        title: TEXT['widgets'][L],
        event: '',
        icon: '../appres/img/icons/tool_widget.svg',
        },
      {
        title: TEXT['html'][L],
        event: '',
        icon: '../appres/img/icons/tool_html.svg',
        }
      ]

    for (var i = 0; i < tools.length; i++) {
      var $button = $toolButton.clone().appendTo($frame__tools);
      $button.attr('title', tools[i].title).button();
      $button.css({
        'background-image': 'url(' + tools[i].icon + ')'
      })
    }

  }
});