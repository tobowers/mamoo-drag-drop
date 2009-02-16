JC.FactoryItem = function (name, obj) {
    obj = obj || {};
    var model = MBX.JsModel.create(name, JC.FactoryItem.template);
    model.set("classes", name + " draggable");
    for (attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            if (attr = "instanceMethods") {
                for (meth in obj[attr]) {
                    if (obj[attr].hasOwnProperty(meth)) {
                        model[attr][meth] = obj[attr][meth];
                    }
                }
            } else {
                model[attr] = obj[attr];
            }
        }
    }
    return model;
};

JC.FactoryItem.template = {
    createAt: function (x,y) {
        return this.create({ currentLocation: {x: x, y:y }});
    },
    
    createUi: function (item) {
        var el = this.elementTemplate();
        document.body.appendChild(el);
        el.absolutize();
        // below is for positioning the mouse in the middle
        //var dimensions = el.getDimensions();
        var currentLocation = item.get("currentLocation");
        el.setStyle({top: currentLocation.y, left: currentLocation.x});
        el.show();
        return el;
    },
    
    cssSelectors: function () {
        return this.get("classes").gsub(/[^\s]+/, ".#{0}").gsub(/\s/, "");
    },
    
    elementTemplate: function (item) {
        return new Element("div", {'class': this.get("classes"), display: 'none'});
    },
    
    instanceMethods: {
        afterCreate: function () {
            var uiElement = this.parentClass.createUi(this);
            var currentLocation = this.get("currentLocation");
            this.set("uiElement", uiElement);
            this.subscribeToDraggableUpdates();
        },
        
        handleNewPosition: function (evt) {
            this.set("currentLocation", evt.draggable.get("currentLocation"));
        },
        
        subscribeToDraggableUpdates: function () {
            var id = this.get("uiElement").identify();
            MBX.EventHandler.subscribe("#" + id, "draggable_new_position", this.handleNewPosition.bind(this));
        }
    }
    
    
};
