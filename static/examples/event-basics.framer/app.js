(function() {
  var bg, layerA, layerB;

  bg = new BackgroundLayer({
    backgroundColor: "#818B9E"
  });

  layerA = new Layer({
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 4
  });

  layerA.center();

  layerA.x -= 50;

  layerB = new Layer({
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 4
  });

  layerB.center();

  layerB.x += 50;

  layerA.on(Events.Click, function() {
    return layerA.animate({
      properties: {
        rotation: this.rotation + 90
      },
      curve: "ease",
      time: 1
    });
  });

  layerB.on(Events.TouchStart, function() {
    return layerB.animate({
      properties: {
        rotation: 90,
        scale: 0.8
      },
      curve: "ease",
      time: 0.5
    });
  });

  layerB.on(Events.TouchEnd, function() {
    return layerB.animate({
      properties: {
        rotation: 0,
        scale: 1
      },
      curve: "ease",
      time: 0.5
    });
  });

}).call(this);
