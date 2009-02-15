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
       var draggable = this.get("currentlyDragging");
       if (draggable) {
           draggable.setPosition(evt.pageX, evt.pageY);
       }
   },
   
   handleMouseUp: function (evt) {
       console.log('mouseup');
       if (this.get("currentlyDragging")) {
           this.get("currentlyDragging").stopDrag();
       }
   },
   
   subscribeToMouseMove: function () {
       document.body.observe("mousemove", this.handleMouseMove.bind(this));
   },
   
   unsubscribeMouseMove: function () {
       document.body.stopObserving("mousemove");
   },
   
   instanceMethods: {
       beforeCreate: function () {
           this.set("uiElement", $(this.get("id")));
       },
       
       startDrag: function () {
           this.get("uiElement").absolutize();
           this.parentClass.set("currentlyDragging", this);
           this.parentClass.subscribeToMouseMove();
           console.log('set parent classes currentlyDragging');
       },
       
       stopDrag: function () {
           this.parentClass.set("currentlyDragging", null);
           this.parentClass.unsubscribeMouseMove();
       },
       
       setPosition: function (x, y) {
           this.get("uiElement").setStyle({left: x, top: y});
       }
   },
   
   initialize: function () {
       MBX.EventHandler.subscribe(".draggable", "mousedown", this.startDrag.bind(this));
       MBX.EventHandler.subscribe(".jc", "mouseup", this.handleMouseUp.bind(this));
   }
    
});