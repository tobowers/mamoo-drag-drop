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
        $$(".droppable").each(function (el) {
            this.findOrCreateByElement(el);
        }.bind(this));
    },
    
    instanceMethods: {
        afterCreate: function () {
            this.set("uiElement", $(this.get('id')));
            this.subscribeToEvents();
        },
        
        handleMouseover: function () {
            if (JC.Draggable.get("currentlyDragging")) {
                this.get("uiElement").addClassName("draggable_over");
            }
        },
        
        handleMouseout: function () {
            if (JC.Draggable.get("currentlyDragging")) {
                this.get("uiElement").removeClassName("draggable_over");
            }
        },
        
        subscribeToEvents: function () {
            var el = this.get("uiElement");
            var id = el.identify();
            var cssId = "#" + id;
            MBX.EventHandler.subscribe(cssId, "mouseover", this.handleMouseover.bind(this));
            MBX.EventHandler.subscribe(cssId, "mouseout", this.handleMouseout.bind(this));
            
        }
    }
    
});
