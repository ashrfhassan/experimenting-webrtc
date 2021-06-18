const io = require("socket.io")(3000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    socket.emit('me', socket.id);
    socket.broadcast.emit('newUser', socket.id);
    socket.on('signal', ({from, to, signalData}) => {
       io.to(to).emit('signal', {from, to, signalData})
    })
    socket.on('disconnecting', (reason) => {
        socket.broadcast.emit('userLeave', socket.id);
     })
})

