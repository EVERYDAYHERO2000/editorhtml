"use strict";
$(function () {
  app.f.tools = function () {

    var $frame__tools = $('<div class="frame__tools"></div>');
    var $toolButton = $('<button class="tools__button"></button>');
    
    this.elem = $frame__tools;
    
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