var timer = 0;
var menuOpen = false;
var pageCount = 1;

class PageController{
  constructor(){
    this.pages = [];
    this.activePageID = 0;
    this.updating = false;
  }

  loadPages(){
    var pages = this.pages;
    $(".content-page").each(function(){
      $(this).hide();
      let tempPage = new ContentPage($(this).attr("id"), $(this));
      tempPage.loadFadeObjects();
      pages.push(tempPage);
    });
  }

  activatePage(pageID){
    if(this.activePageID == pageID || this.updating == true){
      return;
    } else {
      this.updating = true;
    }

    if(this.activePageID != 0){
      this.pages[this.activePageID - 1].update(false);
    }

    setTimeout(function(obj, pageID){
      obj.pages[pageID - 1].update(true);
      obj.activePageID = pageID;
    }, 1000, this, pageID)

    setTimeout(function(self){
      self.updating = false;
    }, 150 * this.pages[pageID - 1].fadeObjs.length, this);
  }
}

class ContentPage{
  constructor(name, element){
    this.name = name;
    this.pageID = pageCount;
    this.active = false;
    this.elem = element; //JQuery obj
    this.fadeObjs = $(`#${this.name} > .fade`);
    pageCount++;
  }

  loadFadeObjects(toggle){
    var objs = this.fadeObjs;
    $(`#${this.name} > * > .fade`).each(function(){
      objs.push($(this));
    });
  }

  update(toggle){
    if(toggle){
      timer = 0;
      var self = this;
      var page = this.elem;
      var pageObj = this.fadeObjs

      page.show();
      this.active = toggle;
      pageObj.each(function() {
        setTimeout(function(obj){
          $(obj).toggleClass("fadeIn");
        }, timer, this);

        setTimeout(function(obj){
          $(obj).toggleClass("fadeOut");
        }, timer, this);

        timer += 150;
      });

    } else {
      var self = this;
      var page = this.elem;
      var pageObj = this.fadeObjs;

      page.toggleClass("fadeOut");

      pageObj.each(function() {
        $(this).toggleClass("fadeOut");
        $(this).toggleClass("fadeIn");
      });

      setTimeout(function(page, pageObj){
        page.toggleClass("fadeOut");
        page.hide();
        pageObj.active = false;
      }, 1000, page, this);
    }
  }
}

function loadMenuClickEvent(pagecontroller){
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

  var menuItems = $(".title-menu-item");
  menuItems.click(function(){
    var button = $(this);

    switch(button.attr("name")){
      case "home":
        pagecontroller.activatePage(1);
        break;
      case "websites":
        pagecontroller.activatePage(2);
        break;
      case "designs":
        pagecontroller.activatePage(3);
        break;
    }
  });
}

function loadLinkHoverAnimation(){
  var expTitleObjs = $(".website-title");
  expTitleObjs.hover(function(){
    var children = $(this).children();
    children.each(function(){
      if($(this).is("i")){
        //$(this).show();
        $(this).css("opacity", "1");
      }
    });
  }, function(){
    var children = $(this).children();
    children.each(function(){
      if($(this).is("i")){
        //$(this).hide();
        $(this).css("opacity", "0");
      }
    });
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

}

function init() {
  var pc = new PageController();

  entryAnimation();

  setTimeout(function(pc) {
    loadMenuClickEvent(pc);
    loadLinkHoverAnimation();
  }, 2000, pc);

  setTimeout(function(pc) {
    pc.loadPages();
    pc.activatePage(1);
  }, 500, pc);
}
