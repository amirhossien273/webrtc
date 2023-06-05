import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import VideoCall from "../video/VideoCallComponent";
import Chat from '../chat/ChatComponent';
import ButtonChatComponent from '../chat/ButtonChatComponent';

function RoomComponent() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(11111111111111111);

    return (
        <div className="header">
        <nav>
            <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" className="logo" />
            <ul>
                <li><img src="https://i.postimg.cc/L8zxQBhv/live.png" className="active" /></li>
                <li><img src="https://i.postimg.cc/JnggC78Q/video.png" /></li>
                <li><img src="https://i.postimg.cc/vmb3JgVy/message.png" onClick={handleShow} /></li>
                <li><img src="https://i.postimg.cc/qR7Q7PwZ/notification.png" /></li>
                <li><img src="https://i.postimg.cc/k4DZH604/users.png" /></li>
                <li><img src="https://i.postimg.cc/v84Fqkyz/setting.png" /></li>
            </ul>
        </nav>
        <div className="container">
            <div className="top-icons">
                <img src="https://i.postimg.cc/cCpcXrSV/search.png" />
                <img src="https://i.postimg.cc/Pqy2TXWw/menu.png" />
            </div>
             <VideoCall></VideoCall>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
                <Modal.Body><Chat></Chat></Modal.Body>
            <Modal.Footer>
                  <ButtonChatComponent></ButtonChatComponent>
            </Modal.Footer>
        </Modal>
    </div>
    )

}


export default RoomComponent