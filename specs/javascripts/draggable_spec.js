Screw.Unit(function () {
    describe("Draggable", function () {
        var draggable;
        before(function() {
            TH.insertDomMock("draggable");
            draggable = $("draggable");
        });
        
        describe("on mousedown", function () {
            before(function() {
                TH.simulateEvent("mousedown", draggable);
            });
            
            it("should absolutize the element", function () {
                expect(draggable.getStyle("position")).to(equal, "absolute");
            });
            
            describe("the created draggable object", function () {
                var draggableInstance;
                before(function() {
                    draggableInstance = Draggable.find(draggable.id);
                });
                
                it("should create a draggable object", function () {
                    expect(draggableInstance).to_not(be_null);
                });

                it("should assign the uiElement", function () {
                    expect(draggableInstance.get("uiElement").id).to(equal, draggable.id);
                });
                
                it("should get assigned to currentlyDragging", function () {
                    expect(Draggable.get("currentlyDragging")).to(equal, draggableInstance);
                });
                
                it("should assign the original location", function () {
                    var el = draggableInstance.get("uiElement");
                    expect(draggableInstance.get("originalLocation")).to(equal, {
                        x: el.getStyle("left").sub("px", ""),
                        y: el.getStyle("top").sub("px", "")
                    });
                });
                
                it("should set lastLocation", function () {
                    expect(draggableInstance.get("currentLocation")).to(equal, draggableInstance.get("originalLocation"));
                });
                
                it("should set mousePosition", function () {
                    //simulate event sends in 0,0
                    expect(draggableInstance.get("mousePosition")).to(equal, {
                        x: 0,
                        y: 0
                    });
                });
            });
            
        });
        
        describe("mousemove", function () {
            var originalPosition;
            var draggableInstance;
            before(function () {
                TH.simulateEvent("mousedown", draggable);
                draggableInstance = Draggable.get("currentlyDragging");
                originalPosition = draggableInstance.get("currentLocation");
            });
            
            describe("moving the mouse", function () {
                before(function() {
                    TH.mouseMove(10, 10);
                });
                
                it("should add the mousemove ammount to the currentLocation x", function () {
                    expect(draggableInstance.get("currentLocation").x).to(equal, originalPosition.x + 10);
                });
                
                it("should add the mousemove ammount to the currentLocation y", function () {
                    expect(draggableInstance.get("currentLocation").y).to(equal, originalPosition.y + 10);
                });
                
                it("should update the mousePosition", function () {
                    expect(draggableInstance.get("mousePosition")).to(equal, {
                        x: 10,
                        y: 10
                    });
                });
                
            });
            
        });
        
        describe("mouseup", function () {
            before(function() {
                TH.simulateEvent("mousedown", draggable);
                TH.simulateEvent("mouseup", document.body);
            });
            
            it("should unassign currentlyDragging", function () {
                expect(Draggable.get("currentlyDragging")).to(be_null);
            });
        });
        
    });
});