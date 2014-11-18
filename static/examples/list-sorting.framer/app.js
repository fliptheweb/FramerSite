(function() {
  var Layers, bg, canvas, getFrameByIndex, getIndexByFrame, i, layer, layerAtIndex, listHeight, listWidth, yDistance, _i;

  listWidth = 320;

  listHeight = 90;

  yDistance = listHeight + 10;

  bg = new BackgroundLayer({
    backgroundColor: "#eee"
  });

  canvas = new Layer({
    width: listWidth,
    height: 400,
    backgroundColor: "transparent",
    clip: false
  });

  canvas.center();

  Layers = [];

  getFrameByIndex = function(index) {
    return {
      y: index * yDistance,
      height: listHeight
    };
  };

  getIndexByFrame = function(frame) {
    var index;
    return index = parseInt((frame.y + (frame.height / 2)) / yDistance);
  };

  layerAtIndex = function(index) {
    var layer, _i, _len;
    for (_i = 0, _len = Layers.length; _i < _len; _i++) {
      layer = Layers[_i];
      if (layer.listIndex === index) {
        return layer;
      }
    }
  };

  for (i = _i = 0; _i <= 3; i = ++_i) {
    layer = new Layer({
      width: listWidth,
      height: listHeight,
      y: i * yDistance,
      clip: false,
      borderRadius: "4px",
      superLayer: canvas
    });
    layer.listIndex = i;
    layer.draggable.enabled = true;
    layer.draggable.speedX = 0;
    layer.draggable.speedY = 1;
    layer.backgroundColor = "rgba(255,255,255,1)";
    layer.html = layer.listIndex + 1;
    layer.style.color = "#999";
    layer.style.lineHeight = listHeight + 6 + "px";
    layer.style.paddingLeft = "32px";
    layer.style.fontSize = "24px";
    layer.style.fontWeight = "400";
    layer.shadowY = 1;
    layer.shadowBlur = 2;
    layer.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
    Layers.push(layer);
    layer.on(Events.DragMove, function(event, layer) {
      var currentIndex, hoveredLayer;
      currentIndex = getIndexByFrame(layer.frame);
      if (currentIndex !== layer.listIndex && currentIndex >= 0 && currentIndex <= 3) {
        hoveredLayer = layerAtIndex(currentIndex);
        hoveredLayer.listIndex = layer.listIndex;
        layer.listIndex = currentIndex;
        layer.html = layer.listIndex + 1;
        hoveredLayer.html = hoveredLayer.listIndex + 1;
        hoveredLayer.animateStop();
        return hoveredLayer.animate({
          properties: getFrameByIndex(hoveredLayer.listIndex),
          curve: "spring(300,40,0)"
        });
      }
    });
    layer.on(Events.DragStart, function(event, layer) {
      var currentIndex;
      currentIndex = getIndexByFrame(layer.frame);
      layer.bringToFront();
      layer.shadowColor = "rgba(0,0,0,0.2)";
      layer.animate({
        properties: {
          shadowY: 16,
          shadowBlur: 32
        },
        curve: "ease",
        time: 0.4
      });
      return layer.animate({
        properties: {
          scale: 1.1
        },
        curve: "spring(600,50,0)"
      });
    });
    layer.on(Events.DragEnd, function(event, layer) {
      var currentIndex;
      layer.animateStop();
      layer.animate({
        properties: {
          scale: 1
        },
        curve: "spring(300,50,0)"
      });
      currentIndex = getIndexByFrame(layer.frame);
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      if (currentIndex > 3) {
        currentIndex = 3;
      }
      layer.animate({
        properties: {
          shadowY: 1,
          shadowBlur: 2,
          y: currentIndex * yDistance
        },
        curve: "spring(300,40,0)"
      });
      return Utils.delay(0.4, function() {
        return layer.shadowColor = "rgba(0,0,0,0.2)";
      });
    });
  }

}).call(this);
