$(function () {
  app.f.mainMenu = function () {
        
    var $mainmenu = $('<ul class="mainmenu"></ul>');
    var $mainmenu__item;
    var $mode;

    this.elem = $mainmenu;
    
    var menu = this.menu = [
      {
        name: TEXT['file'][L],
        items: [
          {
            name: TEXT['new'][L],
            event: ''
            },
          {
            name: TEXT['open'][L],
            event: ''
            },
          {
            name: TEXT['save'][L],
            event: ''
            },
          {
            name: TEXT['save_as'][L],
            event: ''
            },
          {
            name: TEXT['close'][L],
            event: ''
            },
          {
            name: TEXT['export_html'][L],
            event: ''
            },
          {
            name: TEXT['exit'][L],
            event: ''
            }
          ]
        },
      {
        name: TEXT['edit'][L],
        items: [
          {
            name: TEXT['cut'][L],
            event: ''
            },
          {
            name: TEXT['copy'][L],
            event: ''
            },
          {
            name: TEXT['paste'][L],
            event: ''
            }
          ]
        },
      {
        name: TEXT['view'][L],
        event: ''
        },
      {
        name: TEXT['help'][L],
        event: ''
        }
      ]

    var mode = [
      {
        name: TEXT['editor'][L],
        event: ''
      },
      {
        name: TEXT['preview'][L],
        event: ''
      }
    ]

    function buildMode(arr) {
      var items = '';
      for (var i = 0; i < arr.length; i++) {
        items += '<option>' + arr[i].name + '</option>';
      }
      return items;
    }

    function buildMenu(arr) {
      var items = '';
      for (var i = 0; i < arr.length; i++) {

        if ($.isArray(arr[i].items)) {
          items += '<li class="mainmenu__item">' + arr[i].name + '<ul class="mainmenu__submenu">' + buildMenu(arr[i].items) + '</ul></li>';
        } else {
          items += '<li class="mainmenu__item">' + arr[i].name + '</li>';
        }
      }
      return items;
    }
    
    
    app.e.$selectmode = $('<select id="selectmode" class="selectmode"></select>').append(buildMode(mode));
      
    $mainmenu.parent().append( app.e.$selectmode );
    
    app.e.$selectmode.selectmenu();
    
    $mainmenu__item = $(buildMenu(menu));
    $mainmenu.append($mainmenu__item);
    $mainmenu.menu();
    $mainmenu.mouseleave(function () {
      $mainmenu.menu('collapseAll');
    });
    
  };
});