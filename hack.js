var template = '<div id="ctrl"><table id="info"><thead><tr><th colspan="2">NTU course rater</th></tr></thead><tbody><tr><td>Student</td><td>B98901147</td></tr><tr><td>Course</td><td>202 10300</td></tr><tr><td>Instructor</td><td>孫維新</td></tr></tbody></table><table id="rate"><colgroup> <col width="8%"><col width="6%"> <col width="6%"><col width="6%"> <col width="6%"><col width="6%"> <col width="6%"><col width="6%"> <col width="6%"><col width="6%"> <col width="6%"><col width="6%"> <col width="6%"><col width="6%"> <col width="6%"><col width="6%"> </colgroup><tr><td>是否提供課程大綱？</td><td colspan="1"><input type=radio name="syllabus" value="1">是</td><td colspan="1"><input type=radio name="syllabus" value="2">否</td></tr><tr><td>課後活動</td><td><input type=checkbox name="activity1">閱讀資料</td><td><input type=checkbox name="activity2">閱讀心得報告</td><td><input type=checkbox name="activity3">習題</td><td><input type=checkbox name="activity4">書面報告</td><td><input type=checkbox name="activity5">口頭報告</td><td><input type=checkbox name="activity6">專案研究</td><td><input type=checkbox name="activity7">作品或展演</td><td><input type=checkbox name="activity8">隨堂測驗</td><td><input type=checkbox name="activity9">其他</td></tr><tr><td colspan="1"><span class="teacher">孫維新</span>老師</td><td colspan="1"><select name="teachinging_rate"><option value="5" selected="">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select>分</td><td colspan="18">意見 <input type="text" name="teacher0_opinion"/></td></tr><tr><td>學習成果</td><td><select name="learning_rate"><option value="5" selected="">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select>分</td></tr></table><table id="opinion"><tr><td><div class="overall" id="1">好課</div></td><td><div class="style" id="1">大師風範</div></td><td><div class="loading" id="1">非常涼</div></td><td><div class="difficulty" id="1">非常簡單</div></td></tr><tr><td><div class="overall" id="2">操課</div></td><td><div class="style" id="2">幽默風趣</div></td><td><div class="loading" id="2">有點涼</div></td><td><div class="difficulty" id="2">有點簡單</div></td></tr><tr><td><div class="overall" id="3">紮實</div></td><td><div class="style" id="3">深入淺出</div></td><td><div class="loading" id="3">負擔適中</div></td><td><div class="difficulty" id="3">難度適中</div></td></tr><tr><td><div class="overall" id="4">輕鬆</div></td><td><div class="style" id="4">聽不太懂</div></td><td><div class="loading" id="4">有點重</div></td><td><div class="difficulty" id="4">有點困難</div></td></tr><tr><td><div class="overall" id="5">有趣</div></td><td><div class="style" id="5">觀點精闢</div></td><td><div class="loading" id="5">非常重</div></td><td><div class="difficulty" id="5">非常困難</div></td></tr></table><button id="submit">送出</button></div>';

$('body').prepend(template);

/*
SINGLE_URL = "https://investea.aca.ntu.edu.tw/opinion/giveform3.asp";
MULTI_URL =  "https://investea.aca.ntu.edu.tw/opinion/mchooes.asp";
var type = (document.URL == SINGLE_URL) ? "single" : "multi";


var getTeacher = function() {
	if (document.URL == SINGLE_URL) {
		return [$($($('table').get(3)).find('td').get(4)).html().substr(12).trim()];
	} else if (document.URL == MULTI_URL) {
		teachers = [];
		teacherIdx = 1;
		while($('input[name="mTeacher' + teacherIdx + '"]').val()) {
			teachers[teacherIdx - 1] = $('input[name="mTeacher' + teacherIdx + '"]').val();
			++teacherIdx;
		}
		return teachers;
	}
}

var ctrl_div = "<div id='ctrl_div'><div>NTU course rater</div></div>";
var button = "<button id='apply_rule'>hack</button>";
$('body').prepend(ctrl_div);
$ctrl_div = $('#ctrl_div');


$ctrl_div.append("<div id='info'><table><tr><td>Student</td><td>" + $('input[name="USER"]').val() + "</td></tr>" +
                                       "<tr><td>Course</td><td>" + $('input[name=COU_CODE]').val() +  "</td></tr>" +
                                       "<tr><td>Instructor</td><td id='teachers'></td></tr></table></div>");
                                       
var teacherList = getTeacher();
for (i = 0; i < teacherList.length; ++i) {
	$('#teachers').append("<span class='teacher'>" + teacherList[i] + "</span> ");
}         


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