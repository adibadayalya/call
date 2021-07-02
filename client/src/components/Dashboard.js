import React, {  useState } from 'react'
import { Button, Alert,Image,Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
//import { SocketContext } from '../contexts/SocketContext';
import '../styles/dashBoard.css' 
import CreateMeeting from './CreateMeeting';
import graphicImage from '../images/graphic.jpeg'

export default function Dashboard() {
    const [idToCall, setIdToCall] = useState('');
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    function callUser(){
        if(idToCall!==''){
            setError('')
            const win = window.open(`/meeting/${idToCall}`,'_blank')
            win.focus()
        } else{
            //history.push('/')
            setError('Enter room code!')
        }
        //history.push(`/`)
    }
    async function handleLogout(){
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch {
            setError('Failed to Log Out')
        }
    }
    return (
            <div>
                <div className="d-flex menu-pic text-center">
                    {currentUser.providerData[0].providerId === "password" ? 
                    (<Link to ="/update-profile"><Image roundedCircle
                    src ={currentUser.photoURL || "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"} alt="default"
                    style = {{height:"40px", width:"40px",padding:"1px"}} /> </Link>):
                    (<Image roundedCircle
                        src ={currentUser.photoURL || "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"} alt="default"
                        style = {{height:"40px", width:"40px",padding:"1px"}} />
                        )}
                    
                    <div style={{padding:"8px"}}>
                    <h5 className="mb-0">{currentUser.displayName}</h5>
                    <span>{currentUser.email}</span>
                    </div>
                    <div className="vl"></div>
                    <div className="mt-2">
                <Button size="sm" onClick ={handleLogout}>Log Out</Button>
            </div>
                </div>         
                    <div className="d-flex">
                        <div  className="text-center call-menu shadow">
                            <Form>
                                <Form.Group id="name" className="mt-3 form-men">
                                    <CreateMeeting />
                                    <span className="line-text mt-4 mb-4">or</span>
                                    <Form.Control className="mt-3" type="text" placeholder="Enter Meeting Code" value = {idToCall} onChange = {(e)=>{setIdToCall(e.target.value)}}/>
                                    <Form.Label className="w-100"><Button type = 'submit' className = "mt-3" onClick ={()=>callUser(idToCall)}><b>Join Room</b></Button></Form.Label>
                                </Form.Group>
                            </Form>
                            {error && <Alert variant = "danger" >{error}</Alert>}
                        </div>
                        <div className="img-graphic">
                            <Image className="actual-image" roundedCircle src={graphicImage} height="500px"/>
                        </div>
                    </div>
            </div>         
    )
}
