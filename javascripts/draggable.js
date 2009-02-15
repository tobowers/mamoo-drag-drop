Draggable = MBX.JsModel.create("Draggable", {
   primaryKey: 'id',
   
   elementFromEvent: function (evt) {
       var el = evt.target;
       if (!el.hasClassName("draggable")) {
           el = el.up("draggable");
       }
       return el;
   },
   
   findOrCreateDraggable: function (el) {
       var obj = this.find(el.identify());
       if (obj) {
           return obj;
       } else {
           return this.create({id: el.identify()});
       }
   },
   
   startDrag: function (evt) {
       console.log("mousedown");
       var el = this.elementFromEvent(evt);
       var obj = this.findOrCreateDraggable(el);
       obj.startDrag();
   },
   
   handleMouseMove: function (evt) {
       console.log('mousemove');
       if (this.get("currentlyDragging")) {
           console.dir(evt);
       }
   },
   
   handleMouseUp: function (evt) {
       console.log('mouseup');
       if (this.get("currentlyDragging")) {
           this.get("currentlyDragging").stopDrag();
       }
   },
   
   instanceMethods: {
       beforeCreate: function () {
           this.set("uiElement", $(this.get("id")));
       },
       
       startDrag: function () {
           this.get("uiElement").absolutize();
           this.parentClass.set("currentlyDragging", this);
           console.log('set parent classes currentlyDragging');
       },
       
       stopDrag: function () {
           this.parentClass.set("currentlyDragging", null);
       }
   },
   
   initialize: function () {
       MBX.EventHandler.subscribe(".draggable", "mousedown", this.startDrag.bind(this));
       MBX.EventHandler.onDomReady(function () {
           MBX.EventHandler.subscribe(document.body, "mousemove", this.handleMouseMove.bind(this));
           MBX.EventHandler.subscribe(document.body, "mouseup", this.handleMouseUp.bind(this));
       }.bind(this));
   }
    
});