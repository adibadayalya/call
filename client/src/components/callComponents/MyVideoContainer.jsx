import React from 'react'

/**
 * userVideoContainer = user video div ref
 * userVideo = user video stream ref 
 * this JSX element returns the user(i.e self) video 
 */

export default function MyVideoContainer({userVideoContainer, userVideo}) {
    return (
        <div className="my-video-container" ref={userVideoContainer}>
            <span className="my-name">You</span>    
            <video className="my-video" autoPlay ref = {userVideo} muted />
        </div>
    )
}
