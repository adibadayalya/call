import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from './AuthContext'
import {Image} from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import hangUp from '../images/hang-up.png'
import {BsClipboard, BsFillMicMuteFill, BsFillMicFill, BsCameraVideoFill, BsCameraVideo} from 'react-icons/bs'
//import {Transition, animate} from 'react-spring'


import '../styles/callStyles.css'

const videoConstraints = {
    height: window.innerHeight,
    width: window.innerWidth
};

export default function Room(props) {

    const [muteState, setMuteState] = useState(false)
    const [blindState, setBlindState] = useState(false)
    const userVideo = useRef()
    const partnerVideo = useRef()
    const peerRef = useRef()
    const [otherUserDeets, setOtherUserDeets] = useState()
    const socketRef = useRef()
    const otherUser = useRef()
    const userStream = useRef()
    const {currentUser} = useAuth()
    const [init, setInint] = useState(true)
    const [partner, setPartner] = useState('')
    const [userJoined, setUserJoined] = useState(false)
    const [userLeft, setUserLeft] = useState(false)
    const [otherUSerVideoVisible, setOtherUSerVideoVisible] = useState(true)
    const roomID = useRef(props.match.params.roomID)
    const partnerVideoGrid = useRef()
    //const [callerName, setCallerName] = useState('');


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", ([props.match.params.roomID, currentUser]));

            socketRef.current.on('other user', ([userID, otherUserObject]) => {
                setInint(false)
                callUser(userID);
                //console.log(otherUserObject.displayName)
                setOtherUserDeets(otherUserObject)
                setPartner(otherUserObject.displayName)
                setUserJoined(true)
                setUserLeft(false)
                otherUser.current = userID;
                socketRef.current.emit('my name', currentUser.displayName)
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

            socketRef.current.on('video off by other user',() => {
                setOtherUSerVideoVisible(false)
                console.log('turned Off')
                partnerVideo.current.style.display = "none"
            })

            socketRef.current.on('video on by other user',() => {
                setOtherUSerVideoVisible(true)
                console.log('turned On')
                partnerVideo.current.style.display = "block"
            })

            socketRef.current.on('user left', (userID) =>{
                //const item = peersRef.current.find(p => p.peerID === userID);
                partnerVideo.current.style.display = "none"
                peerRef.current.close()
                console.log('userLeft')
                console.log(userID)
                setPartner('')
                setUserJoined(false)
                setUserLeft(true)
                console.log(userLeft)
                //item.peer.destroy()
                //window.close()                         
            })
        });
        //eslint-disable-next-line
    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription,
                userObject: currentUser
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        if(incoming.userObject&&init) {
            setUserJoined(true)
            setUserLeft(false)
            setOtherUserDeets(incoming.userObject)
            setPartner(incoming.userObject.displayName)
        }
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription,
                userObject: currentUser
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
                userObject:currentUser
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);
        if(incoming.userObject&&init){
            setUserJoined(true)
            setUserLeft(false)
            setOtherUserDeets(incoming.userObject)
            setPartner(incoming.userObject.displayName)
        }

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
        //partner
        //console.log(e.streams)
        partnerVideo.current.style.display = "block"
    };

    function pauseVideo(){
        const enabled = userStream.current.getVideoTracks()[0].enabled;
        if(enabled){
            //console.log(userStream)
            userStream.current.getVideoTracks()[0].enabled = false
            setBlindState(true)
            socketRef.current.emit('other-user-video-off',props.match.params.roomID)
        }
        else {
            //console.log(userStream)
            userStream.current.getVideoTracks()[0].enabled = true
            socketRef.current.emit('other-user-video-on',props.match.params.roomID)
            setBlindState(false)
        }
    }

    function muteUnmute(){
        const enabled = userStream.current.getAudioTracks()[0].enabled;
        console.log('click')
        if(enabled) {
            userStream.current.getAudioTracks()[0].enabled = false
            setMuteState(true)

        }
        else {
            userStream.current.getAudioTracks()[0].enabled = true
            setMuteState(false)
        }
    }

    function leaveCall() {
        console.log('leave')
        window.open('','_self').close()
    }


    return (
        <div className="outer-box">
        <div className="video-container">
        <div className="my-video-container">
            <span className="my-name">You</span>    
            <video className="my-video" autoPlay ref = {userVideo} muted />
        </div>
        <div className="partner-video-container" ref ={partnerVideoGrid}>  
            {
                partner ===''&&
                (
                    <span className="default-message">You are Alone</span>
                )
            }          
            {!otherUSerVideoVisible && partner!=='' && 
            (
                <div className="alt-image-vid-off">
                <Image roundedCircle className="alt-image-off img-thumbnail" style ={{height:"100px", width:"100px",padding:"1px"}} src = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"/>

                </div>
            )}  
            {
                partner!=='' &&(
                    <>
                    <video className="caller-video" autoPlay ref = {partnerVideo} />
                    <span className="caller-name">{partner}</span>
                    </>
                )
            }
                         
        </div>
        </div>
        {//partnerVideo.current && console.log(partnerVideo.current.srcObject)}
        }
        <div className ="text-centre control-panel d-flex">
        {
            //userJoined && (
              //  <p className="join-alert">{partner} has joined!</p>
            //)
        }


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
    )
}
