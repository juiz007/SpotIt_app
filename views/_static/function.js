function createCountdown() {
	$('#container').append(`<div id="wrap">
					<div class="c"></div>
					<div class="o"></div>
					<div class="u"></div>
					<div class="n"></div>
					<div class="t"></div>
			    </div>
			<svg>
				<defs>
					<filter id="filter">
						<feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
						<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10" result="filter" />
						<feComposite in="SourceGraphic" in2="filter" operator="atop" />
					</filter>
				</defs>
			</svg>`)
	$('#wrap').hide()
}

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