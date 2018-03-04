function randomNumber(maxExclusive) {
	return Math.floor(Math.random() * maxExclusive);
}

function randomIndex(arr) {
	return Math.floor(randomNumber(arr.length));
}

function takeRandom(arr) {
	return arr.splice(randomIndex(arr), 1);
}

function pickRandom(arr) {
	return arr[randomIndex(arr)];
}
