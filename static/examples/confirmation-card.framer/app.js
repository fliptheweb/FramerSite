(function() {
  var bg, card, check, error, green, red;

  bg = new BackgroundLayer({
    backgroundColor: "#00497F"
  });

  Framer.Defaults.Animation = {
    curve: "spring(260,30,0,0)"
  };

  card = new Layer({
    width: 240,
    height: 240,
    backgroundColor: "#A8E5FE"
  }).center();

  card.shadowY = 5;

  card.shadowBlur = 20;

  card.shadowColor = "rgba(0,0,0,0.2)";

  red = new Layer({
    width: 240,
    height: 60,
    backgroundColor: "#F14445",
    superLayer: card
  });

  green = new Layer({
    width: 240,
    height: 60,
    y: -60,
    backgroundColor: "#98B035",
    superLayer: card
  });

  error = new Layer({
    width: 86,
    height: 86,
    image: "images/error.png"
  }).centerX().centerY(+20);

  check = new Layer({
    width: 86,
    height: 86,
    image: "images/check.png"
  }).centerX().centerY(+20);

  red.states.add({
    up: {
      y: -60
    }
  });

  green.states.add({
    down: {
      y: 0
    }
  });

  error.states.add({
    small: {
      scale: 0
    }
  });

  check.states.add({
    big: {
      scale: 1
    },
    small: {
      scale: 0
    }
  });

  check.states.switchInstant("small");

  red.states.on(Events.StateWillSwitch, function(stateA, stateB) {
    if (stateB === "up") {
      red.placeBehind(green);
      return error.placeBehind(check);
    } else {
      green.placeBehind(red);
      return check.placeBehind(error);
    }
  });

  bg.on(Events.Click, function() {
    red.states.next();
    green.states.next();
    error.states.next();
    return check.states.next("big", "small");
  });

}).call(this);
