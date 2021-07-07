import React, {  useState } from 'react'
import { Button, Alert,Image,Form } from 'react-bootstrap'
import { useAuth } from '../firebase/AuthContext'
//import { useDataBase } from '../contexts/DataBaseContext';
import { Link, useHistory } from 'react-router-dom';
//import { SocketContext } from '../contexts/SocketContext';
import '../styles/dashBoard.css' 
import CreateMeeting from './CreateMeeting';
import graphicImage from '../images/graphic.jpeg'

export default function Dashboard() {
    const [idToCall, setIdToCall] = useState('');
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth()
    //const {writeUserData} = useDataBase()
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

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
            <div className="outt-div">
                <div className="d-flex menu-pic text-center">
                    {/* {(currentUser.metadata.creationTime===currentUser.metadata.lastSignInTime)&&(writeUserData(currentUser.uid, currentUser.displayName, currentUser.email, currentUser.photoURL))} */}
                    {currentUser.providerData[0].providerId === "password" &&(<>
                            <Link to ="/update-profile" className="btn-primary shadow update-btn">Update Profile</Link>
                            <div className="vl"></div>
                            <div className="mt-2"></div>
                        </>)}
                    <Image roundedCircle
                    src ={currentUser.photoURL || "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"} alt="default"
                    style = {{height:"40px", width:"40px",padding:"1px"}} />
                    <div style={{padding:"8px", width:"auto"}}>
                        <h5 className="mb-0">{currentUser.displayName}</h5>
                        <span>{currentUser.email}</span>
                        </div>
                        <div className="d-flex">
                        <div className="vl"></div>
                        <div className="mt-2">
                        <Button size="sm" onClick ={handleLogout} className="shadow">Log Out</Button>

                        </div>
                    </div>
                </div>         
                    <div className="d-flex">
                        <div  className="text-center call-menu shadow">
                            <Form onSubmit = {handleSubmit}>
                                <Form.Group id="name" className="mt-3 form-men">
                                    <CreateMeeting />
                                    <span className="line-text mt-4 mb-4">or</span>
                                    <Form.Control className="mt-3" type="text" placeholder="Enter Meeting Code" value = {idToCall} onChange = {(e)=>{setIdToCall(e.target.value)}}/>
                                    <Form.Label className="w-100"><button type = 'submit' className = "mt-3 join-room-btn" onClick ={()=>callUser(idToCall)}>Join Room</button></Form.Label>
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
