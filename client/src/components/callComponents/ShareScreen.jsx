import React from 'react'

/**
 * senders = ref of array of strams of the senders
 * userStream = current user stream
 * this JSX element returns the 'Share Screen' button in the call menu along with the functionality to 
 * share one's screen
 */

export default function ShareScreen({senders, userStream}) {

    function screenShare() {
        //function allows toshare screen with the partner user basically swaps out the current video track
        //with the the screen track
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
            const screenTrack = stream.getTracks()[0];
            senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
            screenTrack.onended = function() {
                senders.current.find(sender => sender.track.kind === "video").replaceTrack(userStream.current.getTracks()[1]);
            }
        })
    }

    return (
        <button className="screen-share" onClick={()=>{screenShare()}}>Share Screen</button>
    )
}
