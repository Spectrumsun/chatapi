/* eslint-disable */
import { Users } from '../helpers/usersClass'; 

module.exports = function(io) {
    const users = new Users();

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('join', (params, callback) => {
            socket.join(params.room);

            users.AddUserData(socket.id, params.name, params.room)
            console.log(users);

            io.to(params.room).emit('usersList', users.GetUsersList(params.room));
            
            //callback();
        })

        //get message from the client
        socket.on('createMessage', (message, callback) => {
            console.log(message);

        //send messageg back to all a room
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.from
            })
           // callback();
        });

        socket.on('disconnect', () => {
            const user = users.RemoveUser(socket.id);

            if(user){
                io.to(params.room).emit('usersList', users.GetUsersList(params.room));
            }
        });
    });
};
