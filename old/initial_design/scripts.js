function initialLoad(){
	show("profile");
	hideFolders();
	hideFiles();
}

function show(name) {

	var containers = $(".container");
	containers.each(function(index) {
		if($(containers[index]).attr("id") != name){
			$(containers[index]).removeClass("open");
		}
		setTimeout(function(containers, index) {
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

function hideFolders(){
	var files = $(".portfolio_file");
	files.each(function(index) {
		$(files[index]).css("display", "none");
		$(files[index]).removeClass("open");
	});
}

function showFolders(){
	$(".main_folder").removeClass("waiting");
	$(".main_folder").addClass("closing");
	setTimeout(function(){
		$(".main_folder").css("display", "none");
		var files = $(".portfolio_file");
		files.each(function(index) {
		$(files[index]).css("display", "flex");
		setTimeout(function(files, index) {
			$(files[index]).addClass("open");
		}, 400, files, index)
	});
	}, 600);

}

function showFile(name){
	var file = $("#" + name);
	file.css("display", "flex");
	setTimeout(function(file) {
		file.addClass("open");
	}, 200, file)
}

function hideFiles(){
	var texts = $(".textfile_window");
	texts.each(function(index) {
		$(texts[index]).css("display", "none");
		$(texts[index]).removeClass("open");
	});
}
