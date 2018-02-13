class Global {
  constructor() {
    this.globalRoom = [];
  }
  EnterRoom(id, name, room, img) {
    const roomName = {
      id, name, room, img
    };
    this.globalRoom.push(roomName);
    return roomName;
  }

  GetUser(id) {
    const getUser = this.globalRoom.filter(userId => userId.id === id)[0];
    return getUser;
  }

  GetRoomList(room) {
    const roomName = this.globalRoom.filter(user => user.room === room);

    const nameArray = roomName.map(user => ({
      name: user.name,
      img: user.img
    }));

    return nameArray;
  }
}


module.exports = { Global };
