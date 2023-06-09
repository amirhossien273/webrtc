import { createContext, useEffect, useState } from "react";
import {io} from "socket.io-client";
import config from "../config/config";

export const SocketContext = createContext();


export const SocketContextProvider = ({children, user}) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {  
        console.log("config",config)
        const newSocket = io(config.socket.url);
        setSocket(newSocket);
        
        console.log("socket connect: ", newSocket);
        return () => {
            newSocket.disconnect();
        }
     },[user]);
 
    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
}