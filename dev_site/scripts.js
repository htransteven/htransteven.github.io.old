function init() {
	loadKeys();
	grid.loadPages();
	grid.placePages();
	grid.moveTo(0, 0);
}

function loadKeys() {
  	$(document).keydown(function(e) {
			var site_x = grid.site_xpos;
			var site_y = grid.site_ypos;

      switch (e.keyCode) {
        case 37: //LEFT

					grid.moveTo(site_x, site_y);
					break;
        case 39: //RIGHT
					grid.moveTo(site_x, site_y);
					break;
        case 38: //UP
					grid.moveTo(site_x, site_y);
					break;
        case 40: //DOWN
					grid.moveTo(site_x, site_y);
					break;
			}
  	});
}

class Page {
  constructor(element, x, y) {
    this.elem = element
    this.x = x
    this.y = y
  }
}

class Grid {
	constructor(rows, columns) {
		this.pages = new Array()
		this.xcells = columns; //3x3 = -1 <= x <= 1, -1 <= y <= 1
		this.ycells = rows;
		this.site_xpos = 0;
		this.site_ypos = 0;
	}

	loadPages() {
		var pages = $(".page_container");

		for (var i = 0; i < pages.length; i++) {
			var coord = $(pages[i]).attr("name");
			var x = coord.substring(0, 1);
			if (x == "-") {
				x = coord.substring(0, 2);
			}
			var y = coord.substring(x.length + 1);
			var y = -1 * y; //Direction for y on websites is inverted
			this.pages[i] = new Page($(pages[i]), x, y);
		}
	}

	placePages() {
		var pages = this.pages
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      var x = pages[i].x;
      var y = pages[i].y;

      var x_trans = "calc(" + x + "* 100vw)";
      var y_trans = "calc(" + y + "* 100vh)";
      page.elem.css("position", "absolute");
      page.elem.css("transform", "translateX(" + x_trans + ") translateY(" + y_trans + ") translateZ(0)");
    }
	}

	fadeIn(){
		var pages = this.pages;
		for(var i = 0; i < pages.length; i++){
			var page = pages[i];
			if(page.x != this.site_xpos || page.y != this.site_ypos){
				var elem = page.elem;
				elem.css("transition", "opacity 0.5s");
				elem.css("opacity", "1");
			}
		}
	}

	fadeOut(){
		var pages = this.pages;
		for(var i = 0; i < pages.length; i++){
			var page = pages[i];
			if(page.x != this.site_xpos || page.y != this.site_ypos){
				var elem = page.elem;
				elem.css("transition", "opacity 0.5s");
				elem.css("opacity", "0");
			}
		}
	}

	hideAllPages() {
		var pages = this.pages;
		for(var i = 0; i < pages.length; i++){
			var page = pages[i];
			if(page.x != this.site_xpos || page.y != this.site_ypos){
					page.elem.css("display", "none");
			}
		}
	}

	showAllPages() {
		var pages = this.pages;
		for(var i = 0; i < pages.length; i++){
			console.log("showing");
			var page = pages[i];
			page.elem.css("display", "flex");
		}
	}

	findPage(x, y){
		var pages = this.pages;
		for(var i = 0; i < pages.length; i++){
			var page = pages[i];
			if(page.x == x && page.y == y){
				return page;
			}
		}
	}

	zoomAllOut() {
		this.showAllPages();
		var pages = this.pages;
		for(var i = 0; i < pages.length; i++){
			var page = pages[i];
			var x = page.x;
	    var y = page.y;
			var x_trans = "calc(" + x + "* 100vw)";
      var y_trans = "calc(" + y + "* 100vh)";
			page.elem.css("transition", "transform 1s");
			page.elem.css("transform", "translateX(" + x_trans + ") translateY(" + y_trans + ") translateZ(-200vmin)");
		}
	}

  zoomIn(page) {
    page.elem.css("transition", "transform 1s");
    page.elem.css("transform", "translateX(0) translateY(0) translateZ(0vmin)");
  }

	moveTo(x, y){
		var page = this.findPage(x, y);
		this.zoomAllOut();
		this.fadeIn();
		setTimeout(function(grid, page, x, y) {
			grid.zoomIn(page);
			grid.site_xpos = x;
			grid.site_ypos = y;
			grid.fadeOut();
			setTimeout(function(grid) {
				grid.hideAllPages();
			}, 1000, grid);

		}, 1250, this, page, x, y);
	}
}

var grid = new Grid(3, 3);
