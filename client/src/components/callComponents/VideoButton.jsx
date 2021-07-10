import React, { useState } from 'react'
import { BsCameraVideoFill, BsCameraVideo } from 'react-icons/bs';

/**
 * userStream = current uesr video stream ref 
 * roomID = details of the current room the user is in
 * socketRef = details of the current socket connection
 * blindState = boolean for if the video is turned off or not
 * setBlindState = sets the boolean for if the video is turned off i.e blindState
 * this JSX element returns a button to toggle video and its functions
 */

export default function VideoButton({userStream, roomID, socketRef}) {

    const [blindState, setBlindState] = useState(false)

    function pauseVideo(){
        //pauses/resumes the video stream that is being sent to the partner or thte other user 
        const enabled = userStream.current.getVideoTracks()[0].enabled;
        if(enabled){
            //pausing the video stream
            userStream.current.getVideoTracks()[0].enabled = false
            setBlindState(true)
            //letting the other user know that the video is turned off 
            socketRef.current.emit('other-user-video-off',roomID)
        }
        else {
            //resuming the video stream 
            userStream.current.getVideoTracks()[0].enabled = true
            //letting the other user know that the video is turned back on
            socketRef.current.emit('other-user-video-on',roomID)
            setBlindState(false)
        }
    }

    return (
        <>
            {blindState?//choosing the appropriate toggle button depending upon the situation
            (<button className="control-button" onClick = {pauseVideo}><BsCameraVideo className = "cam-icon" 
             size={30} style={{backgroundColor:"red"}}/></button>)
            :(<button className="control-button" onClick = {pauseVideo}><BsCameraVideoFill className = "cam-icon" 
             size={30} style={{backgroundColor:"white"}}/></button>)
            }
        </>
    )
}
