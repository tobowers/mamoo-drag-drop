if (!("JC" in window)) {
    JC = {};
}

JC.Draggable = MBX.JsModel.create("Draggable", {
   primaryKey: 'id',
   
   elementFromEvent: function (evt) {
       var el = evt.target;
       if (!el.hasClassName("draggable")) {
           el = el.up(".draggable");
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
   
   handleMouseDown: function (evt) {
       evt.stop();
       //console.log("mousedown");
       var el = this.elementFromEvent(evt);
       var obj = this.findOrCreateDraggable(el);
       obj.startDrag(evt.pageX, evt.pageY);
   },
   
   handleMouseMove: function (evt) {
       //console.log('mousemove');
       var draggable = this.get("currentlyDragging");
       if (draggable) {
           draggable.updatePositionFromMouseMove(evt.pageX, evt.pageY);
       }
   },
   
   handleMouseUp: function (evt) {
       //console.log('mouseup');
       if (this.get("currentlyDragging")) {
           this.get("currentlyDragging").stopDrag();
       }
   },
   
   subscribeToMouseMove: function () {
       document.observe("mousemove", this.handleMouseMove.bind(this));
   },
   
   unsubscribeMouseMove: function () {
       document.stopObserving("mousemove");
   },
       
   styleToInteger: function (style) {
       return parseInt(style.sub("px", ""), 10);
   },
   
   instanceMethods: {
       beforeCreate: function () {
           this.set("uiElement", $(this.get("id")));
       },
       
       styleToInteger: function (style) {
           return this.parentClass.styleToInteger(style);
       },
       
       startDrag: function (x,y) {
           var uiElement = this.get("uiElement");
           uiElement.absolutize();
           this.parentClass.set("currentlyDragging", this);
           this.parentClass.subscribeToMouseMove();
           this.set("originalLocation", {
               x: this.styleToInteger(uiElement.getStyle("left")),
               y: this.styleToInteger(uiElement.getStyle("top"))
           });
           this.set("currentLocation", this.get("originalLocation"));
           this.set("mousePosition", {
               'x': x,
               'y': y
           });
       },
       
       stopDrag: function () {
           this.parentClass.set("currentlyDragging", null);
           this.parentClass.unsubscribeMouseMove();
       },
       
       updatePositionFromMouseMove: function (x, y) {
           var mousePosition = this.get("mousePosition");
           var currentLocation = this.get("currentLocation");
           xDiff = x - mousePosition.x;
           yDiff = y - mousePosition.y;
           this.set("currentLocation", {
               x: currentLocation.x + xDiff,
               y: currentLocation.y + yDiff
           });
           this.set("mousePosition", {
               x: x,
               y: y
           });
       }
   },
   
   initialize: function () {
       MBX.EventHandler.subscribe(".draggable", "mousedown", this.handleMouseDown.bind(this));
       MBX.EventHandler.subscribe(".jc", "mouseup", this.handleMouseUp.bind(this));
   }
    
});