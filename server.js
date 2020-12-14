const io = require('Socket.io')(3000)

const users = {};

io.on('connection', socket =>{
    socket.on("New-User", name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connect', name)

    })
    socket.on('send-chatmessage', message => {
        socket.broadcast.emit('chat-message', {message: message, name: 
            users[socket.id] });
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnect', users[socket.id]);
        delete users[socket.id]
    })
})
