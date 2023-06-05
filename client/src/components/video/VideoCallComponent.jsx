import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";




const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video style={{width: "200px", borderRadius: "15px"}} playsInline autoPlay ref={ref} />
    );
}


function VideoCallComponent(props) {

    const params = useParams();

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = params.roomID;
    const {user} = useContext(AuthContext);
    const userId = user?.id;
    
    useEffect(() => {
        socketRef.current = io.connect("http://localhost:4000/");
        if(userId !== undefined) showVideo(true, true);

    }, [user]);


    function showVideo (video, audeio) {
        console.log("userId1",userId);
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: audeio }).then(stream => {

            userVideo.current.srcObject = stream;

            socketRef.current.emit("join room", {roomID, userId});
            socketRef.current.on("all users", users => {
                // console.log(users);
                const peers = [];
                users.forEach(user => {
                    const peer = createPeer(user.socketId, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: user.socketId,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            // peer.on("close", () => {
            //     console.log("Connection with peer closed :(");
            // });
        });
    }

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function noVoice() {
        showVideo(false, true);
    }

    const callEnded = () => {
        // alert(222);
        console.log( userVideo.current.srcObject );

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: userVideo.current.srcObject,
        });

          peer.on("close", () => {
                console.log("Connection with peer closed :(");
            });
        // setCallEnded(true);
    
        // connectionRef.current.destroy();
    
        // window.location.reload();
      };

    return (
        <div className="row">
            <div className="col-1">
                {/* <img src="https://i.postimg.cc/521rVkhD/image.png" className="host-img" /> */}
                <video className="host-img"  muted ref={userVideo} autoPlay playsInline />
                <div className="contarols">
                    <img src="https://i.postimg.cc/3NVtVtgf/chat.png" />
                    <img src="https://i.postimg.cc/BQPYHG0r/disconnect.png" />
                    <img src="https://i.postimg.cc/fyJH8G00/call.png" onClick={callEnded} className="call-icon" />
                    <img src="https://i.postimg.cc/bJFgSmFY/mic.png"  onClick={noVoice} />
                    <img src="https://i.postimg.cc/Y2sDvCJN/cast.png" />
                </div>
            </div>
            <div className="col-2">
                <div className="joined">
                    <p>People Joined</p>
                    <div>
                    {peers.map((peer, index) => {
                            return (
                                <Video key={index} peer={peer} />
                            );
                        })}
                        {/* <img src="https://i.postimg.cc/WzFnG0QG/people-1.png" /> */}
                        {/* <img src="https://i.postimg.cc/fRhGbb92/people-2.png" /> */}
                        {/* <img src="https://i.postimg.cc/02mgxSbK/people-3.png" /> */}
                        {/* <img src="https://i.postimg.cc/K8rd3y7Z/people-4.png" /> */}
                        {/* <img src="https://i.postimg.cc/HWFGfzsC/people-5.png" /> */}
                    </div>
                </div>
                {/* <div className="invite">
                    <p>Invite More People</p>
                    <div>
                        <img src="https://i.postimg.cc/7LHjgQXS/user-1.png" />
                        <img src="https://i.postimg.cc/q71SQXZS/user-2.png" />
                        <img src="https://i.postimg.cc/h4kwCGpD/user-3.png" />
                        <img src="https://i.postimg.cc/GtyfL0hn/user-4.png" />
                        <img src="https://i.postimg.cc/FFd8gSbC/user-5.png" />
                    </div>
                </div> */}
            </div>
        </div>
    )
}


export default VideoCallComponent