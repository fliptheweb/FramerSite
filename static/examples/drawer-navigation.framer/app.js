(function() {
  var back, container, front, i, menu, menuOption, menuOptions, option, _i, _len;

  container = new Layer({
    width: 640,
    height: 1136
  });

  container.style.webkitPerspective = '1000px';

  back = new Layer({
    width: container.width,
    height: container.height,
    superLayer: container,
    image: 'images/bg.png'
  });

  front = new Layer({
    width: container.width,
    height: container.height,
    superLayer: container,
    originX: 0,
    originY: 0.5,
    image: 'images/front.png'
  });

  menu = new Layer({
    width: 320,
    height: 750,
    x: -60,
    midY: container.midY,
    superLayer: back,
    clip: false,
    scale: 1.2,
    backgroundColor: 'transparent'
  });

  menu.style.webkitPerspective = '1000px';

  menuOptions = (function() {
    var _i, _len, _ref, _results;
    _ref = ['Search', 'Discover', 'Your Trips', 'Wish Lists', 'Inbox'];
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      option = _ref[i];
      menuOption = new Layer({
        superLayer: menu,
        width: menu.width,
        height: 150,
        y: i * 150,
        originX: 0,
        originY: 0.5,
        rotationY: -90 + i * 15,
        opacity: 0,
        backgroundColor: 'transparent'
      });
      menuOption.html = option;
      menuOption.style = {
        fontSize: '32px',
        fontWeight: 200,
        lineHeight: '88px',
        color: '#333'
      };
      _results.push(menuOption);
    }
    return _results;
  })();

  front.states.add('menuOpen', {
    x: 420,
    scale: 0.55,
    rotationY: -20
  });

  front.states.animationOptions = back.states.animationOptions = {
    curve: 'spring',
    curveOptions: {
      tension: 300,
      friction: 50,
      velocity: 0
    }
  };

  for (i = _i = 0, _len = menuOptions.length; _i < _len; i = ++_i) {
    menuOption = menuOptions[i];
    menuOption.states.add('menuOpen', {
      opacity: 1,
      rotationY: 0
    });
    menuOption.states.animationOptions = {
      delay: i * 0.08,
      curve: 'spring',
      curveOptions: {
        tension: 200,
        friction: 50,
        velocity: 0
      }
    };
  }

  menu.states.add('menuOpen', {
    scale: 1,
    x: 60
  });

  menu.states.animationOptions = {
    curve: 'spring',
    curveOptions: {
      tension: 250,
      friction: 50,
      velocity: 0
    }
  };

  front.on(Events.Click, function() {
    var _j, _len1, _results;
    front.states.next();
    menu.states.next();
    _results = [];
    for (_j = 0, _len1 = menuOptions.length; _j < _len1; _j++) {
      option = menuOptions[_j];
      _results.push(option.states.next());
    }
    return _results;
  });

}).call(this);
