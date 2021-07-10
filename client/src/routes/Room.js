import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from '../firebase/AuthContext'
import JoinAlert from '../components/callComponents/JoinAlert';
import ControlPanel from '../components/callComponents/ControlPanel'
import MyVideoContainer from '../components/callComponents/MyVideoContainer';
import PartnerVideoContainer from '../components/callComponents/PartnerVideoContainer'
import ChatPanel from '../components/callComponents/ChatPanel';

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
        //getting user media stream from the browser 
        navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then(stream => {
            //adding source to the user(self) video stram
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("/"); //connecting to socket io
            //letting other userd if any know that a new person has joined
            socketRef.current.emit("join room", ([props.match.params.roomID, currentUser]));

            //if there already exists another user in the room
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

            //if a new user has joined the room
            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });

            //handling the recieved call from the other user or the offer of data
            socketRef.current.on("offer", handleRecieveCall);

            //ansering the call
            socketRef.current.on("answer", handleAnswer);

            //establishing the ICE server agreement 
            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

            //video toggle alert
            socketRef.current.on('video off by other user',() => {
                setOtherUSerVideoVisible(false)
                partnerVideo.current.style.display = "none"
            })

            //video toggle alert
            socketRef.current.on('video on by other user',() => {
                setOtherUSerVideoVisible(true)
                partnerVideo.current.style.display = "block"
            })

            //user disconnected alert
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
        })
        .catch(()=> {
            //error message if the camera/mic is not found or permission is denied
            alert('You can not join/create without providing permission for camera and mic input!')
        })
        // eslint-disable-next-line
    }, []);

    function callUser(userID) {
        //sendding an offer request 
        peerRef.current = createPeer(userID);
        //adding the stram information to the peerObject
        userStream.current.getTracks().forEach(track => senders.current.push(peerRef.current.addTrack(track, userStream.current)));
    }

    function createPeer(userID) {
        //userID is the ID of the person the current user is trying to call
        //creating a peer
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                
                {
                    url: 'turn:numb.viagenie.ca',
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
        //negotiating the terms of the connection iand providing the offer data to the other user 
        peerRef.current.createOffer().then(offer => {
            //self description i.e offer details
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription,//actally offer details
                userObject: currentUser
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        //handeling the recieved call and providing with appropriate data in return to the user
        peerRef.current = createPeer();
        //other user offer details
        const desc = new RTCSessionDescription(incoming.sdp);

        if(incoming.userObject&&init) {
            setUserJoined(true)
            joinAlert()
            setUserLeft(false)
            setOtherUserDeets(incoming.userObject)
            setOtherUserName(incoming.userObject.displayName)
            setPartner(incoming.userObject.displayName)
        }
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
        //setting remote offer details
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        //ICE candidates agreement 
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
        //exchanging ice candidates
        const candidate = new RTCIceCandidate(incoming);
        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        //hadleing streams from the other user 
        partnerVideo.current.srcObject = e.streams[0];
        partnerVideo.current.style.display = "block"
    };

    function joinAlert() {
        //Alertung users if an user has left or joined
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
                {/**User Video */}
                <MyVideoContainer userVideoContainer={userVideoContainer} userVideo={userVideo} />
                {/**Partner/Caller Video and name */}
                <PartnerVideoContainer partnerVideoGrid={partnerVideoGrid} partner={partner}
                    otherUSerVideoVisible={otherUSerVideoVisible} otherUserDeets={otherUserDeets}
                    partnerVideo={partnerVideo}
                    />
                {/**Chat Panel */}
                <div ref = {messageWindow} className="msg-container">
                    <div ref={messageDiv} className="chat-window"></div> 
                    <>
                        {socketRef.current && //message input when connection is estabilshed to socket
                        (<ChatPanel actualMessage={actualMessage} 
                            messageDiv={messageDiv} socketRef={socketRef} setGotANewMessage={setGotANewMessage} 
                            roomID={roomID.current}/>
                        )}        
                    </>
                </div>
            </div>
            
            {/**Join and leave alerts to the user */}
            <JoinAlert otherUserDeets={otherUserDeets} otherUserName={otherUserName} 
                partner={partner} userJoined={userJoined} 
                userLeft={userLeft} 
                />
            
            {/**All the buttons icluding mic/video/chat toggle ,screen share and leave call */}
            <ControlPanel roomID={roomID} visibilityMsg={visibilityMsg} gotANewMessage={gotANewMessage}
                messageWindow={messageWindow} userVideoContainer={userVideoContainer} 
                setVisibilityMsg={setVisibilityMsg} setGotANewMessage={setGotANewMessage} 
                userStream={userStream} socketRef={socketRef} senders={senders}
                />
        </div>
    )
}
