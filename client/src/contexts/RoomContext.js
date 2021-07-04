import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from './AuthContext'
import {Image, Form, InputGroup} from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import hangUp from '../images/hang-up.png'
import {BsClipboard, BsFillMicMuteFill, BsFillMicFill, BsCameraVideoFill, BsCameraVideo, BsCursorFill, BsChatSquareFill, BsChatSquare, BsChatSquareDotsFill} from 'react-icons/bs'
//import {Transition, animate} from 'react-spring'


import '../styles/callStyles.css'

const videoConstraints = {
    height: window.innerHeight,
    width: window.innerWidth
};

export default function Room(props) {
    const [muteState, setMuteState] = useState(false)
    const [blindState, setBlindState] = useState(false)
    const [visibilityMsg, setVisibilityMsg] = useState(false)
    const userVideo = useRef()
    const partnerVideo = useRef()
    const peerRef = useRef()
    const userVideoContainer = useRef()
    const [otherUserDeets, setOtherUserDeets] = useState()
    const socketRef = useRef()
    const otherUser = useRef()
    const [otherUserName, setOtherUserName] = useState('')
    const userStream = useRef()
    const messageDiv = useRef()
    const actualMessage = useRef()
    const messageWindow = useRef()
    const {currentUser} = useAuth()
    const [init, setInint] = useState(true)
    const [partner, setPartner] = useState('')
    const [userJoined, setUserJoined] = useState(false)
    const [userLeft, setUserLeft] = useState(false)
    const [gotANewMessage, setGotANewMessage] = useState(false)
    const [otherUSerVideoVisible, setOtherUSerVideoVisible] = useState(true)
    const roomID = useRef(props.match.params.roomID)
    const partnerVideoGrid = useRef()


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
                setOtherUserName(otherUserObject.displayName)
                setPartner(otherUserObject.displayName)
                setUserJoined(true)
                joinAlert()
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

            socketRef.current.on('recieved a new message', ([recievedMessage, senderName]) => {
                //setPartner(senderName)
                otherMessage(recievedMessage, senderName)
                setGotANewMessage(true)
                scrollToBottom()
            })

            socketRef.current.on('user left', (userID) =>{
                //const item = peersRef.current.find(p => p.peerID === userID);
                if(partnerVideo.current)
                partnerVideo.current.style.display = "none"
                if(peerRef.current)
                peerRef.current.close()
                console.log('userLeft')
                console.log(userID)
                setPartner('')
                setUserJoined(false)
                setUserLeft(true)
                joinAlert()
                console.log(userLeft)
                setOtherUSerVideoVisible(true)
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
            joinAlert()
            setUserLeft(false)
            setOtherUserDeets(incoming.userObject)
            setOtherUserName(incoming.userObject.displayName)
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
        /*if(incoming.userObject&&init){
            setUserJoined(true)
            joinAlert()
            setUserLeft(false)
            setOtherUserDeets(incoming.userObject)
            setPartner(incoming.userObject.displayName)
        }*/

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

    function moveIt(){
        if(visibilityMsg){
            messageWindow.current.style.right ="-60vw"
            userVideoContainer.current.style.left ="74%";
            setVisibilityMsg(false)
            setGotANewMessage(false)
        } else {
            messageWindow.current.style.right="1vw"
            userVideoContainer.current.style.left ="45%";
            setVisibilityMsg(true)
            setGotANewMessage(false)
            
        }
    }

    function scrollToBottom() {
        messageDiv.current.scrollTop=messageDiv.current.scrollHeight;
    }

    function otherMessage(messageText, senderName) {
        var messageDetails = document.createElement('div')
        messageDetails.classList.add('messageCard')
        var otherName = document.createElement('p')
        otherName.innerText = senderName
        otherName.classList.add('senderDetails')
        otherName.classList.add('senderDetailsOther')
        var newMsg = document.createElement('p')
        newMsg.innerText = messageText
        newMsg.classList.add('msg')
        messageDetails.append(otherName)
        messageDetails.append(newMsg)
        return (messageDiv.current.append(messageDetails))
    }

    function selfMessage(messageText) {
        var messageDetails = document.createElement('div')
        messageDetails.classList.add('messageCard')
        var yourName = document.createElement('p')
        yourName.innerText = 'You'
        yourName.classList.add('senderDetails')
        yourName.classList.add('senderDetailsSelf')
        var newMsg = document.createElement('p')
        newMsg.innerText = messageText
        newMsg.classList.add('msg')
        messageDetails.append(yourName)
        messageDetails.append(newMsg)
        return (messageDiv.current.append(messageDetails))
    }

    function sendMessage(){
        if(actualMessage.current.value!=="")
        {
            selfMessage(actualMessage.current.value);
            scrollToBottom()
            socketRef.current.emit('sending a message', ([actualMessage.current.value, currentUser.displayName, props.match.params.roomID]))
            actualMessage.current.value=""
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    function joinAlert() {
        //console.log('joined')
        const joinElement = document.getElementsByClassName('join-alert')[0]
        joinElement.style.left = "2vw";
        setTimeout(()=>{joinElement.style.left="-50vw"}, 3000)
        if(joinElement.style.backgroundColor === "seagreen"){
            joinElement.style.backgroundColor = "red";
        } else {
            //console.log(otherUserName)
            joinElement.style.backgroundColor = "seagreen"
        }
    }

    function copyAlert() {
        const copyAlertElement = document.getElementsByClassName('copy-alert')[0]
        copyAlertElement.style.left='3vw'
        setTimeout(()=>{copyAlertElement.style.left="-40vw"}, 3000)
    }


    return (
        <div className="outer-box">
        <div className="video-container" id="photo-capture">
        <div className="my-video-container" ref={userVideoContainer}>
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
                <Image roundedCircle className="alt-image-off img-thumbnail" style ={{height:"100px", width:"100px",padding:"1px"}} src = {otherUserDeets.photoURL} />
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
        <div ref = {messageWindow} className="msg-container" >
        <div ref={messageDiv} className="chat-window">
        </div>    

        <div className ="msg-box">
        <Form onSubmit={handleSubmit}>
            <Form.Group id ="message-input">
                <InputGroup>
                    <Form.Control type="text" style={{color:"black"}} ref={actualMessage} />
                    <InputGroup.Append>
                        <button style={{padding:"8px"}} onClick = {sendMessage} className="message-send-button" ><BsCursorFill size={20} /></button> 
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
        </div>  
        
        </div>
        </div>
        
        
        <div className="join-alert">
            {userJoined &&partner!=='' &&
                (<>
                <Image roundedCircle className="img-thumbnail" style ={{height:"50px", width:"50px",padding:"1px"}} src = {otherUserDeets.photoURL}/>
                 <span className="join-name">{partner} has joined!</span>
                 </>         
                )
            }
            {userLeft && (
                <span className="join-name">{otherUserName} got Sick of you!</span>
            )}
        </div>
        <div className ="control-panel">            
            <div className="copy-to-clipboard">
            <span className="copy-alert shadow">Copied!</span>
            <CopyToClipboard text={roomID.current}>
                <button className="shadow share-code-button" onClick={()=> copyAlert()}>Copy Room Code <BsClipboard size={15} /></button>
            </CopyToClipboard>
            </div>
                <div className="control-panel-element">
                    {visibilityMsg?
                    (<button onClick={moveIt} className="message-toggle"><BsChatSquare size={30} /><span className="button-details">Chat</span></button>):
                    ( gotANewMessage?
                        (<button onClick={moveIt} className="message-toggle"><BsChatSquareDotsFill size={30} /><span className="button-details">Chat</span></button>):
                        (<button onClick={moveIt} className="message-toggle"><BsChatSquareFill size={30} /><span className="button-details">Chat</span></button>) 
                    )}
                </div>
            <button className="control-button" onClick={() => leaveCall()}><Image roundedCircle src = {hangUp} height="50px" style = {{backgroundColor:"white", padding:"5px",paddingTop:"8px"}}/><span className="button-details">Leave Call</span></button>  
                
                {muteState?(<button className="control-button" onClick={muteUnmute}><BsFillMicMuteFill className="mic-icon" size={40}/><span className="button-details">Mute</span></button>)
                :(<button className="control-button" onClick={muteUnmute}><BsFillMicFill className="mic-icon" size={40}/><span className="button-details">Unmute</span></button>)}
                
                {blindState?(<button className="control-button" onClick = {pauseVideo}><BsCameraVideo className = "cam-icon"  size={40}/><span className="button-details">Video Off</span></button>)
                :(<button className="control-button" onClick = {pauseVideo}><BsCameraVideoFill className = "cam-icon"  size={40}/><span className="button-details">Video On</span></button>)
                }

        </div>
        </div>
    )
}
