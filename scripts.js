var timer = 0;

function init() {
  var invisObjs = $(".invis");
  invisObjs.each(function() {
    setTimeout(function(obj) {
      $(obj).addClass("fadeIn");
      $(obj).removeClass("invis");
    }, timer, this);
    timer += 300;
  });
}
