import React, { useEffect, useRef, useState, useContext } from "react";
import { VideoCallContext } from "../../context/VideoCallContext";

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

function VideoCallComponent() {

    const { userVideo, peers } = useContext(VideoCallContext)
    
    console.log("userVideo",userVideo);

    return (
        <div className="row">
            <div className="col-1">
                <video className="host-img"  muted ref={userVideo} autoPlay playsInline />
                <div className="contarols">
                    <img src="https://i.postimg.cc/3NVtVtgf/chat.png" />
                    <img src="https://i.postimg.cc/BQPYHG0r/disconnect.png" />
                    <img src="https://i.postimg.cc/fyJH8G00/call.png"  className="call-icon" />
                    <img src="https://i.postimg.cc/bJFgSmFY/mic.png"  />
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
                    </div>
                </div>
            </div>
        </div>
    )
}


export default VideoCallComponent