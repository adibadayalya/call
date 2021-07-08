import React, { useState } from 'react'
import { BsCameraVideoFill, BsCameraVideo } from 'react-icons/bs';

export default function VideoButton({userStream, roomID, socketRef}) {

    const [blindState, setBlindState] = useState(false)

    function pauseVideo(){
        const enabled = userStream.current.getVideoTracks()[0].enabled;
        if(enabled){
            userStream.current.getVideoTracks()[0].enabled = false
            setBlindState(true)
            socketRef.current.emit('other-user-video-off',roomID)
        }
        else {
            userStream.current.getVideoTracks()[0].enabled = true
            socketRef.current.emit('other-user-video-on',roomID)
            setBlindState(false)
        }
    }

    return (
        <>
            {blindState?(<button className="control-button" onClick = {pauseVideo}><BsCameraVideo className = "cam-icon"  size={30} style={{backgroundColor:"red"}}/></button>)
            :(<button className="control-button" onClick = {pauseVideo}><BsCameraVideoFill className = "cam-icon"  size={30} style={{backgroundColor:"white"}}/></button>)
            }
        </>
    )
}
