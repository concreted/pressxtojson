var TITLE_TEXT_OPTIONS = [
	"I'M LOOKING FOR MY SON",
	"PLEASE HELP ME FIND MY SON",
	"I NEED TO FIND MY SON"
]

var WIN_TEXT_OPTIONS = [
	"JSON YOU REALLY SHOULDN'T WANDER OFF LIKE THAT YOU KNOW",
	"JSON, WAIT FOR YOUR DAD SON",
	"I'LL BUY YOU A BALLOON SON"
]

var TOTAL_QUESTIONS = 10;
var T_ID_QUESTION = 0;
var INT_ID_CLOCK = 0;
var TIME_ALLOWED = 5;
var SECONDS_REMAINING = TIME_ALLOWED;
var GAME_STATES = ['PRE', 'PLAY'];
var GAME_STATE = 0;

function initialize() {
	CANDIDATES = generateJSON(TOTAL_QUESTIONS);
	SCORE = 0;
	ANSWERED = 0;
	CURRENT_IS_JSON = false;
}

// var CANDIDATES = STATIC_CANDIDATES;
initialize();

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

function gameOver() {
	var elem = $("#field");
	var percent = SCORE/TOTAL_QUESTIONS;
	console.log(SCORE);
	console.log(percent * 100.0 + "%");
	if (percent >= 0.6) {
		text = pickRandom(WIN_TEXT_OPTIONS);
		elem.addClass("win");
	} else {
		text = "JSON NOOO!!!";
		elem.addClass('lose shake');
	}
	$('#candidate').html(text + '<br />' + SCORE + ' OUT OF ' + TOTAL_QUESTIONS + ' CORRECT');
}

function showCandidate() {
	if (ANSWERED < TOTAL_QUESTIONS && CANDIDATES.length > 0) {
		var item = takeRandom(CANDIDATES)[0];
		console.log(item);
		var candidate = item[0];
		CURRENT_IS_JSON	= item[1];
		$("#candidate").text(candidate);
		return true;
	} else {
		gameOver();
		return false;
	}
}

function timedStateChange(loopConditionFn, loopCB, endCB, time_allowed) {
	var fn = function () {
		clearTimeout(T_ID_QUESTION);
		clearInterval(INT_ID_CLOCK);

		SECONDS_REMAINING = time_allowed;
		$("#timer").html(SECONDS_REMAINING);

		next = loopConditionFn();

		if (next) {
			console.log('next');
			T_ID_QUESTION = setTimeout(function () {
				loopCB();
				fn();
			}, time_allowed * 1000);
			INT_ID_CLOCK = setInterval(function () {
				SECONDS_REMAINING--;
				$("#timer").html(SECONDS_REMAINING);
			}, 1000)
		} else {
			console.log('end');
			endCB();
		}
	}
	fn();
}

function gameLoop() {
	GAME_STATE = 1;
	timedStateChange(
		showCandidate,
		function() {
			timeOver();
			ANSWERED++;
		}, function() {
			$("#timer").html("");
			$('#restart').removeClass('invisible');
		},
		TIME_ALLOWED)
}

function buttonFlashSelect(elem) {
	elem.addClass("is-dark",200).removeClass("is-dark",200);
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

function pressButton(elem, correctFn, correctCB, inactiveFn, continueCB, audioCB) {
	audioCB();
	if (inactiveFn()) {
		buttonFlashSelect(elem);
		return;
	}
	if (correctFn()) {
		correctCB();
		buttonFlashGreen(elem);
	} else {
		buttonFlashRed(elem);
	}
	continueCB();
}

function isGameOver() {
	return ANSWERED >= TOTAL_QUESTIONS || GAME_STATES[GAME_STATE] !== 'PLAY';
}

function incrementScore() {
	SCORE++;
}

function answerQuestion() {
	ANSWERED++;
	gameLoop();
}

function pressX() {
	return pressButton(
		$(this),
		function() { return CURRENT_IS_JSON; },
		incrementScore,
		isGameOver,
		answerQuestion,
		function() { playRandomAudio('jason', 3); },
	)
}

function pressNo() {
	return pressButton(
		$(this),
		function() { return !CURRENT_IS_JSON; },
		incrementScore,
		isGameOver,
		answerQuestion,
		function() { playRandomAudio('shaun', 3); },
	)
}

function pressRestart() {
	$('#candidate').removeClass('shake');
	$('#field').removeClass('win lose shake');
	$('#restart').addClass('invisible');
	$('#restartText').text('TRY AGAIN');
	initialize();
	gameLoop();
}

function timeOver() {
	buttonFlashRed($(".button"));
}

function main() {
	$("#titleText").html(takeRandom(TITLE_TEXT_OPTIONS))
	$("#candidate").html(takeRandom(TITLE_TEXT_OPTIONS))
	$("#xButton").click(pressX);
	$("#noButton").click(pressNo);
	$("#restartButton").click(pressRestart);
	$(document).bind('keyup', function(e) {
	  if (e.key === 'x') {
	  	$('#xButton').click();
	  } else if (e.key === 'b') {
	  	$('#noButton').click();
	  } else if (e.key === 'y') {
	  	$('#restartButton').click();
	  }
	});
}

// loadCandidates(main);
main();
