import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {Image} from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import hangUp from '../images/hang-up.png'
import {BsClipboard, BsFillMicMuteFill, BsFillMicFill, BsCameraVideoFill, BsCameraVideo} from 'react-icons/bs'

import '../styles/callStyles.css'

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 85vh;
    width: 100%;
    margin: auto;
    flex-wrap: wrap;
`;


const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
        // eslint-disable-next-line
    }, []);
    return (
        <video className="caller-video" playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight,
    width: window.innerWidth
};

const RoomContext = (props) => {
    const [peers, setPeers] = useState([]);
    const [muteState, setMuteState] = useState(false)
    const [blindState, setBlindState] = useState(false)
    const socketRef = useRef();
    const [currentUserID, setCurrentUserID] = useState('')
    const userVideo = useRef();
    const [currentStream, setCurrentStream] = useState()
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;
    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            setCurrentStream(stream)
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", (users, currentID) => {
                //console.log(currentID)
                setCurrentUserID(currentID)
                const peers = [];
                //console.log(currentUserID)
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
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
            socketRef.current.on('user left', (userID) =>{
                const item = peersRef.current.find(p => p.peerID === userID);
                console.log(userID, currentUserID)
                item.peer.destroy()
                window.close()                         
            })
        })
        // eslint-disable-next-line
    }, []);

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

    function pauseVideo(){
        const enabled = currentStream.getVideoTracks()[0].enabled;
        if(enabled){
            currentStream.getVideoTracks()[0].enabled = false
            setBlindState(true)
        }
        else {
            currentStream.getVideoTracks()[0].enabled = true
            setBlindState(false)
        }
    }

    function muteUnmute(){
        const enabled = currentStream.getAudioTracks()[0].enabled;
        console.log('click')
        if(enabled){
            currentStream.getAudioTracks()[0].enabled = false
            setMuteState(true)

        }
        else {
            currentStream.getAudioTracks()[0].enabled = true
            setMuteState(false)
        }
    }

    function leaveCall(){
        window.open('','_self').close()
    }

    return (
        <div>
            <Container>
                <div>
                <video className="my-video" muted ref={userVideo} autoPlay playsInline style ={{transform:"rotateY(180deg)"}}/>
                {peers.map((peer, index) => {
                    return (
                        <Video className="caller-video" key={index} peer={peer} />
                    );
                })}
                </div>
            </Container>
            <div className ="text-centre control-panel d-flex">  
                <CopyToClipboard text={roomID}>
                <button className="shadow share-code-button">Copy Room Code <BsClipboard size={15} /></button>
                </CopyToClipboard>              
                <Image roundedCircle onClick={() => leaveCall()} src = {hangUp} height="50px" style = {{backgroundColor:"white", padding:"5px",paddingTop:"8px"}}/>
                <div style={{margin:"auto"}}>
                {muteState?(<BsFillMicMuteFill  size={40} onClick = {muteUnmute}/>):<BsFillMicFill size ={40} onClick = {muteUnmute}/>}
                {blindState?(<BsCameraVideo className = "cam-icon"  size={40} onClick = {pauseVideo}/>):<BsCameraVideoFill className = "cam-icon" size ={40} onClick = {pauseVideo}/>}
                </div>
            </div>
        </div>
    );
};

export default RoomContext;