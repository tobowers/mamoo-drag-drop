Screw.Unit(function () {
    describe("JC.Droppable", function () {
        before(function() {
            TH.insertDomMock("droppable");
            JC.Droppable.update();
        });
        
        after(function () {
            JC.Draggable.set("currentlyDragging", null);
            JC.Draggable.flush();
            JC.Droppable.findAll().each(function (droppable) {
                droppable.destroy();
            });
        });
        
        it("should have a primaryKey of id", function () {
            expect(JC.Droppable.primaryKey).to(equal, 'id');
        });
        
        it("should update itself from ui elements", function () {
            expect(JC.Droppable.findAll().length).to(equal, 1);
        });
        
        describe("droppable instance", function () {
            var instance;
            before(function() {
                instance = JC.Droppable.find('droppable');
            });
            
            it("should have a uiElement", function () {
                expect(instance.get("uiElement").id).to(equal, 'droppable');
            });
            
            describe("moving a droppable over the element", function () {
                before(function() {
                    JC.Draggable.set("currentlyDragging", JC.Draggable.findOrCreateDraggable($("draggable")));
                    //TODO: move the mouse above the droppable
                });
                
                it("should add a class of draggable_over", function () {
                    expect($("droppable").hasClassName("draggable_over")).to(be_true);
                });
                
                it("should set the itemToBeDropped", function () {
                    expect(instance.get("itemToBeDropped")).to(equal, JC.Draggable.get("currentlyDragging"));
                });
                
                describe("and then moving out of the box", function () {
                    before(function() {
                        //TODO: move the mouse out of the droppable
                    });
                    
                    it("should remove the class draggable over", function () {
                        expect($("droppable").hasClassName("draggable_over")).to(be_false);
                    });
                    
                    it("should clear the itemToBeDropped", function () {
                        expect(instance.get("itemToBeDropped")).to(be_null);
                    });
                    
                });
                
            });
            
            describe("dropping a draggable on a droppable", function () {
                var eventFired;
                before(function() {
                    MBX.EventHandler.subscribe("#droppable", "droppable_dropped", function (evt) {
                        eventFired = evt;
                    })
                    JC.Draggable.set("currentlyDragging", JC.Draggable.findOrCreateDraggable($("draggable")));
                    //TODO: move the mouse within the droppable element;
                });
                
                it("should fire the droppable_dropped event", function () {
                    expect(eventFired).to(be_true);
                });
                
                
            });
            
        });
        
    });
});