Screw.Unit(function () {
    describe("JC.DraggableView", function () {
        var draggable;
        before(function() {
            TH.insertDomMock("draggable");
            TH.simulateEvent("mousedown", $("draggable"));
            draggable = JC.Draggable.find("draggable");
        });
        
        it("should listen to JC.Draggable", function () {
            expect(JC.DraggableView.model).to(equal, JC.Draggable);
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
