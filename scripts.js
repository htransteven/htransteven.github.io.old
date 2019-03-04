function fadeAll(){
	var containers = $(".container");
	containers.each(function(index) {
		$(containers[index]).removeClass("open");
		setTimeout(function(containers, index){
			$(containers[index]).css("display", "none");
		}, 300, containers, index);
	});

	var buttons = $(".navbar_item");
	buttons.each(function(index) {
		$(buttons[index]).removeClass("currTab");
	});
}

function show(name) {
	var containerTo = $("#" + name);
	containerTo.css("display", "flex");
	containerTo.addClass("open");
}
