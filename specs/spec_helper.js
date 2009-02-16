TH.eventCountCache = {};
TH.eventSubscriptions = [];
    
TH.countEvent = function (eventName) {
    TH.Mock.eventCountCache[eventName] = 0;
    TH.eventSubscriptions.push(MBX.EventHandler.subscribe([MBX.cssNamespace, MBX], eventName, function () {
        TH.Mock.eventCountCache[eventName]++;
    }));
};
    
TH.eventCountFor = function (eventName) {
    return TH.Mock.eventCountCache[eventName];
};

TH.resetEventCount = function () {
    TH.Mock.eventCountCache = {};
    TH.eventSubscriptions.each(function (sub) {
        MBX.EventHandler.unsubscribe(sub);
    });
    TH.Mock.eventSubscriptions = [];
};

TH.mouseMove = function (x,y) {
    var event;
    if (window.ActiveXObject) {
         event = document.createEventObject();
         event.pageX = x;
         event.pageY = y;
         document.body.fireEvent("on"+eventType, event);
     } else {
         event = document.createEvent("MouseEvents");
         event.initMouseEvent("mousemove", true, true, window, 1, x, y, x, y, false, false, false, false, 0, null);
         document.body.dispatchEvent(event);
     }
};

Screw.Matchers.be_near = {
     match: function(expected, actual) {
         if (!Object.isArray(expected)) {
             expected = [expected, 1];
         }
         return (actual < expected[0] + expected[1]) || (actual > expected[0] - expected[1]);
     },
     
     failure_message: function(expected, actual, not) {
       return 'expected ' + $.print(actual) + (not ? ' to not be within 1 of ' : ' to be within 1 of ') + expected;
     }
};

Screw.Unit(function() {
    before(function() {
        TH.resetEventCount();
        if (MBX.Queue) {
            MBX.Queue.findAll().each(function (q) {
                q.destroy();
            });
        }

    });
});
