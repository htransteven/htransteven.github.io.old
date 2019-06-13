var timer = 0;
var menuOpen = false;
var pageCount = 1;
var pairCount = 1;

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

class HomePageController {
  constructor(){
    this.pairs = [];
    this.activePair = 0;
    this.updating = false;
  }

  loadPairs(){
    var pairs = this.pairs;
    var imageArray = $(".about-images-wrapper").children();
    var titleArray = $(".about-titles-wrapper").children();
    var textArray = $(".about-descs-wrapper").children();

    for(var i = 0; i < imageArray.length; i++){
      pairs.push(new ImageTextPair($(imageArray.get(i)), $(titleArray.get(i)), $(textArray.get(i))));
    }
  }

  show(pairIndex) {
    if(this.updating == true){
      return;
    }

    if(this.activePair == 0){
      this.updating = true;
      this.pairs[pairIndex - 1].show();
      this.activePair = pairIndex;
      setTimeout(function(hpc){
        hpc.updating = false;
      }, 500, this);
    } else if(this.activePair == pairIndex){
      return;
    }

    if(this.activePair != 0){
      this.updating = true;
      this.pairs[this.activePair - 1].hide();
      this.pairs[this.activePair - 1].img.removeClass("about-img-hover");
      this.pairs[pairIndex - 1].img.addClass("about-img-hover");
      this.activePair = pairIndex;
    }

    setTimeout(function(hpc, pairIndex){
      hpc.pairs[pairIndex - 1].show();
      setTimeout(function(hpc){
        hpc.updating = false;
      }, 500, hpc);
    }, 500, this, pairIndex);
  }
}

class ImageTextPair{
  constructor(imgElement, textTitleElement, textDescElement){
    this.img = imgElement;
    this.title = textTitleElement;
    this.desc = textDescElement;
    this.id = pairCount;
    pairCount++;
  }

  show(){
    this.title.show();
    this.desc.show();
    this.title.addClass("fadeIn");
    this.desc.addClass("fadeIn");
    this.img.css("filter", "grayscale(0)");
    setTimeout(function(pair){
      pair.title.removeClass("fadeOut");
      pair.desc.removeClass("fadeOut");
    }, 500, this);
  }

  hide(){
    this.title.addClass("fadeOut");
    this.desc.addClass("fadeOut");
    setTimeout(function(pair){
      pair.title.hide();
      pair.desc.hide();
      pair.title.removeClass("fadeIn");
      pair.desc.removeClass("fadeIn");
    }, 500, this);
  }
}

function loadMenuClickEvent(pagecontroller){
  var titleArrow = $(".title-downarrow");
  var menuButton = $($(".title-menu-item").get(0));

  menuButton.hover(function(){
    if(menuOpen){
      return;
    }
    menuButton.css("font-weight", "300");
    menuButton.css("font-size", "20px");
    menuButton.css("cursor", "pointer");
    titleArrow.css("font-size", "35px");
    titleArrow.css("cursor", "pointer");
    $(".fadelayer").css("-webkit-mask-image", "linear-gradient(180deg, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 90%)");
  }, function(){
    if(menuOpen){
      return;
    }
    menuButton.css("font-weight", "300");
    menuButton.css("font-size", "15px");
    menuButton.css("cursor", "auto");
    titleArrow.css("font-size", "25px");
    titleArrow.css("cursor", "auto");
    $(".fadelayer").css("-webkit-mask-image", "linear-gradient(180deg, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%)");
  });
  titleArrow.hover(function(){
    menuButton.css("font-weight", "300");
    menuButton.css("font-size", "20px");
    menuButton.css("cursor", "pointer");
    titleArrow.css("font-size", "35px");
    titleArrow.css("cursor", "pointer");
  }, function(){
    menuButton.css("font-weight", "300");
    menuButton.css("font-size", "15px");
    menuButton.css("cursor", "auto");
    titleArrow.css("font-size", "25px");
    titleArrow.css("cursor", "auto");
  });

  menuButton.click(function(){
    titleArrow.trigger("click");
  });

  titleArrow.click(function(){
    var titleObj = $(".title-wrapper");
    var titleMenu = $(".title-menu-wrapper");
    var menuItems = titleMenu.children().get();
    menuItems.shift();
    menuItems = $(menuItems);
    var menuItemHeight = 25;
    var extendMenuLength = menuItems.length * menuItemHeight;

    if(!menuOpen){
      let itemTimer = 0;

      menuItems.each(function(index){
        setTimeout(function(item, index){
          $(item).css("height", `${menuItemHeight}px`);
          $(item).css("opacity", "1");
          $(".content-page").each(function(){
            $(this).css("margin-top", `${(index + 1) * menuItemHeight}px`);
          });
        }, itemTimer, this, index);
        itemTimer += 100;
      });

      setTimeout(function(titleArrow){
        titleArrow.toggleClass("fa-caret-down");
        titleArrow.toggleClass("fa-caret-up");
      }, (100 * menuItems.length) + 150, titleArrow);
      menuOpen = true;
    } else {
      let itemTimer = 0;

      $(menuItems.get().reverse()).each(function(index){ //reverse fade order of items
        setTimeout(function(item, index){
          $(item).css("opacity", "0");
          $(item).css("height", "0px");
          $(".content-page").each(function(){
            $(this).css("margin-top", `${($(menuItems.get().reverse()).length - index - 1) * menuItemHeight}px`);
          });
        }, itemTimer, this, index);
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
        titleArrow.trigger("click");
        break;
      case "websites":
        pagecontroller.activatePage(2);
        titleArrow.trigger("click");
        break;
      case "experience":
        pagecontroller.activatePage(3);
        titleArrow.trigger("click");
        break;
      case "contact":
        pagecontroller.activatePage(4);
        titleArrow.trigger("click");
        break;
    }
  });
}

function loadLinkHoverAnimation(){
  var webTitleText = $(".website-title a");
  var webTitleObj = webTitleText.parent();
  webTitleObj.hover(function(){
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

  var contactTitleObj = $(".contact-wrapper");
  contactTitleObj.hover(function(){
    var children = $(this).children();
    children.each(function(){
      if($(this).is("i") && $(this).hasClass("fa-caret-right")){
        //$(this).show();
        $(this).css("opacity", "1");
      }
    });
  }, function(){
    var children = $(this).children();
    children.each(function(){
      if($(this).is("i") && $(this).hasClass("fa-caret-right")){
        //$(this).hide();
        $(this).css("opacity", "0");
      }
    });
  });
}

function loadHomePageImageClickEvent(homepagecontroller){
  var hpc = homepagecontroller;
  var pairs = hpc.pairs;
  var imageArray = [];
  for(let i = 0; i < pairs.length; i++){
    imageArray.push(pairs[i].img);
  }
  $(imageArray).each(function(index){
    $(this).hover(function(){
        $(this).addClass("about-img-hover");
    }, function(){
      if(hpc.activePair - 1 != index){
        $(this).removeClass("about-img-hover");
      }
    });
  });
  for(let i = 0; i < pairs.length; i++){
      var image = pairs[i].img;
      image.click(function(){
        hpc.show(pairs[i].id);
      });
  };
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
  var hpc = new HomePageController();

  entryAnimation();

  setTimeout(function(pc) {
    loadMenuClickEvent(pc);
    loadLinkHoverAnimation();
    loadHomePageImageClickEvent(hpc);
  }, 2000, pc);

  setTimeout(function(pc) {
    pc.loadPages();
    pc.activatePage(1);
    hpc.loadPairs();
  }, 800, pc);
}
