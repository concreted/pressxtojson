function randomString() {
	return pickRandom(WORD_LIST);
}

function randomStringOrNumber() {
	var roll = randomNumber(2);
	if (roll === 0) {
		return randomString();
	} else {
		return randomNumber(1000);
	}
}

function randomValue() {
	var value = null;
	var roll = randomNumber(5);
	if (roll === 0) {
		value = randomArray();
	} else if (roll === 1) {
		value = randomObject();
	} else {
		value = randomStringOrNumber();
	}
	return value;
}

function randomArray() {
	var len = randomNumber(3);
	var result = [];
	for (var i = 0; i < len; i++) {
		result.push(randomValue());
	}
	return result;
}

function randomObject() {
	var len = randomNumber(3);
	var result = {};
	for (var i = 0; i < len; i++) {
		var key = randomStringOrNumber();
		var value = randomValue();
		result[key] = value;
	}
	return result;
}

function randomJSON() {
	var roll = randomNumber(5);
	if (roll === 0) {
		return randomStringOrNumber();
	} else if (roll === 1 || roll === 2) {
		return randomArray();
	} else if (roll === 3 || roll === 4) {
		return randomObject();
	}
}

var JSON_VALID_CHRS = [
	'"',
	':',
	'{',
	'}',
	'[',
	']'
]

var JSON_FUZZ_CHRS = [
	'^',
	'%',
	'#',
	'!',
	'@',
	'',
	'(',
	')',
	"'",
	'|',
	'<',
	'>',
	'.',
	',',
	'[[',
	']]',
	'{{',
	'}}',
	'""',
	':',
	'{',
	'}',
	'[',
	']'
]

function isValidJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function fuzzJSON(value) {
	var valueStr = JSON.stringify(value);
	var newStr = '';
	for (var i = 0; i < valueStr.length; i++) {
		var chr = valueStr[i];
		if (JSON_VALID_CHRS.indexOf(chr) >= 0) {
			var roll = randomNumber(Math.floor(valueStr.length*1.5));
			if (roll === 0) {
				newStr += pickRandom(JSON_FUZZ_CHRS);
			} else {
				newStr += chr;
			}
		} else {
			newStr += chr;
		}
	}
	if (newStr === '') {
		newStr = null;
	}
	var valid = isValidJSON(newStr);
	return [newStr, valid]
}

function generateJSON(count) {
	var results = [];
	for (var i = 0; i < count; i++) {
		var item = randomJSON();
		var fuzzed = fuzzJSON(item);
		results.push(fuzzed);
	}
	return results;
}
