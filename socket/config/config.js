require("dotenv").config();

const config = {
    socket: {
        url: process.env.CONNECT_SOCKET_IO
    }
}


module.exports = {config};
