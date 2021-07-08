import React, { useState } from 'react'
import {BsFillMicMuteFill, BsFillMicFill} from 'react-icons/bs'

export default function MicButton({userStream}) {

    const [muteState, setMuteState] = useState(false)

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

    return (
        <>
            {muteState?
            (<button className="control-button" onClick={muteUnmute}><BsFillMicMuteFill className="mic-icon" size={30} style={{backgroundColor:"red"}}/></button>)
            :(<button className="control-button" onClick={muteUnmute}><BsFillMicFill className="mic-icon" size={30} style={{backgroundColor:"white"}}/></button>)}

        </>
    )
}
