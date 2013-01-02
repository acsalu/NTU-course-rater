$.ajax({
	type:"GET",
	url:chrome.extension.getURL("template.html")
}).done(function(template) {
	$('body').prepend(template);
	if (!shouldShowPanel()) {
		// fetch data
		var type = determineType();
		getBasicInfo();
		fillTeacherList();
		
		// UI events
		if (type == "TA") {
			
		} else {
			bindSyllabus();
			bindHomework();
			bindRate(type);
			bindOpinion();
			genOpinion();
		}
		
		setDefaultValues();
		
		$('#my_submit').click(function() {
			sendData(type);
			$('input[name="send"]').click();
		});
	} else {
		$('#ctrl').hide();
		console.log("hide panel");
	}
	
});