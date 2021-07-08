import React from 'react'
import HangUpBtn from '../images/HangUpButton.png'
import CopyRoomCodeButton from '../callComponents/CopyRoomCodeButton'
import ChatButton from '../callComponents/ChatButton';
import MicButton from '../callComponents/MicButton'
import VideoButton from '../callComponents/VideoButton'
import ShareScreen from './ShareScreen';

export default function ControlPanel({roomID, visibilityMsg, gotANewMessage, 
    messageWindow, userVideoContainer, setVisibilityMsg, setGotANewMessage, 
    userStream, socketRef, senders}) {

    function leaveCall() {
    console.log('leave')
    window.open('','_self').close()
    }

    return (
        <div className ="control-panel">


            
            <CopyRoomCodeButton roomID = {roomID} />
            <div className="control-panel-element">
                    <ChatButton visibilityMsg={visibilityMsg} gotANewMessage={gotANewMessage} messageWindow={messageWindow} 
                        userVideoContainer={userVideoContainer} setVisibilityMsg={setVisibilityMsg} setGotANewMessage={setGotANewMessage}
                    />
                </div>
            
                
                <MicButton userStream={userStream} />

            <img className="hang-up-btn" onClick={() => leaveCall()} src = {HangUpBtn} alt="hang-up"/>
                
                
                
                <VideoButton userStream={userStream} socketRef={socketRef} roomID={roomID.current} />

                
            <ShareScreen senders={senders} userStream={userStream} />

        </div>
    )
}
