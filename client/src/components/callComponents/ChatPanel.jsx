import React, { useEffect } from 'react'
import { Form,InputGroup } from 'react-bootstrap'
import { BsCursorFill } from 'react-icons/bs' 
import { useAuth } from '../../firebase/AuthContext'

/**
 * actualMessage = message to be sent 
 * messageDiv = div with all the messages 
 * socketref = current socket ref
 * setGotANewMessage = setting the boolean for if a new messate is recieved 
 * roomID = current room details 
 */

export default function ChatPanel({actualMessage, messageDiv, socketRef, setGotANewMessage, roomID}) {

    const {currentUser} = useAuth()//details of the currently logged in user

    useEffect(() => {
        //receving a new message from the partner
        socketRef.current.on('recieved a new message', ([recievedMessage, senderName]) => {
            otherMessage(recievedMessage, senderName)
            setGotANewMessage(true)
            scrollToBottom()
        })
        // eslint-disable-next-line 
    },[]);

    function handleSubmit(e) {
        e.preventDefault();
    }

    function scrollToBottom() {
        //scrolling to bottom of the message div automatically
        messageDiv.current.scrollTop=messageDiv.current.scrollHeight;
    }

    function sendMessage(){
        //sending a message in the chat 
        if(actualMessage.current.value!=="")
        {
            selfMessage(actualMessage.current.value);
            scrollToBottom()
            socketRef.current.emit('sending a message', ([actualMessage.current.value, currentUser.displayName, roomID]))
            actualMessage.current.value=""
        }
    }

    function selfMessage(messageText) {
        //adding the message onto the screen of the sender in the message div
        var messageDetails = document.createElement('div')
        messageDetails.classList.add('messageCard')
        var yourName = document.createElement('p')
        yourName.innerText = 'You'
        yourName.classList.add('senderDetails')
        yourName.classList.add('senderDetailsSelf')
        var newMsg = document.createElement('p')
        newMsg.innerText = messageText
        newMsg.classList.add('msg')
        messageDetails.append(yourName)
        messageDetails.append(newMsg)
        return (messageDiv.current.append(messageDetails))
    }

    function otherMessage(messageText, senderName) {
        //adding the message recieved from the partner to the screen in the message div
        var messageDetails = document.createElement('div')
        messageDetails.classList.add('messageCard')
        var otherName = document.createElement('p')
        otherName.innerText = senderName
        otherName.classList.add('senderDetails')
        otherName.classList.add('senderDetailsOther')
        var newMsg = document.createElement('p')
        newMsg.innerText = messageText
        newMsg.classList.add('msg')
        messageDetails.append(otherName)
        messageDetails.append(newMsg)
        return (messageDiv.current.append(messageDetails))
    }

    return (
        <div className ="msg-box">
        {/**the message input box along with the send button*/}
        <Form onSubmit={handleSubmit}>
            <Form.Group id ="message-input">
                <InputGroup>
                    <Form.Control type="text" style={{color:"black"}} ref={actualMessage} />
                    <InputGroup.Append>
                        <button style={{padding:"8px"}} onClick = {sendMessage} className="message-send-button" ><BsCursorFill size={20} /></button> 
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
        </div>  
    )
}
