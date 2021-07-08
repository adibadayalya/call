import React from 'react'

export default function ShareScreen({senders, userStream}) {

    function screenShare() {
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
