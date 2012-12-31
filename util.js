SINGLE_URL = "https://investea.aca.ntu.edu.tw/opinion/giveform3.asp";
MULTI_URL =  "https://investea.aca.ntu.edu.tw/opinion/mchooes.asp";
TA_URL = "http://140.112.161.20/svta/A_TA.aspx";



var Set = function() {}
Set.prototype.add = function(o) { this[o] = true; }
Set.prototype.remove = function(o) { delete this[o]; }

opn_overall = [false, false, false, false, false];
opn_style = [false, false, false, false, false];
opn_loading = null;
opn_difficulty = null;



String.prototype.trim = function() {
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}

var determineType = function() {
	var type = ""
	if (document.URL == SINGLE_URL) type =  "SINGLE";
	else if (document.URL == MULTI_URL) type = "MULTI";
	else if (document.URL == TA_URL) type = "TA";
	console.log("type: " + type);
	return type;
}

var getBasicInfo = function() {
	$('#student_id').html($('input[name="USER"]').val());
	$('#course_num').html($('input[name=COU_CODE]').val());
	$('#class_num').html($('input[name=CLASS]').val().trim());
	if ($('#class_num').html() == "") $('#class_num').html("00");
	$('#instructor').html($($($('table').get(6)).find('td').get(3)).html().substr(12).trim().replace(" (主授)", ""));
}

var shouldShowPanel = function() {
	return ($('body:contains("下列為本課程所有合開老師資料，請選擇有實際授課的老師進行評鑑。")').length != 0 && document.URL == SINGLE_URL); 
}

var getTeacher = function() {
	if (document.URL == SINGLE_URL) {
		return [$($($('table').get(6)).find('td').get(3)).html().substr(12).trim()];
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

var fillTeacherList = function() {
	var	teachers = getTeacher();
	console.log("teachers: " + teachers);
	var teacherList = "";
	for (i = 0; i < teachers.length; ++i) {
	    teacherList += '<div id="teacher' + (i + 1) + '"><span class="teacher_name">' + teachers[i] + 
	    			   '</span>老師<select name="teaching_rate">' +
	    			   '<option value="5" selected="">5</option>' + 
	    			   '<option value="4">4</option>' +
	    			   '<option value="3">3</option>' +
					   '<option value="2">2</option>' +
					   '<option value="1">1</option>' +
					   '</select>分'+ 
					   ((teachers.length > 1) ? ('<input type="text" name="teacher' + (i + 1) + '"/ >') : '') + 
					   '</div>';
	}
	if (teachers.length > 1) {
		teacherList += '<div>整體課程<select name="overall_teaching_rate">' +
	    			   '<option value="5" selected="">5</option>' + 
	    			   '<option value="4">4</option>' +
	    			   '<option value="3">3</option>' +
					   '<option value="2">2</option>' +
					   '<option value="1">1</option>' +
					   '</select>分</div>';
	}
	
	
	console.log(teacherList);
	$('#teacherList').html(teacherList);
}

var bindSyllabus = function() {
	$('#ctrl').find('input[name="syllabus"]').each(function(index) {
		$(this).click(function() {
			$('input[name="ans3"][value="' + (index + 1) + '"]').click();
		});
	});
}

var hasActivities = function() {
	result = false;
	for (i = 0; i < 9; ++i) {
		result = $('input[name="activity' + i + '"]').attr('checked');
		if (result) break;
	}
	return result;
}

var bindHomework = function() {
	$('#ctrl').find('[name^="activity"]').each(function(index) {
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
}

var bindRate = function(type) {
	if (type == "SINGLE") {
		// bind overall teaching rates (input[type="radio"][name="ans(6~11)"])
		$('select[name="teaching_rate"]').change(function(e) {
			console.log("teaching rate has changed");
			for (var i = 6; i < 6 + 11; ++i) {
				$('input[type="radio"][name="ans' + i + '"][value="' + $(this).val() + '"]').prop('checked', true);
			}
		});
		
		// bind learning rates (input[type="radio"][name="ans(24~28)"])
		$('select[name="learning_rate"]').change(function(e) {
			console.log("learning rate has changed");
			for (var i = 24; i < 24 + 5; ++i) {
				$('input[type="radio"][name="ans' + i + '"][value="' + $(this).val() + '"]').prop('checked', true);
			}
		});
		
	} else if (type == "MULTI") {
	
		// bind overall teaching rates (input[type="radio"][name="ans(6~11)"])
		$('select[name="overall_teaching_rate"]').change(function(e) {
			console.log("teaching rate has changed");
			for (var i = 6; i < 6 + 6; ++i) {
				$('input[type="radio"][name="ans' + i + '"][value="' + $(this).val() + '"]').prop('checked', true);
			}
		});

		// bind teaching rates for each teacher (input[type="radio"][name="ANS(12~17)m(1~n)]) ... n teachers
		$('#teacherList').find('[id^="teacher"]').each(function(index) {
			$(this).find('select').change(function(e) {
				console.log("teaching rate for teacher" + index + " has changed");
				for (var j = 12; j < 12 + 6; ++j) {
					$('[name="ANS' + j + 'm' + (index + 1) + '"][value="' + $(this).val() + '"]').prop('checked', true);
				}
			});
			$(this).find('input[type="text"]').change(function(e) {
				console.log($(this).val());
				$('[name="OPINION1m' + (index + 1) + '"]').val($(this).val());
			});
		});
		
		// bind learning rates (input[type="radio"][name="ans(24~28)"])
		$('select[name="learning_rate"]').change(function(e) {
			console.log("learning rate has changed");
			for (var i = 24; i < 24 + 5; ++i) {
				$('input[type="radio"][name="ans' + i + '"][value="' + $(this).val() + '"]').prop('checked', true);
			}
		});
	} else {
		// should not happen!!
		return;
	}
}

var bindOpinion = function() {
	$('#opinion').find(".overall").each(function(i) {
		$(this).click(function() {
			opn_overall[i] = !opn_overall[i];
			$(this).toggleClass('overall').toggleClass('overall_pressed');
		});
	});
	
	$('#opinion').find(".style").each(function(i) {
		$(this).click(function() {
			opn_style[i] = !opn_style[i];
			$(this).toggleClass('style').toggleClass('style_pressed');
		});
	});
	
	$('#opinion').find("[class^=loading]").each(function(i) {
		$(this).click(function() {
			if (opn_loading != i + 1) {
				origin = opn_loading;
				opn_loading = i + 1;
				$('#opinion').find("[class^=loading]").each(function(j) {
					if (j == origin - 1 || j == opn_loading - 1) $(this).toggleClass('loading').toggleClass('loading_pressed');
				});
			}
		});
	});
	
	$('#opinion').find("[class^=difficulty]").each(function(i) {
		$(this).click(function() {
			if (opn_difficulty != i + 1) {
				origin = opn_difficulty;
				opn_difficulty = i + 1;
				$('#opinion').find("[class^=difficulty]").each(function(j) {
					if (j == origin - 1 || j == opn_difficulty - 1) $(this).toggleClass('difficulty').toggleClass('difficulty_pressed');
				});
			}
		});
	});
}




