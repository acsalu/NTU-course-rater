/*
chrome.extension.sendRequest({cmd: "read_file"}, function(html){
    $('body').prepend(html);
});
*/

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
		
	/*
	$('#expand_collapse').click(function() {
			if ($('#expand_collapse').html()  == "⋀") {
				$('#ctrl').stop().children().fadeOut(300, function() {
					console.log('me');
					$('#expand_collapse').html("⋁");
					$('#expand_collapse').show();
					$('#expand_collapse').stop().animate){("⋁");
					$('#ctrl').stop().animate({height: '50px'}, 500);
					
				});
			} else {
				
			}

		});
 		 */
		// set default values (ensure that user can submit immediately, though not recommanded)
		setDefaultValues();
		
		$('#my_submit').click(function() {
			sendData();
			$('input[name="send"]').click();
		});
	} else {
		$('#ctrl').hide();
		console.log("hide panel");
	}
	
});



/*

// submit
$('#ctrl_div').append("<div><button id='my_submit'>submit</button></div>");
$submit_button = $('input[name="send"]');
$submit_button.click(function() {
	
$('#my_submit').click(function() { $submit_button.click(); });

// options

$.ajax({
	type:"GET",
	url:"http://r444b.ee.ntu.edu.tw/togeather/options.json"
}).done(function(response) {
	//console.log(response);
	console.log("done");
});
*/