import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BsClipboard } from 'react-icons/bs'

/**
 * Copy room code button
 * copies the current room code to clipboard 
 * and then displays an alert that the room code has been copied 
 */

export default function CopyRoomCodeButton({roomID}) {
    
    function copyAlert() {
        //displays the alert that the code has been copied to the clipboard
        const copyAlertElement = document.getElementsByClassName('copy-alert')[0]
        copyAlertElement.style.left='0vw'
        setTimeout(()=>{copyAlertElement.style.left="-90vw"}, 3000)
    }
    return (
        <div className="copy-to-clipboard">
            <span className="copy-alert shadow">Copied!</span>
            <CopyToClipboard text={roomID.current}>
                <button className="shadow share-code-button" onClick={()=> copyAlert()}><BsClipboard size={30}  color ="white"/></button>
            </CopyToClipboard>
        </div>
    )
}
