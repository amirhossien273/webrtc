const {Server} = require("socket.io");
const { userJoin, findUserRoom, removeUser } = require("./utils/users/users");
const { getFormatMessage } = require("./utils/chat/messages");
const { joinUserToRoom, setSocketToRoom, usersInThisRoom, sendingSignal, returningSignal, removeUserFromRoom } = require("./utils/video/rooms");
const { config } = require("./config/config");

const io = new Server({cors: config.socket.url});
const PORT = process.env.PORT;

io.on('connection', socket => {

    socket.on("addNewUser", (data) => {

        userJoin(data, socket.id);
        socket.join(data.roomID);
    });

    socket.on("sendMessage", (message) => {

        if(findUserRoom(message)){
            io.to(message.roomID).emit("getMessage", getFormatMessage(message));
        }
    });

    socket.on("join room", data => {

        joinUserToRoom(data, socket.id);
        setSocketToRoom(data, socket.id);
        socket.emit("all users", usersInThisRoom(data, socket.id));
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', sendingSignal(payload));
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', returningSignal(payload, socket.id));
    });

    socket.on('disconnect', () => {

        removeUserFromRoom(socket.id);
        removeUser(socket.id);
    });

});


io.listen(PORT, () => console.log(`server running on port ${PORT}`));