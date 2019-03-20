var ms = 1000;
var splashTime = 3.5 * ms;

var mainPage;
var inkBall;

function init() {

  mainPage = new MainPage();
  mainPage.hide();
  inkball = new InkBall();
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
        mainPage.show();
        mainPage.waitExtendNameLine();
      }, 250);
      setTimeout(function() {
        $(".intro-container").hide();
      }, splashTime);
    });
  }
}

class MainPage {
  constructor(){
    this.elem = $(".main-container");
  }

  show(){
    this.elem.show();
  }
  hide() {
    this.elem.hide();
  }

  waitExtendNameLine() {
    setTimeout(function() {
      $(".name-line-container").addClass("lineExtend");
    }, splashTime / 2);
  }
}
