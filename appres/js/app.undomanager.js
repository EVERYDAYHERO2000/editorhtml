"use strict";
$(function () {
  
  app.f.setUndoManager = function(){
    app.undoManager = new UndoManager();
    app.undoManager.setLimit(10);
    app.undoManager.getState = function(){
      return app.e.$documents__content;
    }
  }
  
});