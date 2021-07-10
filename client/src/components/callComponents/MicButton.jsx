import React, { useState } from 'react'
import {BsFillMicMuteFill, BsFillMicFill} from 'react-icons/bs'

/**
 * userStream = user media stream ref
 * muteState = boolean for if the user is muted 
 * setMuteState = sets the boolean for if the user is muted ot not i.e muteState 
 * this JSX element return the mic toggle element along with the function to mute or unmute the user audio
 */

export default function MicButton({userStream}) {

    const [muteState, setMuteState] = useState(false)

    function muteUnmute(){
        //mutes/unmute the user 
        //pausing or resuming the audio stream basically
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

    return (
        <>
            {muteState? //siaplaying the appropriate button to mute or unmute depending upon if the user is muted ot not
            (<button className="control-button" onClick={muteUnmute}><BsFillMicMuteFill className="mic-icon" 
            size={30} style={{backgroundColor:"red"}}/></button>)
            :(<button className="control-button" onClick={muteUnmute}><BsFillMicFill className="mic-icon" 
            size={30} style={{backgroundColor:"white"}}/></button>)}
        </>
    )
}
