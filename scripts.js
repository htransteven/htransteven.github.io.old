var timer = 0;

function displayNone() {
  var aboutWrapper = $(".about-wrapper");
  var schoolWrapper = $(".school-wrapper");
  var expWrapper = $(".exp-wrapper");

  aboutWrapper.hide();
  schoolWrapper.hide();
  expWrapper.each(function(){
    $(this).hide();
  });
}

function displayAll() {
  var aboutWrapper = $(".about-wrapper");
  var schoolWrapper = $(".school-wrapper");
  var expWrapper = $(".exp-wrapper");

  aboutWrapper.show();
  schoolWrapper.show();
  expWrapper.each(function(){
    $(this).show();
  });
}

function unHideAll(){
  var invisObjs = $(".invis");
  invisObjs.each(function() {
    setTimeout(function(obj) {
      $(obj).addClass("fadeIn");
      $(obj).removeClass("invis");
    }, timer, this);

    timer += 150;
  });
}

function entryAnimation() {
  var titleObj = $(".title-wrapper");

  //expand line
  setTimeout(function(titleObj) {
    titleObj.css("transition", "all 0.75s ease-in-out");
    titleObj.toggleClass("line");
  }, 500, titleObj);

  //move to top
  setTimeout(function(titleObj) {
    titleObj.css("transition", "all 0.5s ease-in-out");
    titleObj.css("top", "0");
    titleObj.css("left", "50%");
    titleObj.css("transform", "translateX(-50%)");
  }, 1250, titleObj);

  setTimeout(function() {
    displayAll();
    unHideAll();
  }, 2000)
}

function init() {
  displayNone();
  entryAnimation();
}
