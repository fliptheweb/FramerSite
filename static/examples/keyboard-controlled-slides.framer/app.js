(function() {
  var Layers, bg, container, currentIndex, currentLayer, getIndexByFrame, i, layer, layerAtIndex, nextLayer, nextSlide, prevLayer, prevSlide, screenHeight, screenWidth, updateIndex, _i;

  screenWidth = Screen.width;

  screenHeight = Screen.height;

  bg = new BackgroundLayer({
    backgroundColor: "#FBA145"
  });

  container = new Layer({
    backgroundColor: "transparent",
    width: 470,
    height: 100,
    clip: false
  });

  container.center();

  window.onresize = function() {
    return container.center();
  };

  Layers = [];

  getIndexByFrame = function(frame) {
    var index;
    return index = parseInt(((frame.x - frame.width) / frame.width) + 1);
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
      width: 100,
      height: 100,
      backgroundColor: "#fff",
      borderRadius: 4,
      x: 124 * i,
      y: 0,
      superLayer: container,
      shadowColor: "rgba(0,0,0,0.15)",
      shadowY: 1,
      shadowBlur: 3
    });
    layer.listIndex = i;
    layer.states.add({
      active: {
        scale: 1.2,
        shadowY: 6,
        shadowBlur: 16,
        x: layer.x,
        opacity: 1
      },
      inactive: {
        scale: 1,
        shadowY: 1,
        shadowBlur: 3,
        opacity: .5
      }
    });
    layer.states.animationOptions = {
      curve: "spring(400,20,0)"
    };
    Layers.push(layer);
  }

  currentIndex = nextLayer = prevLayer = 0;

  currentLayer = layerAtIndex(currentIndex);

  updateIndex = function() {
    currentLayer = layerAtIndex(currentIndex);
    nextLayer = layerAtIndex(currentIndex + 1);
    return prevLayer = layerAtIndex(currentIndex - 1);
  };

  nextSlide = function() {
    var layers, _j, _len;
    for (_j = 0, _len = Layers.length; _j < _len; _j++) {
      layers = Layers[_j];
      layers.states["switch"]("inactive");
    }
    if (currentLayer) {
      currentLayer.states["switch"]("active");
    }
    currentIndex += 1;
    return updateIndex();
  };

  prevSlide = function() {
    var layers, _j, _len;
    currentIndex -= 1;
    updateIndex();
    for (_j = 0, _len = Layers.length; _j < _len; _j++) {
      layers = Layers[_j];
      layers.states["switch"]("inactive");
    }
    if (prevLayer) {
      return prevLayer.states["switch"]("active");
    }
  };

  document.addEventListener('keydown', function(event, layer) {
    var key, keyCode;
    keyCode = event.which;
    key = String.fromCharCode(keyCode);
    switch (key) {
      case '\'':
        if (currentIndex < Layers.length) {
          return nextSlide();
        }
        break;
      case '\%':
        if (currentIndex > 1) {
          return prevSlide();
        }
    }
  });

}).call(this);
