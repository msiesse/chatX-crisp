import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('create-room', (roomName) => {
        socket.join(roomName);
        console.log(`New room created: ${roomName}`);
    });

    socket.on('send-message', ({ roomName, message }) => {
        io.to(roomName).emit('new-message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

io.listen(3000)