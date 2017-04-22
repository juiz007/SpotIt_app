// Import //
	app = require('express')()
	server = require('http').Server(app)
	io = require('socket.io')(server)
	uuidV1 = require('uuid/v1')
	path = require('path')

// Set variable //
	port = process.env.PORT || 5701
	dir = path.join(__dirname, "views")
	key_temp = ''

// Set route //
	server.listen(port)
	console.log('Server starting on port: ' + port)

	app.get('/', function(req, res) {
		res.sendFile(path.join(dir, 'index.html'))
	})

	app.get('/rNzX54tInH', function(req, res) {
		res.sendFile(path.join(dir, 'gm.html'))
	})
	
// Socket.io
	var user = io.of('/').on('connection', function(socket) {
		socket.emit('id', uuidV1())
		socket.on('choose', function(key) {
			key_temp = key['key']
 			admin.emit('submit', key['value'])
		})
	})

	var admin = io.of('/tunnel').on(('connection'), function(socket) {
		socket.on('acknowledge', function(msg) {
			user.emit('callback', {key: key_temp, result: msg})
		})
	})