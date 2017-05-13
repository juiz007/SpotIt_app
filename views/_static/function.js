function checkReady(list) {
	for (var s in list) {
		if (!list[s]) {
			return false
		}
	}
	return true
}

function showPic(set) {
	$('div').empty()
	for (var card in set) {
		$('div').append(`<img height='150' src='` + getPic(set[card]) + `' value='` + set[card] + `' />`)
	}
}

function showScores(name, score) {
	for (var k in name) {
		$('body').append(`<p>` + name[k] + `: </p><p id='` + k + `'>` + score[k] + `</p>`)
	}
}

function showLeaderboard(name, score) {
	var i = 1
	$('body').empty()
	$('body').append(`<center><p>Leaderboard</p><center>`)
	score.sort(function(a, b){return a-b})
	for (var k in score) {
		$('body').append(`<center><p>` + name[k] + `: </p><p>` + score[k] + `</p>`)
		socket.emit('acknowledge', {key: k, rank: i++, result: 'end'})
	}
}

function getPic(name) {
	return symbol[name]
}

function startCountdown() {
	var countdown = 5 * 1000
	timer = setInterval(function(){
		countdown -= 1000
   		var seconds = Math.floor((countdown % (1000 * 60)) / 1000)
   		$('#countdown').text(seconds)
		if (countdown <= 0) {
			clearInterval(timer)
			admin.emit('inactive')
		}
	}, 1000)
}

function stopCountdown() {
	clearInterval(timer)
}