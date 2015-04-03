(function() {
  var loadExample, mq;

  loadExample = function(exampleName) {
    if (typeof ga !== "undefined" && ga !== null) {
      ga("send", "pageview", "http://framerjs.com/examples/" + exampleName);
    }
    $("#code").attr("src", "code.html?name=" + exampleName);
    $("#example").attr("src", "http://projects.framerjs.com/static/examples/" + exampleName);
    $(".btn-dl").attr("href", "http://projects.framerjs.com/static/examples/" + exampleName + ".zip");
    return $(".btn-open").attr("href", "http://framer.link/projects.framerjs.com/static/examples/" + exampleName + ".zip");
  };

  $(document).ready(function() {
    var exampleName, exampleShowCode, parts;
    parts = window.location.href.split("#");
    if (parts.length === 2) {
      exampleName = parts[1];
      exampleShowCode = false;
    } else if (parts.length === 3) {
      exampleName = parts[1];
      exampleShowCode = true;
    } else {
      exampleName = "";
      exampleShowCode = false;
    }
    exampleName = exampleName.replace(/\/+$/, "");
    document.title = exampleName;
    loadExample(exampleName);
    $(".btn-close").hide();
    $(".btn-code").click(function() {
      $("#example").toggleClass("with-code");
      $("#code").toggleClass("show-code");
      $(".btn-code").hide();
      return $(".btn-close").show();
    });
    $(".btn-close").click(function() {
      $("#example").toggleClass("with-code");
      $("#code").toggleClass("show-code");
      $(".btn-close").hide();
      return $(".btn-code").show();
    });
    if (exampleShowCode === true) {
      $("#code").addClass("with-code");
      $("#example").addClass("with-code");
      $(".btn-code").hide();
    }
    if (window.navigator.standalone) {
      return window.location.href = "http://projects.framerjs.com/static/examples/" + exampleName;
    }
  });

  mq = window.matchMedia("(max-width:800px)");

  if (mq.matches) {
    window.location.hash = '#' + window.location.hash.split('#')[1];
  }

}).call(this);
