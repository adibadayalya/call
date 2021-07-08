import React from 'react'
import { Image } from 'react-bootstrap'

export default function PartnerVideoContainer({partnerVideoGrid, partner,otherUSerVideoVisible,otherUserDeets,partnerVideo}) {
    return (
        <div className="partner-video-container" ref ={partnerVideoGrid}>  
            {
                partner ===''&&
                (
                    <span className="default-message">You are Alone</span>
                )
            }          
            {!otherUSerVideoVisible && partner!=='' && 
            (
                <div className="alt-image-vid-off">
                <Image roundedCircle className="alt-image-off img-thumbnail" style ={{height:"100px", width:"100px",padding:"1px"}} src = {otherUserDeets.photoURL} />
            </div>
            )}  
            {
                partner!=='' &&(
                    <>
                    <video controls className="caller-video" autoPlay ref = {partnerVideo} />
                    <span className="caller-name">{partner}</span>
                    </>
                )
            }
                         
        </div>
    )
}
