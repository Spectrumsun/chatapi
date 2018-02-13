/* eslint-disable */
module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('Private Chat')
    
    socket.on('join PM', (pm, callback) => {
      socket.join(pm.room1);
      socket.join(pm.room2);

      callback
    });

    socket.on('private message', (message, callback) => {
      io.to(message.room).emit('new message', {
        text: message.text,
        sender: message.sender
      });
      callback();
      console.log(message);
    });
  });
};
