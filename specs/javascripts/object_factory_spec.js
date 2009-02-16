Screw.Unit(function () {
    describe("JC.ObjectFactory", function () {
        var called;
        before(function () {
            called = {};
            TH.insertDomMock("object_factory");
            JC.FakeObject = JC.FactoryItem("FakeObject");
        });
        
        after(function () {
            MBX.JsModel.destroyModel("FakeObject");
        });
        
        it("should have a primary key of id", function () {
            expect(JC.ObjectFactory.primaryKey).to(equal, 'id');
        });
        
        describe("clicking and dragging", function () {
            before(function () {
                TH.simulateEvent("mousedown", $("object_factory"));
            });
            
            it("should create the object factory", function () {
                expect(JC.ObjectFactory.find("object_factory")).to_not(be_null);
            });
            
            describe("the object factory instance", function () {
                var objectInstance;
                before(function() {
                    objectInstance = JC.ObjectFactory.find("object_factory");
                });
                
                it("should assign the correct creator", function () {
                    expect(objectInstance.get("objectCreator").modelName).to(equal, JC.FakeObject.modelName);
                });
                
                it("should get assigned to currentlyCreating", function () {
                    expect(JC.ObjectFactory.get("currentlyCreating")).to(equal, objectInstance);
                });
                
            });
            
            describe("when the mouse moves out of the creator", function () {
                before(function() {
                    TH.mouseMove(500, 500);
                });
                
                it("should unset currentlyCreating", function () {
                    expect(JC.ObjectFactory.get("currentlyCreating")).to(be_null);
                });
                
            });

            
            
        });
        
    });
});