import React from 'react'
import { Image } from 'react-bootstrap'

/**
 * partnerVideoGrid =  partner video container div with name and the alt image 
 * partner = other user or caller 
 * otherUSerVisible = boolean for if the video of other user is visible 
 * partnerVideo = ref for video stream of the caller/partner 
 * this JSX element return the partner video, name and the alternative image for when the video si turned off
 */

export default function PartnerVideoContainer({partnerVideoGrid, partner,otherUSerVideoVisible,otherUserDeets,partnerVideo}) {
    return (
        <div className="partner-video-container" ref ={partnerVideoGrid}>  
            {
                partner ===''&&
                (
                    <span className="default-message">No one else is here</span>
                )
            }          
            {!otherUSerVideoVisible && partner!=='' && //when the video is turned off the alt image is show which is profile pictue of the user 
            (
                <div className="alt-image-vid-off">
                <Image roundedCircle className="alt-image-off img-thumbnail" style ={{height:"100px", width:"100px",padding:"1px"}} src = {otherUserDeets.photoURL} />
            </div>
            )}  
            {
                partner!=='' &&(
                    <>
                    <video className="caller-video" autoPlay ref = {partnerVideo} controls/>
                    <span className="caller-name">{partner}</span>
                    </>
                )
            }
                         
        </div>
    )
}
