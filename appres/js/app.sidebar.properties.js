"use strict";

$(function(){
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
          type : 'text',
          id : 'control_id',
          name : TEXT['id'][L],
          data : [ 
            {
              value : elem.attr('data-id')
            } 
          ],
          set : function(val){
            elem.attr('data-id',val);
          }
        })
      );
      
      var style = {
        name : TEXT['style'][L],
        groups : [
          [
            {
              type : 'number',
              name : TEXT['opacity'][L],
              data : [
                {
                  value : ''
                }
              ],
              options : {
                min : 0,
                max : 1
              },
              set : function(val){
                
              }
            }
          ],
          [
            {
              type : 'select',
              name : TEXT['blending'][L],
              data : [
                {
                  value : 'normal'
                }
              ],
              options : {
                
              },
              set : function(val){
                
              }
            }
          ],
          [
            {
              type : 'number',
              name : TEXT['border-radius'][L],
              data : [
                {
                  value : ''
                }
              ],
              options : {
                
              },
              set : function(val){
                
              }
            }
          ]
        ]
      }
      
      var layout = {
        name : TEXT['layout'][L],
        groups : [
        [
          {
            type : 'select',
            id : 'control_vertical',
            name : TEXT['vertical'][L],
            data : [ 
              { 
                key : TEXT['top'][L], 
                value : 'top'
              }, 
              {
                key : TEXT['bottom'][L], 
                value : 'bottom'
              }
            ],
            set : function(val){
              
            }
          },
          {
            type : 'number',
            name : '',
            data : [
              {
                value : parseInt(elem[0].style.top) 
              }
            ],
            options : {
              unit : ['px','%']
            },
            set : function(val){
              
            }
          }
        ],
        [
          {
            type : 'select',
            id : 'control_horizontal',
            name : TEXT['horizontal'][L],
            data : [ 
              { 
                key : TEXT['left'][L], 
                value : 'left'
              }, 
              {
                key : TEXT['right'][L], 
                value : 'right'
              }
            ],
            set : function(val){
              
            }
          },
          {
            type : 'number',
            name : '',
            data : [
              {
                value : parseInt(elem[0].style.left) 
              }
            ],
            options : {
              unit : ['px','%']
            },
            set : function(val){
              
            }
          }          
        ],
        [
          {
            type : 'number',
            name : TEXT['width'][L],
            data : [
              {
                value : parseInt(elem[0].style.width)
              }
            ],
            options : {
              unit : ['px','%']
            },
            set : function(val){
              
            }
          }
        ],
        [
          {
            type : 'number',
            name : TEXT['height'][L],
            data : [
              {
                value : parseInt(elem[0].style.height) 
              }
            ],
            options : {
              unit : ['px','%']
            },
            set : function(val){
              
            }
          }
        ],
        [
          {
            type : 'number',
            name : TEXT['rotation'][L],
            data : [
              {
                value : ''
              }
            ],
            options : {
              unit : ['deg','rad'],
              reset : true,
              min : -360,
              max : 360
            },
            set : function(val){
              
            }
          }
        ]
      ]}
    
      
      $('.proppanel_main').append($id);
      $('.proppanel_props').append( createPanel( layout ), createPanel( style ) );
      

      function createPanel(obj){
        var name = obj.name || '';
        var groups = obj.groups;
        
        var $panel = $('<div class="proppanel__panel"><div class="proppanel__panelTitle">' + name + '</div></div>');
        //control group
        for (var i=0; i < groups.length; i++){
          var $group = $controlGroup.clone();
          //control
          for (var c=0; c < groups[i].length; c++){
            $group.append( createControl( groups[i][c] ) );
          }
          $panel.append( $group );
        }
        
        return $panel;
      }
      
      function getValue(id){
        return $('#' + id).val();
      }
      
      function createControl(obj) {
            
        controlCounter++;
        
        var id = obj.id || 'control_' + controlCounter;
        var type = obj.type || 'text';
        var name = obj.name || '';
        var data = obj.data || [{key : '', value : ''}];
        var options = obj.options || {};
        var set = obj.set || null
        
        var $control = $('<div class="control"><div class="control_left">'+
                         '</div><div class="control_right"></div>'+
                         '<div class="control_clear"></div></div>');

        var $label = $('<label for="' + id + '">' + name + '</label>');
        var $input;
        var $units;

        $control.find('.control_left').append($label);

        switch (type) {
          case 'text':
            $input = $('<input id="' + id + '" type="text" value="' + data[0].value + '" />')
            $input.on('change keyup', function(){
              var value = $(this).val();
              if (set !== null) set(value);
            });
            break;

          case 'number':
            $input = $('<input id="' + id + '" type="number" value="' + data[0].value + '" />')
            
            if (options.unit) {
              if (options.unit.length > 1){
                $units = $('<select class="unit"></select>');
                for (var u=0; u < options.unit.length; u++){
                  $units.append('<option>' + options.unit[u] + '</option>')
                }
              } else {
                $units = $('<div class="unit">' + options.unit[0] + '</div>');
              }
            } 
            
            $input.on('change keyup', function(){
              var value = $(this).val();
              if (set !== null) set(value);
            });
            break;

          case 'color':
            break;

          case 'file':
            break;

          case 'select':
            $input = $('<select name="' + id + '" id="' + id + '"></select>');
            for (var i=0; i < data.length; i++){
              $input.append('<option>' + data[i].key + '</option>');
            }
            break;
        }

        $control.find('.control_right').append($input, $units);

        return $control;

      }

    }



  }
})