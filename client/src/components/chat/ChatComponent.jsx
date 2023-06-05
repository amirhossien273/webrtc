import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

function ChatComponent() {

    const {messages} = useContext(ChatContext);
    const {user} = useContext(AuthContext);

    return (
        <>
            <main>
                <ul id="chat">
                    {messages.map((message, index) =>{
                            return (
                                <li  className={`${message.senderId === user?.id ?  "me" : "you"}`} key={index} >
                                    <div className="entete">
                                        {/* <span className="status green"></span> */}
                                        <h2>name</h2>
                                        {/* <h3>2-2-2021</h3> */}
                                    </div>
                                    <div className="triangle"></div>
                                    <div className="message">{message.text}</div>
                                </li>
                            )}
                        )
                    }
                </ul>
            </main>
        </>
    )

}


export default ChatComponent