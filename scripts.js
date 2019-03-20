function init() {

	loadArrowKeys();
	loadPageButtons();
}

var currentMainPage = 0; //Home
var currentProfilePage = 0;

function loadArrowKeys() {
	$(document).keydown(function(e) {
    switch (e.keyCode) {
      case 37: //LEFT
				var pages = $(".page");

				hidePageTransitions();
				if(isProfileHome()) {
					shrinkArrows();
				}

				if(currentProfilePage > 0){
					currentProfilePage--;
				} else {
					currentProfilePage = pages.length - 1;
				}

				setTimeout(function(){
					pages.each(function() {
						var width = -100 * currentProfilePage;
						$(this).css("transform", "translateX(" + width + "vw)");
					});

					setTimeout(function() {
						if(isProfileHome()) {
							extendArrows();
						}
						showPageTransitions();
					}, 2000);
				}, 500);
        break;
      case 39: //RIGHT
				var pages = $(".page");

				hidePageTransitions();
				if(isProfileHome()) {
					shrinkArrows();
				}

				if(currentProfilePage < pages.length - 1){
					currentProfilePage++;
				} else {
					currentProfilePage = 0;
				}

				setTimeout(function(){
					pages.each(function() {
						var width = -100 * currentProfilePage;
						$(this).css("transform", "translateX(" + width + "vw)");
					});

					setTimeout(function() {
						if(isProfileHome()) {
							extendArrows();
						}
						showPageTransitions();
					}, 2000);
				}, 500);
				break;
      case 38: //UP
				var containers = $(".container");

				hidePageTransitions();
				if(isProfileHome()) {
					shrinkArrows();
				}
				currentMainPage--;

				setTimeout(function(){
					containers.each(function() {
						var height = -100 * currentMainPage;
						$(this).css("transform", "translateY(" + height + "vh)");
					});

					setTimeout(function() {
						if(isProfileHome()) {
							extendArrows();
						}
						showPageTransitions();
					}, 2000);
				}, 500);
				break;
      case 40: //DOWN
				var containers = $(".container");

				hidePageTransitions();
				if(isProfileHome()) {
					shrinkArrows();
				}
				currentMainPage++;

				setTimeout(function(){
					containers.each(function() {
						var height = -100 * currentMainPage;
						$(this).css("transform", "translateY(" + height + "vh)");
					});

					setTimeout(function() {
						if(isProfileHome()) {
							extendArrows();
						}
						showPageTransitions();
					}, 2000);
				}, 500);
        break;
		}

		$('*').off('keyup keydown keypress');
		setTimeout(function() {
			loadArrowKeys();
		}, 3000);
	});
}

function loadPageButtons() {

	var nextbuttons = $(".next_page");

	nextbuttons.click(function(){
		var containers = $(".container");

		hidePageTransitions();
		if(isProfileHome()) {
			shrinkArrows();
		}
		currentMainPage++;

		setTimeout(function(){
			containers.each(function() {
				var height = -100 * currentMainPage;
				$(this).css("transform", "translateY(" + height + "vh)");
			});

			setTimeout(function() {
				if(isProfileHome()) {
					extendArrows();
				}
				showPageTransitions();
			}, 2000);
		}, 500);
	});

	var prevbuttons = $(".prev_page");

	prevbuttons.click(function(){
			var containers = $(".container");

			hidePageTransitions();
			if(isProfileHome()) {
				shrinkArrows();
			}
			currentMainPage--;

			setTimeout(function(){
				containers.each(function() {
					var height = -100 * currentMainPage;
					$(this).css("transform", "translateY(" + height + "vh)");
				});

				setTimeout(function() {
					if(isProfileHome()) {
						extendArrows();
					}
					showPageTransitions();
				}, 2000);
			}, 500);
	});

	var rightbuttons = $(".right_page");

	rightbuttons.click(function(){
			var pages = $(".page");

			hidePageTransitions();
			if(isProfileHome()) {
				shrinkArrows();
			}

			if(currentProfilePage < pages.length - 1){
				currentProfilePage++;
			} else {
				currentProfilePage = 0;
			}

			setTimeout(function(){
				pages.each(function() {
					var width = -100 * currentProfilePage;
					$(this).css("transform", "translateX(" + width + "vw)");
				});

				setTimeout(function() {
					if(isProfileHome()) {
						extendArrows();
					}
					showPageTransitions();
				}, 2000);
			}, 500);
	});

	var leftbuttons = $(".left_page");

	leftbuttons.click(function(){
			var pages = $(".page");

			hidePageTransitions();
			if(isProfileHome()) {
				shrinkArrows();
			}

			if(currentProfilePage > 0){
				currentProfilePage--;
			} else {
				currentProfilePage = pages.length - 1;
			}

			setTimeout(function(){
				pages.each(function() {
					var width = -100 * currentProfilePage;
					$(this).css("transform", "translateX(" + width + "vw)");
				});

				setTimeout(function() {
					if(isProfileHome()) {
						extendArrows();
					}
					showPageTransitions();
				}, 2000);
			}, 500);
	});
}

function hidePageTransitions() {
	var nextButtons = $(".next_page");
	var prevButtons = $(".prev_page");
	var leftButtons = $(".left_page");
	var rightButtons = $(".right_page");

	nextButtons.each(function() {
			$(this).addClass("fadeOut");
			setTimeout(function() {
				$(this).css("display", "none");
			}, 500);
	});

	prevButtons.each(function() {
		$(this).addClass("fadeOut");
		setTimeout(function() {
			$(this).css("display", "none");
		}, 500);
	});

	leftButtons.each(function() {
		$(this).addClass("fadeOut");
		setTimeout(function() {
			$(this).css("display", "none");
		}, 500);
	});

	rightButtons.each(function() {
		$(this).addClass("fadeOut");
		setTimeout(function() {
			$(this).css("display", "none");
		}, 500);
	});
}

function showPageTransitions() {
	var nextButtons = $(".next_page");
	var prevButtons = $(".prev_page");
	var leftButtons = $(".left_page");
	var rightButtons = $(".right_page");

	nextButtons.each(function() {
		$(this).css("display", "static");
		$(this).addClass("fadeIn");
		$(this).removeClass("fadeOut");
	});

	prevButtons.each(function() {
		$(this).css("display", "static");
		$(this).addClass("fadeIn");
		$(this).removeClass("fadeOut");
	});

	leftButtons.each(function() {
		$(this).css("display", "static");
		$(this).addClass("fadeIn");
		$(this).removeClass("fadeOut");
	});

	rightButtons.each(function() {
		$(this).css("display", "static");
		$(this).addClass("fadeIn");
		$(this).removeClass("fadeOut");
	});

	setTimeout(function() {
		nextButtons.each(function() {
			$(this).removeClass("fadeIn");
		});
		prevButtons.each(function() {
			$(this).removeClass("fadeIn");
		});
		leftButtons.each(function() {
			$(this).removeClass("fadeIn");
		});
		rightButtons.each(function() {
			$(this).removeClass("fadeIn");
		});
	}, 500);
}

function isProfileHome() {
	if(currentMainPage == 1 && currentProfilePage == 0) {
		return true;
	}
}

function extendArrows() {
	$(".profile-arrows").css("width", "15vw");
}

function shrinkArrows() {
	$(".profile-arrows").css("width", "0");
}

function trackDistance() {

    var mX, mY, distance1, distance2, distance3, distance4;
    var $element1  = $('.next_page');
		var $element2  = $('.prev_page');
		var $element3  = $('.right_page');
		var $element4  = $('.left_page');

    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    }

    $(document).mousemove(function(e) {
        mX = e.pageX;
        mY = e.pageY;
        distance1 = calculateDistance($element1, mX, mY);
				distance2 = calculateDistance($element2, mX, mY);
				distance3 = calculateDistance($element3, mX, mY);
				distance4 = calculateDistance($element4, mX, mY);
				if(distance1 < 1){

				}
    });

}
