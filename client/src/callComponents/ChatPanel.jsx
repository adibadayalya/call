import React, { useEffect } from 'react'
import { Form,InputGroup } from 'react-bootstrap'
import { BsCursorFill } from 'react-icons/bs' 
import { useAuth } from '../firebase/AuthContext'

export default function ChatPanel({actualMessage, messageDiv, socketRef, setGotANewMessage, roomID}) {

    const {currentUser} = useAuth()

    useEffect(() => {
        
        socketRef.current.on('recieved a new message', ([recievedMessage, senderName]) => {
            //setPartner(senderName)
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
        messageDiv.current.scrollTop=messageDiv.current.scrollHeight;
    }

    function sendMessage(){
        if(actualMessage.current.value!=="")
        {
            selfMessage(actualMessage.current.value);
            scrollToBottom()
            socketRef.current.emit('sending a message', ([actualMessage.current.value, currentUser.displayName, roomID]))
            actualMessage.current.value=""
        }
    }

    function selfMessage(messageText) {
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
