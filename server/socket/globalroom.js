/* eslint-disable */
import _ from 'lodash'
import { Global } from '../helpers/Global';

module.exports = function(io){
    const clients = new  Global();

    io.on('connection', (socket) => {
         console.log('connected to general room');

        socket.on('global room', (global) => {
            socket.join(global.room);

            clients.EnterRoom(socket.id, global.name, global.room, global.img);
            //console.log('clients', clients)

            const nameProp = clients.GetRoomList(global.room);
            //console.log(nameProp)

            const arr = _.uniqBy(nameProp, 'name');
           // console.log(arr);

            io.to(global.room).emit('loggedUser', arr)
        });
    });
}