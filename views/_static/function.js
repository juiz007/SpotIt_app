function showPic(set) {
	$('div').empty()
	for (var card in set) {
		$('div').append(`<img height='150' src='` + getPic(set[card]) + `' value='` + set[card] + `' />`)
	}
}

function getPic(name) {
	return symbol[name]
}