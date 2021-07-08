import React from 'react'
import { BsChatSquareFill, BsChatSquare, BsChatSquareDotsFill} from 'react-icons/bs'



export default function ChatButton({visibilityMsg, gotANewMessage, messageWindow,userVideoContainer,setVisibilityMsg,setGotANewMessage}) {
    function handleEsc(e){
        if(visibilityMsg && e.keyCode===27){
            moveIt();
        }
    }

    function moveIt(){
        if(visibilityMsg){
            messageWindow.current.style.right ="-60vw"
            userVideoContainer.current.style.left ="74%";
            setVisibilityMsg(false)
            setGotANewMessage(false)
        } else {
            messageWindow.current.style.right="1vw"
            userVideoContainer.current.style.left ="45%";
            setVisibilityMsg(true)
            setGotANewMessage(false)
            
        }
    }

    return (
        <>
            {document.addEventListener('keydown', handleEsc)}
            {visibilityMsg?
            (<button onClick={moveIt} className="message-toggle"><BsChatSquare size={25} /></button>):
            ( gotANewMessage?
                (<button onClick={moveIt} className="message-toggle"><BsChatSquareDotsFill size={25} color="darkgreen" /></button>):
                (<button onClick={moveIt} className="message-toggle"><BsChatSquareFill size={25} color="white" /></button>) 
            )}
        </>
    )
}
