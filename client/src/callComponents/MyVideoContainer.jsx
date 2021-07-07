import React from 'react'

export default function MyVideoContainer({userVideoContainer, userVideo}) {
    return (
        <div className="my-video-container" ref={userVideoContainer}>
            <span className="my-name">You</span>    
            <video className="my-video" autoPlay ref = {userVideo} muted />
        </div>
    )
}
