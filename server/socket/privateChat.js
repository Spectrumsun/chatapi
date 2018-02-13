/* eslint-disable */
module.exports = function (io) {
  io.on('connection', (socket) => {
    
    socket.on('join PM', (pm, callback) => {
      socket.join(pm.room1);
      socket.join(pm.room2);

      callback
    });

  /*   socket.on('private message', (message) => {
      io.to(message.room).emit('new message', {
        text: message.text,
        sender: message.sender
      });
      //callback();

      io.emit('message display', {});

      console.log(message);
    }); */

     socket.on('private message', (message, callback) => {
            console.log(message);

        //send messageg back to all a roo
            io.to(message.room).emit('newMessage', {
                text: message.text,
                from: message.sender
            })
           // callback();
        });



    socket.on('refresh', function(){
            io.emit('new refresh', {});
        });
  });
};
