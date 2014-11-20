(function() {
  var bg, layerA, leftLine, leftThreshold, rightLine, rightThreshold;

  bg = new BackgroundLayer({
    backgroundColor: "#28AFFA"
  });

  layerA = new Layer({
    y: 100,
    backgroundColor: "#fff",
    borderRadius: 4
  });

  layerA.draggable.enabled = true;

  layerA.draggable.speedY = 0;

  leftThreshold = 160;

  rightThreshold = Screen.width - leftThreshold;

  leftLine = new Layer({
    width: 2,
    x: leftThreshold,
    y: 80,
    height: 140,
    backgroundColor: "#7ECFFC"
  });

  rightLine = new Layer({
    width: 2,
    x: rightThreshold,
    y: 80,
    height: 140,
    backgroundColor: "#7ECFFC"
  });

  layerA.states.add({
    left: {
      x: 80
    },
    right: {
      x: Screen.width - layerA.width - 80
    }
  });

  layerA.states.switchInstant("left");

  layerA.states.animationOptions = {
    curve: "spring(200,20,10)"
  };

  layerA.draggable.on(Events.DragEnd, function() {
    var thresholdBroken, velocityDirection;
    velocityDirection = layerA.draggable.calculateVelocity().x < 0 ? "left" : "right";
    thresholdBroken = layerA.states.current === "left" && layerA.x > leftThreshold ? true : false;
    thresholdBroken = layerA.states.current === "right" && layerA.maxX < rightThreshold ? true : thresholdBroken;
    if (thresholdBroken && velocityDirection !== layerA.states.current) {
      return layerA.states["switch"](velocityDirection);
    } else {
      return layerA.states["switch"](layerA.states.current);
    }
  });

}).call(this);
