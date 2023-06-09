

const users = {};
const socketToRoom = {};

function joinUserToRoom(data, socketId) {

    const user = {userId: data.userId, socketId: socketId};

    if (users[data.roomID]) {
        users[data.roomID].push(user);
    } else {
        users[data.roomID] = [user];
    }

    return users;
}

function setSocketToRoom(data, socketId) {

  return  socketToRoom[socketId] = data.roomID;
}

function usersInThisRoom(data, socketId) {

    return users[data.roomID].filter(user => user.socketId !== socketId);
}

function sendingSignal(payload) {
    
    return { signal: payload.signal, callerID: payload.callerID };
}

function returningSignal(payload, socketId) {

    return { signal: payload.signal, id: socketId };
}

function removeUserFromRoom(socketId) {

    const roomID = socketToRoom[socketId];
    let room = users[roomID];
    if (room) {
        room = room.filter(user => user.socketId !== socketId);
        users[roomID] = room;
    }

    return users;
}

module.exports = {
    joinUserToRoom,
    setSocketToRoom,
    usersInThisRoom,
    sendingSignal,
    returningSignal,
    removeUserFromRoom
}
