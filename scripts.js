var ms = 1000;
var splashTime = 3.5 * ms;

function init() {

  $(".main-container").hide();

  var inkball = new InkBall();
  inkball.loadClick();
}

class InkBall {
  constructor() {
    this.elem = $(".ink-ball-container");
    this.splash = false;
  }

  loadClick(){
    var ball = this.elem;
    ball.click(function() {
      ball.addClass("splash");
      setTimeout(function() {
        $(".main-container").show();
      }, 250);
      setTimeout(function() {
        $(".intro-container").hide();
      }, splashTime);
    });
  }
}
