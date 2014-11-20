(function() {
  var bg, layerA, originX, originY;

  bg = new BackgroundLayer({
    backgroundColor: "#fff"
  });

  layerA = new Layer({
    width: 200,
    height: 200,
    image: "images/avatar.png",
    borderRadius: 150
  });

  layerA.style.border = "4px solid #fff";

  layerA.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

  layerA.center();

  originX = layerA.x;

  originY = layerA.y;

  window.onresize = function() {
    layerA.center();
    originX = layerA.x;
    return originY = layerA.y;
  };

  layerA.draggable.enabled = true;

  layerA.draggable.speedX = 0.25;

  layerA.draggable.speedY = 2;

  layerA.on(Events.DragEnd, function() {
    return layerA.animate({
      properties: {
        x: originX,
        y: originY
      },
      curve: "spring(300,18,10)"
    });
  });

}).call(this);
