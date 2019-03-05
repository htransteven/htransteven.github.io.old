function initialLoad(){
	show("profile");
}

function show(name) {

	var containers = $(".container");
	containers.each(function(index) {
		if($(containers[index]).attr("id") != name){
			$(containers[index]).removeClass("open");
		}
		setTimeout(function(containers, index){
			if($(containers[index]).attr("id") != name){
				$(containers[index]).css("display", "none");
			}
		}, 300, containers, index);
	});

	var buttons = $(".navbar_item");
	buttons.each(function(index) {
		if($(buttons[index]).attr("name") != name){
			$(buttons[index]).removeClass("currTab");
		}
	});

	var containerTo = $("#" + name);
	containerTo.css("display", "flex");
	containerTo.addClass("open");
}
