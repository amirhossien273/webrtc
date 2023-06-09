import { createContext, useCallback, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "./SocketContext";

export const ChatContext = createContext();

export const ChatContextPorovider = ({children, user}) => {

    const [newMessage, setNewMessage] = useState(null);
    const [messages, setMessages] = useState(null);
    const {socket} = useContext(SocketContext);
    const params = useParams();

 
     useEffect(() => {  

        if(socket === null) return;
            
        socket.emit("addNewUser", {userId: user?.id, roomID: params.roomID});
     // socket.on("getUserOnline", (res) => {});
        
     },[socket]);


     useEffect(() => {  

        if(socket === null) return;
        socket.emit("sendMessage", {...newMessage, user, roomID: params.roomID});
        
     },[newMessage]);


     useEffect(() => {  

        if(socket === null) return;

        socket.on("getMessage", res => {

            console.log(res)
            
            let response = {
                roomID: res.roomID,
                senderId: res.senderId,
                text: res.text
            };

            setMessages((pev) => [...pev, response]);
        });

        return () => {
            socket.off("getMessage");
        }
        
     },[socket]);

    useEffect(() => {

        setMessages([]);

    },[]);
    
    const sendTextMessage = useCallback(async (text, sender,roomID, setTextMessage) => {
        
        let response = {
                roomID: roomID,
                senderId: sender.id,
                text: text
            };

        setNewMessage(response);
        // setMessages((pev) => [...pev, response]);
        setTextMessage("");

    },[]);


    return <ChatContext.Provider value={{sendTextMessage, messages}}>{children}</ChatContext.Provider>
}