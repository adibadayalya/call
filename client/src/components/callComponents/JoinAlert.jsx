import React from 'react'
import { Image } from 'react-bootstrap'

/**
 * otherUserDeets = other user i.e the partner user object 
 * otherUserName = name of the partner 
 * partner = other user detals
 * userJoined = boolean for if the user(partner) has joined the call/room
 * userLeft = boolean for if the user(partner) has left the call/room
 * this component returns the join alert which appears on the screen when an user joins or exits a room
 */

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
                <span className="join-name">{otherUserName} left!</span>
            )}
        </div>
    )
}
