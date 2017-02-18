"use strict";

$(function () {
  app.f.createProperties = function (elem) {

    var $frame__sidebar = app.e.$frame__sidebar;
    var $properties = $('#sidebarTabs-properties');

    if (elem === null) {
      $properties.empty();
    } else {
      if (app.e.$sidebar__activeTab !== null) build();
    }

    function build() {

      $properties.empty().append('<div class="proppanel proppanel_main"></div>' +
        '<div class="proppanel proppanel_props"></div>');

      var $controlGroup = $('<div class="controlGroup"></div>');

      var controlCounter = 0;

      var $id = $controlGroup.clone().append(
        createControl({
          type: 'text',
          id: 'control_id',
          name: TEXT['id'][L],
          get: elem.attr('data-id'),
          set: function (val) {
            elem.attr('data-id', val);
          }
        })
      );

      var style = {
        name: TEXT['style'][L],
        groups: [
          [
            {
              type: 'number',
              name: TEXT['opacity'][L],
              options: {
                min: 0,
                max: 1,
                step: 0.01
              },
              get: elem.css('opacity'),
              set: function (val) {
                elem.css({
                  'opacity': val
                })
              }
            }
          ],
          [
            {
              type: 'select',
              name: TEXT['blending'][L],
              data: [
                {
                  key: TEXT['normal'][L],
                  value: 'normal'
                },
                {
                  key: TEXT['multiply'][L],
                  value: 'multiply'
                },
                {
                  key: TEXT['screen'][L],
                  value: 'screen'
                },
                {
                  key: TEXT['overlay'][L],
                  value: 'overlay'
                },
                {
                  key: TEXT['darken'][L],
                  value: 'darken'
                },
                {
                  key: TEXT['lighten'][L],
                  value: 'lighten'
                },
                {
                  key: TEXT['color-dodge'][L],
                  value: 'color-dodge'
                },
                {
                  key: TEXT['color-burn'][L],
                  value: 'color-burn'
                },
                {
                  key: TEXT['hard-light'][L],
                  value: 'hard-light'
                },
                {
                  key: TEXT['soft-light'][L],
                  value: 'soft-light'
                },
                {
                  key: TEXT['difference'][L],
                  value: 'exclusion'
                },
                {
                  key: TEXT['hue'][L],
                  value: 'hue'
                },
                {
                  key: TEXT['saturation'][L],
                  value: 'saturation'
                },
                {
                  key: TEXT['color'][L],
                  value: 'color'
                },
                {
                  key: TEXT['luminosity'][L],
                  value: 'luminosity'
                },
                {
                  key: TEXT['inherit'][L],
                  value: 'inherit'
                }
              ],
              options: {

              },
              get: elem.css('mix-blend-mode'),
              set: function (val) {
                elem.css({
                  'mix-blend-mode': val
                });
              }
            }
          ],
          [
            {
              type: 'number',
              name: TEXT['border-radius'][L],
              data: [
                {
                  value: ''
                }
              ],
              options: {
                unit: ['px', '%']
              },
              set: function (val) {

              }
            }
          ]
        ]
      }

      var layout = {
        name: TEXT['layout'][L],
        groups: [
        [
            {
              type: 'select',
              id: 'control_vertical',
              name: TEXT['vertical'][L],
              data: [
                {
                  key: TEXT['top'][L],
                  value: 'top'
              },
                {
                  key: TEXT['bottom'][L],
                  value: 'bottom'
              }
            ],
              set: function (val) {

              }
          },
            {
              type: 'number',
              name: '',
              options: {
                unit: ['px', '%']
              },
              get: parseInt(elem[0].style.top),
              set: function (val) {

              }
          }
        ],
        [
            {
              type: 'select',
              id: 'control_horizontal',
              name: TEXT['horizontal'][L],
              data: [
                {
                  key: TEXT['left'][L],
                  value: 'left'
              },
                {
                  key: TEXT['right'][L],
                  value: 'right'
              }
            ],
              set: function (val) {

              }
          },
            {
              type: 'number',
              name: '',
              options: {
                unit: ['px', '%']
              },
              get: parseInt(elem[0].style.left),
              set: function (val) {

              }
          }
        ],
        [
            {
              type: 'number',
              name: TEXT['width'][L],
              options: {
                unit: ['px', '%']
              },
              get: parseInt(elem[0].style.width),
              set: function (val) {
                elem.css({
                  'width': val + 'px'
                })
              }
          }
        ],
        [
            {
              type: 'number',
              name: TEXT['height'][L],
              options: {
                unit: ['px', '%']
              },
              get: parseInt(elem[0].style.height),
              set: function (val) {
                elem.css({
                  'height': val + 'px'
                })
              }
          }
        ],
        [
            {
              type: 'number',
              name: TEXT['rotation'][L],
              options: {
                unit: ['deg', 'rad'],
                reset: true,
                min: -360,
                max: 360
              },
              get: app.f.getRotationDegrees(elem, 'deg'),
              set: function (val) {
                elem.css({
                  'transform': 'rotate(' + val + 'deg)'
                });
              }
          }
        ]
      ]
      }

      $('.proppanel_main').append($id);
      $('.proppanel_props').append(createPanel(layout), createPanel(style));


      function createPanel(obj) {
        var name = obj.name || '';
        var groups = obj.groups;

        var $panel = $('<div class="proppanel__panel"><div class="proppanel__panelTitle">' + name + '</div></div>');
        //control group
        for (var i = 0; i < groups.length; i++) {
          var $group = $controlGroup.clone();
          //control
          for (var c = 0; c < groups[i].length; c++) {
            $group.append(createControl(groups[i][c]));
          }
          $panel.append($group);
        }

        return $panel;
      }

      function getValue(id) {
        return $('#' + id).val();
      }

      function createControl(obj) {

        controlCounter++;

        var id = obj.id || 'control_' + controlCounter;
        var type = obj.type || 'text';
        var name = obj.name || '';
        var data = obj.data || null;
        var options = obj.options || {};
        var get = obj.get || '';
        var set = obj.set || null;

        var $control = $('<div class="control"><div class="control_left">' +
          '</div><div class="control_right"></div>' +
          '<div class="control_clear"></div></div>');

        var $input;
        var $units;
        var $label;

        switch (type) {
        case 'text':
          $input = $('<input id="' + id + '" type="text" value="' + get + '" />')

          break;

        case 'number':
          var min = ' min="' + options.min + '"' || '';
          var max = ' max="' + options.max + '"' || '';
          var step = ' step="' + options.step + '"' || '';

          $input = $('<input id="' + id + '" type="number" value="' + get + '"' + min + max + step + ' />');

          if (options.unit) {
            if (options.unit.length > 1) {
              $units = $('<select class="unit"></select>');
              for (var u = 0; u < options.unit.length; u++) {
                $units.append('<option>' + options.unit[u] + '</option>')
              }
            } else {
              $units = $('<div class="unit">' + options.unit[0] + '</div>');
            }
          }

          break;

        case 'color':
          break;

        case 'file':
          break;

        case 'select':
          $input = $('<select name="' + id + '" id="' + id + '"></select>');
          for (var i = 0; i < data.length; i++) {
            var selected = ( get === data[i].key ) ? ' selected="selected" ' : '';
            $input.append('<option' + selected + '>' + data[i].key + '</option>');
          }

          break;
        }

        $input.on('change keyup', function () {
          var value = $(this).val();
          if (set !== null) {
            set(value);
            app.f.selectElement(elem);
          }
        });

        $label = $('<label for="' + id + '">' + name + '</label>');

        $control.find('.control_left').append($label);
        $control.find('.control_right').append($input, $units);

        return $control;

      }
    }
  }
})