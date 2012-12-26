var ctrl_div = "<div id='ctrl_div'><div>NTU course rater</div></div>";

var button = "<button id='apply_rule'>hack</button>";
$('body').prepend(ctrl_div);
$ctrl_div = $('#ctrl_div');


$ctrl_div.append("<div id='info'>Student: " + $('input[name="USER"]').val() + "<br> Course: " + $('input[name=COU_CODE]').val() +  "</div>");
$ctrl_div.append("<div>" + button + "</div>");

$ctrl_div.append("<div id='syllabus'>是否提供課程大綱？ </div>");
$('#syllabus').append("<input type=radio name='syllabus' value='1'>是  ");
$('#syllabus').append("<input type=radio name='syllabus' value='2'>否");

$('#syllabus').find('input[name="syllabus"]').each(function(index) {
	$(this).click(function() {
		$('input[name="ans3"][value="' + (index + 1) + '"]').click();
	});
});


function hasActivities() {
	result = false;
	for (i = 0; i < 9; ++i) {
		result = $('input[name="activity' + i + '"]').attr('checked');
		if (result) break;
	}
	return result;
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

$('#activities').find('[name^="activity"]').each(function(index) {
	$(this).change(function(e) {
		if (hasActivities()) {
			var $yes_button = $('input[name="ans4"][value="1"]');
			if (!$yes_button.prop('checked')) $yes_button.click();
			$('input[name="homework"][value="' + (index + 1) + '"]').attr('checked', $(this).attr('checked'));
		} else {
			$('input[name="ans4"][value="2"]').click();
		}
	});
});

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