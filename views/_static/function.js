function checkReady(list) {
	for (var s in list) {
		if (!list[s]) {
			return false
		}
	}
	return true
}

function showScores(name, score) {
	for (var k in name) {
		$('body').append(`<p>` + name[k] + `: </p><p id='` + k + `'>` + score[k] + `</p>`)
	}
}

function showLeaderboard(score) {
	var i = 1
	var sortable = []
	$('body').empty()
	$('body').append(`<center><p>Leaderboard</p><center>`)

	for (var s in score) {
		sortable.push([s, score[s]])
	}

	sortable.sort(function(a, b){return a-b})

	return sortable
}