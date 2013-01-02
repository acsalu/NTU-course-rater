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
			setDefaultValeus();
		}
		
		$('#expand_collapse').click(function() {
			$('#ctrl').slideToggle('slow', function() {
				
			});
		});
		
		// set default values (ensure that user can submit immediately, though not recommanded)
		
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
	$.ajax({
		type: "POST", 
		url: "http://r444b.ee.ntu.edu.tw/togeather/output.php", 
		data: {student:"B98901147", course:"901 123455", sweet:5, cool:4}
	}).done(function(response) {
		console.log(response);
	});
});
$('#my_submit').click(function() { $submit_button.click(); });

// options

$.ajax({
	type:"GET",
	url:"http://r444b.ee.ntu.edu.tw/togeather/options.json"
}).done(function(response) {
	//console.log(response);
	console.log("done");
});


if ($('body:contains("下列為本課程所有合開老師資料，請選擇有實際授課的老師進行評鑑。")') && document.URL == "https://investea.aca.ntu.edu.tw/opinion/giveform3.asp") {
	console.log("this is a form of type " + type);
	//$ctrl_div.hide();
}
*/