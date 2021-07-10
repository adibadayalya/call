import React from 'react'
import { BsChatSquareFill, BsChatSquare, BsChatSquareDotsFill} from 'react-icons/bs'

/**
 * visibilityMsg = boolean for if the message panel is visible
 * setVisibilityMsg = seeting the boolean value for if the message is visible i.e visibilityMsg
 * gotANewMessage = boolean for if a new message has arrived
 * setGotANewMessage = set the boolean value for if a new message has recieved i.e gotANewMessage
 * messageWindow = ref for the message window
 * userVideoContainer = the user(self) video container ref
 */

export default function ChatButton({visibilityMsg, gotANewMessage, messageWindow,userVideoContainer,setVisibilityMsg,setGotANewMessage}) {
    function handleEsc(e){
        //closing the chat panel with esx key
        if(visibilityMsg && e.keyCode===27){
            moveIt();
        }
    }

    function moveIt(){
        //Moves the chat panel into view
        if(visibilityMsg){
            //hiding the chat window
            messageWindow.current.style.right ="-60vw"
            userVideoContainer.current.style.left ="74%";
            setVisibilityMsg(false)
            setGotANewMessage(false)
        } else {
            //bringing the chat widow into view
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
