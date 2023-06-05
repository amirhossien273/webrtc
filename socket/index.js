const {Server} = require("socket.io");

const io = new Server({cors: "http://127.0.0.1:5173"})

let onlineUser = [];

// io.on("connection", socket => {

//     socket.on("addNewUser", (userId) => {
//         !onlineUser.some(user => user.userId === userId) &&
//             onlineUser.push({
//                 userId,
//                 socketID: socket.id
//             });

//     });
//     socket.on("sendMessage", (message) => {

//         console.log(message);
//         const user = onlineUser .find(user => user.userId === message.recipientId);

//         if(user){
//             io.to(user.socketID).emit("getMessage",message);
//         }
//     });
    
//     socket.on("disconnect", () => {
       
//         onlineUser = onlineUser.filter((user) =>user.socketID !== socket.id)

//         console.log("onlineUser",onlineUser);
//     });
// });


const users = {};

const socketToRoom = {};

io.on('connection', socket => {



    socket.on("addNewUser", (data) => {

        

            if (onlineUser[data.roomID]) {
                onlineUser[data.roomID].push({userId: data.userId, roomID: data.roomID, socketId: socket.id});
            } else {
                onlineUser[data.roomID] = [{userId: data.userId, roomID: data.roomID, socketId: socket.id}];
            }
            socket.join(data.roomID);
            console.log(onlineUser);

    });
    socket.on("sendMessage", (message) => {

        console.log("sendMessage",message);
        const user = onlineUser[message.roomID].find(user => user.roomID === message.roomID);
        console.log("user message", user);
        if(user){
            io.to(message.roomID).emit("getMessage", message);
        }
    });

    socket.on("join room", data => {
        if (users[data.roomID]) {
            const length = users[data.roomID].length;
            if (length === 3) {
                // socket.emit("room full");
                // return;
            }
            users[data.roomID].push({userId: data.userId, socketId: socket.id});
        } else {
            users[data.roomID] = [{userId: data.userId, socketId: socket.id}];
        }

        socketToRoom[socket.id] = data.roomID;
      
        const usersInThisRoom = users[data.roomID].filter(user => user.socketId !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(user => user.socketId !== socket.id);
            users[roomID] = room;
        }

        onlineUser = onlineUser.filter((user) =>user.socketID !== socket.id)

    });

});



// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id);

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	});

// 	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
// 		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
// 	});

// 	socket.on("answerCall", (data) => {
//         console.log(data);
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	});
// });

const PORT = 4000 || process.env.PORT;

io.listen(PORT, () => console.log(`server running on port ${PORT}`));