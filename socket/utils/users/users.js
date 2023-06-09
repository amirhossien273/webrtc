let onlineUser = [];

// Join user to chat

function userJoin(data, socketId) {

    const user = {userId: data.userId, roomID: data.roomID, socketId: socketId};   
    if (onlineUser[data.roomID]) {
        onlineUser[data.roomID].push(user);
    } else {
        onlineUser[data.roomID] = [user];
    }

    return onlineUser;
}

function findUserRoom(message) {

    return user = onlineUser[message.roomID].find(user => user.roomID === message.roomID);
}

function removeUser(socketId) {

   return onlineUser = onlineUser.filter((user) =>user.socketID !== socketId)
}

module.exports = {
    userJoin,
    findUserRoom,
    removeUser
}
