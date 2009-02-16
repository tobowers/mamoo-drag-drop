Screw.Unit(function () {
    describe("DraggableView", function () {
        var draggable;
        before(function() {
            TH.insertDomMock("draggable");
            TH.simulateEvent("mousedown", $("draggable"));
            draggable = Draggable.find("draggable");
        });
        
        it("should listen to Draggable", function () {
            expect(DraggableView.model).to(equal, Draggable);
        });
        
        describe("changing currentLocation", function () {
            
            before(function() {
                draggable.set("currentLocation", {
                    x: 100,
                    y: 100
                });
            });
            
            it("should set the top style", function () {
                expect(draggable.get("uiElement").getStyle("top")).to(equal, "100px");
            });
            
            it("should set the left style", function () {
                expect(draggable.get("uiElement").getStyle("left")).to(equal, "100px");
            });
            
        });
        
    });
});
