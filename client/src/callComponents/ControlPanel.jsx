import React from 'react'
import { Image } from 'react-bootstrap';
import hangUp from '../images/hang-up.png'
import CopyRoomCodeButton from '../callComponents/CopyRoomCodeButton'
import ChatButton from '../callComponents/ChatButton';
import MicButton from '../callComponents/MicButton'
import VideoButton from '../callComponents/VideoButton'


export default function ControlPanel({roomID, visibilityMsg, gotANewMessage, 
    messageWindow, userVideoContainer, setVisibilityMsg, setGotANewMessage, 
    userStream, socketRef}) {

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
            <button className="control-button" onClick={() => leaveCall()}><Image roundedCircle src = {hangUp} height="50px" style = {{backgroundColor:"white", padding:"5px",paddingTop:"8px"}}/><span className="button-details">Leave Call</span></button>  
                
                <MicButton userStream={userStream} />
                {/* {muteState?(<button className="control-button" onClick={muteUnmute}><BsFillMicMuteFill className="mic-icon" size={30} style={{backgroundColor:"red"}}/><span className="button-details">Mute</span></button>)
                :(<button className="control-button" onClick={muteUnmute}><BsFillMicFill className="mic-icon" size={30} style={{backgroundColor:"white"}}/><span className="button-details">Unmute</span></button>)} */}
                
                <VideoButton userStream={userStream} socketRef={socketRef} roomID={roomID.current} />

        </div>
    )
}
