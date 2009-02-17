JC.Trash = MBX.JsModel.create("Trash", {
   handleDrop: function (evt) {
       var droppable = evt.droppable;
       if (droppable.get('uiElement').hasClassName("trash")) {
           var draggable = evt.draggable;
           JC.BlackBox.find(draggable.get('uiElement').id).destroy();
       }
   },
   
   initialize: function () {
       MBX.EventHandler.subscribe(JC.Droppable, "droppable_dropped", this.handleDrop.bind(this));
   }
   
    
});