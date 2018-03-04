var TITLE_TEXT_OPTIONS = [
	"I'M LOOKING FOR MY SON",
	"PLEASE HELP ME FIND MY SON",
	"I NEED TO FIND MY SON"
]

var WIN_TEXT_OPTIONS = [
	"JSON YOU REALLY SHOULDN'T WANDER OFF LIKE THAT YOU KNOW",
	"JSON, WAIT FOR YOUR DAD SON"
]

var CANDIDATES = STATIC_CANDIDATES;
var SCORE = 0;
var TOTAL = 5;
var ANSWERED = 0;
var CURRENT_IS_JSON = false;
var T_ID_QUESTION = 0;
var INT_ID_CLOCK = 0;
var TIME_ALLOWED = 5;
var SECONDS_REMAINING = TIME_ALLOWED;

// Use this to pull questions from external source
function loadCandidates(fn) {
	console.log("hey")
	$.ajax({
		type: "GET",
		url: "https://rawgit.com/concreted/c6511daebe0a783b075b1461bee03a0c/raw/e640bd46665bf80e0563f46d53d9aaf9495cf4d3/json.json",
		success: function(data) {
			CANDIDATES = data;
			fn();
		},
		error: function(jqXHR, textStatus, error) {
			console.log(textStatus)
			console.log(error)
			$('#candidate').html('failed to fetch questions')
		}
	});
}

function takeRandom(arr) {
	return arr.splice(Math.floor(Math.random() * arr.length), 1);
}

function gameOver() {
	var elem = $("#field");
	var percent = SCORE/TOTAL;
	console.log(SCORE);
	console.log(percent * 100.0 + "%");
	if (percent >= 0.6) {
		text = takeRandom(WIN_TEXT_OPTIONS);
		elem.addClass("win");
	} else {
		text = "JSON NOOO!!!";
		elem.addClass('lose shake');
	}
	$('#candidate').html(text + '<br />' + SCORE + ' OUT OF ' + TOTAL + ' CORRECT');
}

function showCandidate() {
	if (ANSWERED < TOTAL && CANDIDATES.length > 0) {
		var item = takeRandom(CANDIDATES)[0];
		var candidate = item[0];
		CURRENT_IS_JSON	= item[1];
		if (CURRENT_IS_JSON) {
			candidate = JSON.stringify(candidate);
		}
		$("#candidate").text(candidate);
		return true;
	} else {
		gameOver();
		return false;
	}
}

function gameLoop() {
	clearTimeout(T_ID_QUESTION);
	clearInterval(INT_ID_CLOCK);
	SECONDS_REMAINING = TIME_ALLOWED;
	$("#timer").html(SECONDS_REMAINING);

	next = showCandidate();
	if (next) {

		T_ID_QUESTION = setTimeout(function() {
			timeOver();
			ANSWERED++;
			gameLoop();
		}, TIME_ALLOWED * 1000);


		INT_ID_CLOCK = setInterval(function () {
			SECONDS_REMAINING--;
			$("#timer").html(SECONDS_REMAINING);
		}, 1000)
	} else {
		$("#timer").html("")
	}
}

function buttonFlashGreen(elem) {
	elem.addClass("is-success",200).removeClass("is-success",200);
}

function buttonFlashRed(elem) {
	elem.addClass("is-danger",200).removeClass("is-danger",200)
}

function playRandomAudio(name, count) {
	var selection = Math.floor(Math.random() * count) + 1;
	var filename = name + selection;
	console.log(filename);
	var audio = new Audio('audio/' + filename + '.wav');
	audio.play();
}

function pressX() {
	playRandomAudio('jason', 3);
	if (ANSWERED >= TOTAL) { return; }
	if (CURRENT_IS_JSON) {
		SCORE++;
		buttonFlashGreen($(this));
	} else {
		buttonFlashRed($(this));
	}
	ANSWERED++;
	gameLoop();
}

function pressY() {
	playRandomAudio('shaun', 3);
	if (ANSWERED >= TOTAL) { return; }
	if (!CURRENT_IS_JSON) {
		SCORE++;
		buttonFlashGreen($(this));
	} else {
		buttonFlashRed($(this));
	}
	ANSWERED++;
	gameLoop();
}

function timeOver() {
	buttonFlashRed($(".button"));
}

function main() {
	$("#titleText").html(takeRandom(TITLE_TEXT_OPTIONS))
	$("#xButton").click(pressX);
	$("#yButton").click(pressY);
	$(document).bind('keyup', function(e) {
	  if (e.key === 'x') {
	  	$('#xButton').click();
	  } else if (e.key === 'b') {
	  	$('#yButton').click();
	  }
	});
	gameLoop();
}

// loadCandidates(main);
main();
