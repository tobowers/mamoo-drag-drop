DraggableView = MBX.JsView.create({
    model: Draggable,
    
    onInstanceChange: function (draggable, key) {
        if (key == "currentLocation") {
            var currentLocation = draggable.get("currentLocation");
            draggable.get("uiElement").setStyle({top: currentLocation.y + "px", left: currentLocation.x + "px"});
        }
    }
});
