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
*/
/*

var teacherList = getTeacher();
for (i = 0; i < teacherList.length; ++i) {
	$('#teachers').append("<span class='teacher'>" + teacherList[i] + "</span> ");
}         



var activities = ["閱讀資料", "閱讀心得報告", "習題", "書面報告", "口頭報告", "專案研究", "作品或展演", "隨堂測驗", "其他"];
$ctrl_div.append("<div id='activities'></div>");

var table = "<table><tr><td>課後活動：</td>";
for (i = 0; i < 9; ++i) {
	table += ("<td><input type=checkbox name='activity" + i + "'>" + activities[i] + "</td>");
}
table += "</tr></table>";
$('#activities').append(table);	

$('input[name="ans4"][value="2"]').click();


// hack
$ctrl_div.append("<div><table><tr><td>" + button + "</td><td><input type='number' id='rule' width='20px'></select></td></tr></div>");

var $ans = new Array(28);
for (i = 1; i < 29; ++i) {
	$ans[i - 1] = new Array(5);
	for (j = 1; j < 6; ++j) {
		var sel = $('input[type="radio"][name="ans' + i + '"][value="' + j + '"]');
		//console.log(sel);
		$ans[i - 1][j - 1] = $(sel);
	}
}
$('#apply_rule').click(function() {
	for (i = 1; i < 29; ++i) {
		if (i != 3 || i != 4) {
			if (i == 1 || i == 2)
				$ans[i - 1][0].prop('checked', true);
			else
				$ans[i - 1][4].prop('checked', true);
		}
	}
	$.ajax({
		type: "POST", 
		url: "http://r444b.ee.ntu.edu.tw/togeather/output.php", 
		data: {student:"B98901147", course:"901 123455", sweet:5, cool:4}
	}).done(function(response) {
		console.log(response);
	}); 
});


var teacherList = getTeacher();
for (i = 0; i < teacherList.length; ++i) {
	$('#teachers').append("<span class='teacher'>" + teacherList[i] + "</span> ");
}   


$ctrl_div.append("<div><table border='1px'><tr><td>總評</td><td>教學風格</td><td>修課負擔</td><td>課程難度</td><div>");

// textarea
$ctrl_div.append("<textarea rows='2' cols='50' id='opinion'> </textarea>");
$opinion_text = $('#opinion');
$opinion_text.change(function(e) { $('textarea[name="opinion1"]').val($opinion_text.val()); });
$('textarea[name="opinion1"]').val($opinion_text.val());

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