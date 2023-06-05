import { useContext } from "react";
import Room from "../components/room/RoomComponent";
import { AuthContext } from "../context/AuthContext";
import { ChatContextPorovider } from "../context/ChatContext";

const RoomPage = () => {

    const {user} = useContext(AuthContext);
 
    return (
        <>
            <ChatContextPorovider user={user}>
                <Room></Room>
            </ChatContextPorovider>
        </>
    );
};

export default RoomPage;
