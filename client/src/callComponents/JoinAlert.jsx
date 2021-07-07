import React from 'react'
import { Image } from 'react-bootstrap'

export default function JoinAlert({otherUserDeets, otherUserName, partner, userJoined, userLeft}) {
    return (
        <div className="join-alert">
            {userJoined &&partner!=='' &&
                (<>
                    <Image roundedCircle className="img-thumbnail" style ={{height:"50px", width:"50px",padding:"1px"}} src = {otherUserDeets.photoURL}/>
                     <span className="join-name">{otherUserName} has joined!</span>
                 </>         
                )
            }
            {userLeft && (
                <span className="join-name">{otherUserName} got Sick of you!</span>
            )}
        </div>
    )
}
