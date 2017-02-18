"use strict";
$(function () {
  app.e.events = function () {
    
    this.e = [];  
    
    var eventArr = this.e;   
    var $documents__content = app.e.$documents__content;
    
    this.bind = function(obj){
      var add = true;
      for (var i=0; i < eventArr.length; i++){
        if (eventArr[i].name === name) {
          add = false;
          break;
        } 
      }
      if (add) eventArr.push(obj);
      return (add ) ? obj : null;
    }
    
    this.unbind = function(name){
      for (var i=0; i < eventArr.length; i++){
        if (eventArr[i].name !== name) continue;
        var event = eventArr[i];
        eventArr.splice(i, 1);
        return event;
      }
    }
                
    function update(type, e){
      for (var i=0; i < eventArr.length; i++){
        if ( eventArr[i].type !== type ) continue;
        eventArr[i].event(e);
      }
    }
    
    $(window).add($documents__content).on('click', function (e) {
      update('click', e);
      
    }).on('mouseup', function (e) {
      update('mouseup', e);
      
    }).on('mouseout', function (e) {
      update('mouseout', e);
      
    }).on('mouseover', function (e) {
      update('mouseover', e);
      
    }).on('mousemove', function (e) {
      update('mousemove', e);
      
    }).on('mouseleave', function (e) {
      update('mouseleave', e);
      
    }).on('mouseenter', function (e) {
      update('mouseenter', e);
      
    }).on('mousedown', function (e) {
      update('mousedown', e);
      
    }).on('dblclick', function (e) {
      update('dblclick', e);
      
    }).on('keydown', function (e) {
      update('keydown', e);
      
    }).on('keypress', function (e) {
      update('keypress', e);
      
    }).on('keyup', function (e) {
      update('keyup', e);
      
    }).on('scroll', function (e){
      update('scroll', e);
      
    }).on('resize', function (e){
      update('resize', e);
      
    }).on('load', function (e){
      update('load', e);
      
    });

  };

});