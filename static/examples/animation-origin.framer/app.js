(function() {
  var bg, layerA;

  bg = new BackgroundLayer({
    backgroundColor: "#28AFFA"
  });

  layerA = new Layer({
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 4
  });

  layerA.center();

  layerA.originX = 1;

  layerA.originY = 0;

  layerA.animate({
    properties: {
      rotation: 90
    },
    curve: "spring(200,30,0)"
  });

  layerA.on(Events.AnimationEnd, function() {
    return this.animate({
      properties: {
        rotation: 0
      },
      curve: "spring(200,10,0)"
    });
  });

}).call(this);
