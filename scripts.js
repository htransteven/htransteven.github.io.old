var timer = 0;

function init() {
  window.scrollTo(0,0);
  var invisObjs = $(".invis");
  invisObjs.each(function() {
    setTimeout(function(obj) {
      $(obj).addClass("fadeIn");
      $(obj).removeClass("invis");
    }, timer, this);

    timer += 200;
  });
}
