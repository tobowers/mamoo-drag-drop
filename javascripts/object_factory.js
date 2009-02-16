if (!("JC" in window)) {
    JC = {};
}

JC.ObjectFactory = MBX.JsModel.create("ObjectFactory", {
    primaryKey: 'id',
        
    elementFromEvent: function (evt) {
        var el = evt.target;
        if (!el.hasClassName("object_factory")) {
            el = el.up(".object_factory");
        }
        return el;
    },
    
    findOrCreateObjectFactory: function (el) {
        var id = el.identify();
        var obj = this.find(id);
        if (obj) {
            return obj;
        } else {
            return this.create({id: id});
        }
    },
    
    handleMousedown: function (evt) {
        evt.stop();
        var el = this.elementFromEvent(evt);
        this.set("currentlyCreating", this.findOrCreateObjectFactory(el));
        this.subscribeToMouseMove();
    },
    
    handleMouseMove: function (evt) {
        var objectFactory = this.get("currentlyCreating");
        var x = evt.pageX;
        var y = evt.pageY;
        if (objectFactory && !objectFactory.isWithinUi(x,y)) {
            this.unsubscribeMouseMove();
            objectFactory.buildAt(x,y);
            this.set("currentlyCreating", null);
        }
    },
    
    subscribeToMouseMove: function () {
        document.observe("mousemove", this.handleMouseMove.bind(this));
    },
    
    unsubscribeMouseMove: function () {
        document.stopObserving("mousemove");
    },
    
    instanceMethods: {
        afterCreate: function () {
            this.set("uiElement", $(this.get('id')));
            this.set("objectCreator", this.parseClassForCreator());
        },
        parseClassForCreator: function () {
            var el = this.get('uiElement');
            var classes = el.className;
            var creatorString = classes.match(/object_factory_creates_([^\s]+)/);
            if (!creatorString) {
                throw new Error("you must have a class of object_factory_creates_<object> on your object factories");
            }
            return JC[creatorString[1]];
        },
        isWithinUi: function (x,y) {
            var xcomp = x;
            var ycomp = y;
            var element = this.get("uiElement");
            var offset = Element.cumulativeOffset(element);

            return (y >= offset[1] &&
                    y <  offset[1] + element.offsetHeight &&
                    x >= offset[0] &&
                    x <  offset[0] + element.offsetWidth);
        },
        buildAt: function (x,y) {
            var obj = this.get("objectCreator").createAt(x,y);
            var draggable = JC.Draggable.findOrCreateDraggable(obj.get("uiElement"));
            var currentLocation = obj.get("currentLocation");
            draggable.startDrag(currentLocation.x, currentLocation.y);
        }
    },
    
    initialize: function () {
        MBX.EventHandler.subscribe(".object_factory", "mousedown", this.handleMousedown.bind(this));
    }
    
    
});
