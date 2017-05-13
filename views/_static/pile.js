var centre, pointer, pile

function init() {
	pointer = player
	shuffle()
	centre = pile[pointer+1]

	var i = 0
	for (var k in list) {
		socket.emit('acknowledge', {key: k, card: pile[i], result: 'none'})
		i++
	}
	remain -= package['player']
	showScores(list, s_list)
	nextPic()
}

function shuffle() {
	var j, x, i = 55
	while (i) {
		j = parseInt(Math.random() * i);
		x = pile[--i]
		pile[i] = pile[j]
		pile[j] = x
	}
}