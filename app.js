// Import //
	express = require('express')
	app = express()
	server = require('http').Server(app)
	io = require('socket.io')(server)
	path = require('path')

// Set variable //
	port = process.env.PORT || 5701
	player = -1
	countdown = 60 * 1000
	timer = null
// Set route //
	server.listen(port, '0.0.0.0')
	console.log('Server starting on port: ' + port)

	app.use(express.static(__dirname + '/views/'))
	app.use('/static', express.static(__dirname + '/views/_static/'));
	app.disable('etag');

	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/views/index.html')
	})

	app.get('/rNzX54tInH', function(req, res) {
		res.sendFile(__dirname + '/views/gm.html')
	})
	
// Socket.io
	var user = io.of('/').on('connection', function(socket) {
		player++
		socket.emit('id', socket.id)

		socket.on('enter', function(package) {
			if (player == 1) {
				stopCountdown()
				admin.emit('active')
			}
			admin.emit('joining', {name: package['key'], key: socket.id})
		})
		socket.on('start', function() {
			admin.emit('init', {player: player})
		})
		socket.on('choose', function(package) {
 			admin.emit('submit', package)
		})
		socket.on('disconnect', function(package) {
			player--
			admin.emit('leaving', {key: socket.id})
			if (player == 0) {
				startCountdown()
			}
		})
	})

	var admin = io.of('/tunnel').on(('connection'), function(socket) {
		socket.on('acknowledge', function(package) {
			user.emit('callback', package)
		})

		socket.on('disconnect', function(package) {
			player = -1
		})
	})
// Others
	function startCountdown() {
		timer = setInterval(function(){
			countdown -= 1000;
			if (countdown <= 0) {
				clearInterval(timer)
				admin.emit('inactive')
			}
		}, 1000)
	}

	function stopCountdown() {
		clearInterval(timer)
	}