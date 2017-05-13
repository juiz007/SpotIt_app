function showPic(set) {
	$('div').empty()
	for (var card in set) {
		$('div').append(`<img height='150' src='` + getPic(set[card]) + `' value='` + set[card] + `' />`)
	}
}

function showScores(name, score) {
	for (var k in name) {
		$('body').append(`<p>` + name[k] + `: </p><p id='` + k + `'>` + score[name[k]] + `</p>`)
	}
}

function showLeaderboard(name, score) {
	$('body').empty()
	$('body').append(`<center><p>Leaderboard</p><center>`)
	for (var k in name) {
		//
	}
}

function getPic(name) {
	return symbol[name]
}