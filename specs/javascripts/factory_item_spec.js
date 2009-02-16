Screw.Unit(function () {
    describe("JC.FactoryItem", function () {
        var item;
        before(function () {
            item = JC.FactoryItem("AFactoryItem");
            
        });
        
        after(function () {
            MBX.JsModel.destroyModel(item.modelName);
        });
        
        it("should return a model of the right name", function () {
            expect(item.modelName).to(equal, "AFactoryItem");
        });
        
        it("should setup the classes", function () {
            expect(item.get("classes")).to(equal, "AFactoryItem draggable");
        });
        
        it("should add the template methods", function () {
            for (attr in JC.FactoryItem.template) {
                if (JC.FactoryItem.template.hasOwnProperty(attr)) {
                    expect(typeof JC.FactoryItem.template[attr]).to(equal, typeof item[attr]);
                }
            }
        });
        
        it("should have a cssSelectors function", function () {
            expect(item.cssSelectors()).to(equal, ".AFactoryItem.draggable");
        });
        
        describe("a default item", function () {
            describe("createAt", function () {
                var instance;
                before(function() {
                    instance = item.createAt(100,100);
                });
                
                it("should create a ui element", function () {
                    expect($$(item.cssSelectors()).length).to(equal, 1);
                });
                
                describe("the created element", function () {
                    var el;
                    before(function() {
                        el = $$(item.cssSelectors()).first();
                    });
                    
                    it("should absolutize the element", function () {
                        expect(el.getStyle('position')).to(equal, 'absolute');
                    });
                    
                    it("should be positioned at the passed in values", function () {
                        //100, 100 was passed in in a before
                        expect(el.getStyle('top')).to(equal, "100px");
                        expect(el.getStyle('left')).to(equal, "100px");
                    });
                    
                    it("should update current location with draggables", function () {
                        var fakeDraggable = {
                            get: function (key) {
                                if (key == "currentLocation") {
                                    return {x: 100, y: 100}
                                }
                            }
                        };
                        MBX.EventHandler.fireCustom(el, "draggable_new_position", {
                            draggable: fakeDraggable
                        });
                        expect(instance.get("currentLocation")).to(equal, {
                            x: 100,
                            y: 100
                        });
                        
                    });
                    
                });

                
            });
            
          
            
        });
        
    });
});