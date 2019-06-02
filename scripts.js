var timer = 0;
var menuOpen = false;

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

function loadMenuClickEvent(){
  var titleArrow = $(".title-downarrow");

  titleArrow.click(function(){
    var titleObj = $(".title-wrapper");
    var titleMenu = $(".title-menu-wrapper");
    var menuItems = titleMenu.children();
    var menuItemHeight = 25;
    var extendMenuLength = menuItems.length * menuItemHeight;

    if(!menuOpen){
      let itemTimer = 0;

      menuItems.each(function(){
        setTimeout(function(item){
          $(item).css("height", `${menuItemHeight}px`);
          $(item).css("opacity", "1");
        }, itemTimer, this);
        itemTimer += 100;
      });

      setTimeout(function(titleArrow){
        titleArrow.toggleClass("fa-caret-down");
        titleArrow.toggleClass("fa-caret-up");
      }, (100 * menuItems.length) + 150, titleArrow);
      menuOpen = true;

    } else {
      let itemTimer = 0;
      
      $(menuItems.get().reverse()).each(function(){ //reverse fade order of items
        setTimeout(function(item){
          $(item).css("opacity", "0");
          $(item).css("height", "0px");
        }, itemTimer, this);
        itemTimer += 100;
      });

      setTimeout(function(titleArrow){
        titleArrow.toggleClass("fa-caret-down");
        titleArrow.toggleClass("fa-caret-up");
      }, (100 * menuItems.length) + 150, titleArrow);
      menuOpen = false;
    }
  });
}

function entryAnimation() {

  //arrow bounce effect
  var titleArrow = $(".title-downarrow");
  setTimeout(function(titleArrow) {
    titleArrow.css("transform", "translateY(7px)");
  }, 250, titleArrow);
  setTimeout(function(titleArrow) {
    titleArrow.css("transform", "translateY(0px)");
  }, 600, titleArrow);

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


    loadMenuClickEvent();
  }, 2000)
}

function init() {
  displayNone();
  entryAnimation();
}
