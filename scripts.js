var ms = 1000;
var splashTime = 2.5 * ms;

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
      ball.removeClass("bounce");
      ball.addClass("splash");
      $(".ink-ball-shadow").hide();
      setTimeout(function() {
        mainPage.show();
        mainPage.waitExtendLandingSVG();
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
    this.elem.css("transition", "background-color 2s");
    this.elem.css("background-color", "#f2f2f2");
  }
  hide() {
    this.elem.hide();
  }

  waitExtendLandingSVG() {
    setTimeout(function() {
      $(".name-line-container").addClass("lineExtend");
    }, splashTime / 2);
  }
}
