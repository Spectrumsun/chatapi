
class Users {
  constructor() {
    this.users = [];
  }
  AddUserData(id, name, room) {
    const users = { id, name, room };
    this.users.push(users);
    return users;
  }

  RemoveUser(id) {
    const user = this.GetUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
  }

  GetUser(id) {
    const getUser = this.users.filter(userId => userId.id === id)[0];
    return getUser;
  }

  GetUsersList(room) {
    const users = this.users.filter(user => user.room === room);

    const nameArray = users.map(user => user.name);

    return nameArray;
  }
}

module.exports = { Users };
