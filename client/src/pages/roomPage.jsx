import { useContext } from "react";
import Room from "../components/room/RoomComponent";
import { AuthContext } from "../context/AuthContext";
import { ChatContextPorovider } from "../context/ChatContext";
import { VideoCallContextProvider } from "../context/VideoCallContext";
import { SocketContextProvider } from "../context/SocketContext";

const RoomPage = () => {

    const {user} = useContext(AuthContext);
 
    return (
        <>
            <SocketContextProvider user={user}>
                <ChatContextPorovider user={user}>
                    <VideoCallContextProvider user={user}>
                      <Room></Room>
                    </VideoCallContextProvider>
                </ChatContextPorovider>
            </SocketContextProvider>
        </>
    );
};

export default RoomPage;
