import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from '../firebase/AuthContext'
import JoinAlert from '../callComponents/JoinAlert';
import ControlPanel from '../callComponents/ControlPanel'
import MyVideoContainer from '../callComponents/MyVideoContainer';
import PartnerVideoContainer from '../callComponents/PartnerVideoContainer'
import ChatPanel from '../callComponents/ChatPanel';

import '../styles/callStyles.css'

const videoConstraints = {
    height: window.innerHeight,
    width: window.innerWidth
};

export default function Room(props) {
    const {currentUser} = useAuth()
    const roomID = useRef(props.match.params.roomID)
    const userVideo = useRef()
    const partnerVideo = useRef()
    const peerRef = useRef()
    const partnerVideoGrid = useRef()
    const userVideoContainer = useRef()
    const socketRef = useRef()
    const otherUser = useRef()
    const userStream = useRef()
    const messageDiv = useRef()
    const actualMessage = useRef()
    const messageWindow = useRef()
    const senders = useRef([])
    const [init, setInint] = useState(true)
    const [otherUSerVideoVisible, setOtherUSerVideoVisible] = useState(true)
    const [visibilityMsg, setVisibilityMsg] = useState(false)
    const [userJoined, setUserJoined] = useState(false)
    const [userLeft, setUserLeft] = useState(false)
    const [gotANewMessage, setGotANewMessage] = useState(false)
    const [otherUserDeets, setOtherUserDeets] = useState()
    const [otherUserName, setOtherUserName] = useState('')
    const [partner, setPartner] = useState('')


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", ([props.match.params.roomID, currentUser]));

            socketRef.current.on('other user', ([userID, otherUserObject]) => {
                setInint(false)
                callUser(userID);
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
                partnerVideo.current.style.display = "none"
            })

            socketRef.current.on('video on by other user',() => {
                setOtherUSerVideoVisible(true)
                partnerVideo.current.style.display = "block"
            })

            socketRef.current.on('user left', (userID) =>{
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
            })
        });
        // eslint-disable-next-line
    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => senders.current.push(peerRef.current.addTrack(track, userStream.current)));
    }

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'turnServerPass',
                    username: 'abadayalya@gmail.com'
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
            userStream.current.getTracks().forEach(track => senders.current.push(peerRef.current.addTrack(track, userStream.current)));
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
        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
        partnerVideo.current.style.display = "block"
    };

    function joinAlert() {
        const joinElement = document.getElementsByClassName('join-alert')[0]
        joinElement.style.left = "2vw";
        setTimeout(()=>{joinElement.style.left="-50vw"}, 3000)
        if(joinElement.style.backgroundColor === "seagreen"){
            joinElement.style.backgroundColor = "red";
        } else {
            joinElement.style.backgroundColor = "seagreen"
        }
    }


    return (
        <div className="outer-box">
            <div className="video-container">

                <MyVideoContainer userVideoContainer={userVideoContainer} userVideo={userVideo} />

                <PartnerVideoContainer partnerVideoGrid={partnerVideoGrid} partner={partner}
                    otherUSerVideoVisible={otherUSerVideoVisible} otherUserDeets={otherUserDeets}
                    partnerVideo={partnerVideo}
                    />
                    
                <div ref = {messageWindow} className="msg-container">
                    <div ref={messageDiv} className="chat-window"></div> 
                    <>
                        {socketRef.current &&
                        (<ChatPanel actualMessage={actualMessage} 
                            messageDiv={messageDiv} socketRef={socketRef} setGotANewMessage={setGotANewMessage} 
                            roomID={roomID.current}/>
                        )}        
                    </>
                </div>
            </div>

            <JoinAlert otherUserDeets={otherUserDeets} otherUserName={otherUserName} 
                partner={partner} userJoined={userJoined} 
                userLeft={userLeft} 
                />
            

            <ControlPanel roomID={roomID} visibilityMsg={visibilityMsg} gotANewMessage={gotANewMessage}
                messageWindow={messageWindow} userVideoContainer={userVideoContainer} 
                setVisibilityMsg={setVisibilityMsg} setGotANewMessage={setGotANewMessage} 
                userStream={userStream} socketRef={socketRef} senders={senders}
                />
        </div>
    )
}
