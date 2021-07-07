import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BsClipboard } from 'react-icons/bs'

export default function CopyRoomCodeButton({roomID}) {
    function copyAlert() {
        const copyAlertElement = document.getElementsByClassName('copy-alert')[0]
        copyAlertElement.style.left='3vw'
        setTimeout(()=>{copyAlertElement.style.left="-40vw"}, 3000)
    }
    return (
        <div className="copy-to-clipboard">
            <span className="copy-alert shadow">Copied!</span>
            <CopyToClipboard text={roomID.current}>
                <button className="shadow share-code-button" onClick={()=> copyAlert()}>Copy Room Code <BsClipboard size={15} /></button>
            </CopyToClipboard>
        </div>
    )
}
