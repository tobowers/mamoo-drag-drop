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
    
    handleDraggingElement: function (evt) {
        this.findAll().each(function (droppable) {
            if (droppable.isWithinUi(evt.x, evt.y)) {
                droppable.handleMouseover();
            } else {
                droppable.handleMouseout();
            }
        });
    },
    
    instanceMethods: {
        afterCreate: function () {
            var uiElement = $(this.get('id'));
            this.set("uiElement", uiElement);
            this.set("offset", Element.cumulativeOffset(uiElement));
            this.set("offsetWidth", uiElement.offsetWidth);
            this.set("offsetHeight", uiElement.offsetHeight);
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
        
        handleMouseover: function () {
            if (JC.Draggable.get("currentlyDragging")) {
                console.log("mouseover");
                
                this.get("uiElement").addClassName("draggable_over");
                this.listenForDrop();
            }
        },
        
        handleMouseout: function () {
            if (JC.Draggable.get("currentlyDragging")) {
                console.log("mouseout");
                
                this.get("uiElement").removeClassName("draggable_over");
                this.stopListeningForDrop();                
            }
        },
        
        handleDrop: function () {
            console.log("drop");
            this.fireEvent("dropped");
        },
        
        listenForDrop: function () {
            if (!this.get("dropSubscription")) {
                this.set("dropSubscription", MBX.EventHandler.subscribe(JC.Draggable, "draggable_new_position", this.handleDrop.bind(this)));
                this.set("itemToBeDropped", JC.Draggable.get("currentlyDragging"));
            }
        },
        
        stopListeningForDrop: function () {
            var sub = this.get('dropSubscription');
            if (sub) {
                MBX.EventHandler.unsubscribe(sub);
                this.set("itemToBeDropped", null);
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
        }
    },
    
    initialize: function () {
        MBX.EventHandler.onDomReady(this.update.bind(this));
        MBX.EventHandler.subscribe(JC.Draggable, "draggable_move", this.handleDraggingElement.bind(this));
    }
    
});
