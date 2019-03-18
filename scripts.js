function init() {

	loadPageButtons();
}

var currentMainPage = 0; //Home
var currentProfilePage = 0;

function loadPageButtons() {

	var nextbuttons = $(".next_page");

	nextbuttons.click(function(){
		var containers = $(".container");
		currentMainPage++;

		hidePageTransitions();

		setTimeout(function(){
			containers.each(function() {
				var height = -100 * currentMainPage;
				$(this).css("transform", "translateY(" + height + "vh)");
			});

			setTimeout(function() {
				showPageTransitions();
			}, 2000);
		}, 500);
	});

	var prevbuttons = $(".prev_page");

	prevbuttons.click(function(){
			var containers = $(".container");
			currentMainPage--;

			hidePageTransitions();

			setTimeout(function(){
				containers.each(function() {
					var height = -100 * currentMainPage;
					$(this).css("transform", "translateY(" + height + "vh)");
				});

				setTimeout(function() {
					showPageTransitions();
				}, 2000);
			}, 500);
	});

	var rightbuttons = $(".right_page");

	rightbuttons.click(function(){
			var pages = $(".page");

			if(currentProfilePage < pages.length - 1){
				currentProfilePage++;
			} else {
				currentProfilePage = 0;
			}

			hidePageTransitions();

			setTimeout(function(){
				pages.each(function() {
					var width = -100 * currentProfilePage;
					$(this).css("transform", "translateX(" + width + "vw)");
				});

				setTimeout(function() {
					showPageTransitions();
				}, 2000);
			}, 500);
	});

	var leftbuttons = $(".left_page");

	leftbuttons.click(function(){
			var pages = $(".page");

			if(currentProfilePage > 0){
				currentProfilePage--;
			} else {
				currentProfilePage = pages.length - 1;
			}

			hidePageTransitions();

			setTimeout(function(){
				pages.each(function() {
					var width = -100 * currentProfilePage;
					$(this).css("transform", "translateX(" + width + "vw)");
				});

				setTimeout(function() {
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
