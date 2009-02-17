JC.Droppable = MBX.JsModel.create("droppable", {
    primaryKey: 'id',
    
    findOrCreateByElement: function (el) {
        var id = el.identify();
        if (this.find(id)) {
            return this.find(id);
        } else {
            return this.create({id: id});
        }
    },
    
    update: function () {
        this.findAll().each(function (droppable) {
            droppable.destroy();
        });
        $$(".droppable").each(function (el) {
            this.findOrCreateByElement(el);
        }.bind(this));
    },
    
    instanceMethods: {
        afterCreate: function () {
            var uiElement = $(this.get('id'));
            this.set("uiElement", uiElement);
            
            this.set("offset", Element.cumulativeOffset(uiElement));
            this.set("offsetWidth", uiElement.offsetWidth);
            this.set("offsetHeight", uiElement.offsetHeight);
            this.set("dropSubscription", MBX.EventHandler.subscribe(JC.Draggable, "draggable_new_position", this.handleDrop.bind(this)));
            this.set("moveSubscription", MBX.EventHandler.subscribe(JC.Draggable, "draggable_move", this.handleDraggableMove.bind(this)));
        },
        
        isWithinUi: function (x,y) {
            var xcomp = x;
            var ycomp = y;
            var offset = this.get("offset");

            return (y >= offset[1] &&
                    y <  offset[1] + this.get("offsetHeight") &&
                    x >= offset[0] &&
                    x <  offset[0] + this.get("offsetWidth"));
        },
        
        handleDraggableMove: function (evt) {
            if (this.isWithinUi(evt.x, evt.y)) {
                this.handleMouseover();
            } else {
                this.handleMouseout();
            }
        },
        
        handleMouseover: function () {
            if (JC.Draggable.get("currentlyDragging")) {                
                this.get("uiElement").addClassName("draggable_over");
            }
        },
        
        handleMouseout: function () {
            this.get("uiElement").removeClassName("draggable_over");
        },
        
        handleDrop: function (evt) {
            var draggable = evt.draggable;
            var location = draggable.get("currentLocation");
            if (this.isWithinUi(location.x, location.y)) {
                this.fireEvent("dropped", { draggable: evt.draggable });
                this.handleMouseout();
            }
        },
        
        fireEvent: function (evtType, opts) {
            evtType = "droppable_" + evtType;
            opts = opts || {};
            opts.droppable = this;
            MBX.EventHandler.fireCustom(this, evtType, opts);
            MBX.EventHandler.fireCustom(this.get("uiElement"), evtType, opts);
            MBX.EventHandler.fireCustom(this.parentClass, evtType, opts);
        },
        
        beforeDestroy: function () {
            if (this.get("dropSubscription")) {
                MBX.EventHandler.unsubscribe(this.get("dropSubscription"));
            }
            
            if(this.get('moveSubscription')) {
                MBX.EventHandler.unsubscribe(this.get('moveSubscription'));
            }
        }
    },
    
    initialize: function () {
        MBX.EventHandler.onDomReady(this.update.bind(this));
    }
    
});
