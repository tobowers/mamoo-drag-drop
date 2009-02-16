Screw.Unit(function () {
    describe("JC.Droppable", function () {
        before(function() {
            TH.insertDomMock("droppable");
            JC.Droppable.update();
        });
        
        after(function () {
            JC.Draggable.set("currentlyDragging", null);
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
                    JC.Draggable.set("currentlyDragging", {someObj: 'hi'});
                    MBX.EventHandler.fireCustom($("droppable"), "mouseover");
                });
                
                it("should add a class of draggable_over", function () {
                    expect($("droppable").hasClassName("draggable_over")).to(be_true);
                });
                
                describe("and then moving out of the box", function () {
                    before(function() {
                        MBX.EventHandler.fireCustom($("droppable"), "mouseout");
                    });
                    
                    it("should remove the class draggable over", function () {
                        expect($("droppable").hasClassName("draggable_over")).to(be_false);
                    });
                    
                });
                
            });
            
            describe("dropping a draggable on a droppable", function () {
                before(function() {
                    
                });
                
                
            });
            
        });
        
    });
});