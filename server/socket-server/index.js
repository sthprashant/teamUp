/**
 * Created by limyandivicotrico on 9/13/17.
 */
import io from 'socket.io';

export default function (server) {
    const socketServer = io(server);
    const connections = [];
    let socketUserId = 0;

    socketServer.on('connection', (socket) => {
        connections.push(socket);
        socketUserId += 1;

        socket.emit('start', {socketUserId});

        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', data);
        });

        // put in the room here.
        socket.on('message', (data) => {
            socket.in(data.receiverid).emit('message', data);
        });
        socket.on('disconnect', () => {
            const index = connections.indexOf(socket);
            connections.splice(index, 1);
        });

        // join working successfully.
        socket.on('join', (room) => {
            socket.room = room;
            socket.join(room);
        });

        socket.on('leave', () => {
            socket.leave(socket.room);
        });
    });
}
