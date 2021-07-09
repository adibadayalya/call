import React, {  useState } from 'react'
import { Button, Alert,Image,Form } from 'react-bootstrap'
import { useAuth } from '../firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import '../styles/dashBoard.css' 
import CreateMeeting from './CreateMeeting';
import graphicImage from '../images/graphic.jpeg'

/**
 * This is the dashboard page 
 * consists of the create room button and the join room button 
 * along with the update profile button(for users who signed up via emall), 
 * basic profile detains and the logout button
 * #returns The Dashboard
 */

export default function Dashboard() {
    const [idToCall, setIdToCall] = useState('');//used to determine the roomID to be joined taken from user input 
    const [error, setError] = useState('');//catching Errors 
    const {currentUser, logout} = useAuth();//getting current user and the log out function from the auth module
    const history = useHistory()//used from touting
    function callUser(){
        /**
         * getting user to join a cretain room from the code enterd
         */
        if(idToCall!==''){
            //opening the room in the new tab
            setError('')
            const win = window.open(`/meeting/${idToCall}`,'_blank')
            win.focus()
        } else{
            //If ID inputted is blank
            setError('Enter room code!')
        }
    }
    async function handleLogout(){
        //Log Out function
        setError('')
        try {
            await logout()
            //On sucess rerouting back to the login page
            history.push("/login")
        } catch {
            setError('Failed to Log Out')
        }
    }

    function handleSubmit(e) {
        //preventing the default form action
        e.preventDefault();
    }

    return (
            <div className="outt-div">
                <div className="d-flex menu-pic text-center">
                    {//conditional display of the update profile button if the user had signed up with emai rahter 
                    //than opting for the sign in with google/microsoft options
                    currentUser.providerData[0].providerId === "password" &&(<>
                            <Link to ="/update-profile" className="btn-primary shadow update-btn">Update Profile</Link>
                            <div className="vl"></div>
                            <div className="mt-2"></div>
                        </>)}
                    {/**Profile Image */}
                    <Image roundedCircle
                    src ={currentUser.photoURL || "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"} alt="default"
                    style = {{height:"40px", width:"40px",padding:"1px"}} />
                    {/**Name and Email of the logged in user user */}
                    <div style={{padding:"8px", width:"auto"}}>
                        <h5 className="mb-0">{currentUser.displayName}</h5>
                        <span>{currentUser.email}</span>
                    </div>
                    <div className="d-flex">
                        {/**The line between the name and the log out button */}
                        <div className="vl" />
                        {/**Log out button */}
                        <div className="mt-2">
                            <Button size="sm" onClick ={handleLogout} className="shadow">Log Out</Button>
                        </div>
                    </div>
                </div>
                {/**The Create room nad jin room form div */}         
                <div className="d-flex">
                    <div  className="text-center call-menu shadow">
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group id="name" className="mt-3 form-men">
                                <CreateMeeting />{/**Create Meeting element imported from CreateMeeting.js */}
                                <span className="line-text mt-4 mb-4">or</span>{/**The seprator line with or in between it */}
                                {/**The input box element for the Room Code */}
                                <Form.Control className="mt-3" type="text" placeholder="Enter Meeting Code" 
                                    value = {idToCall} onChange = {(e)=>{setIdToCall(e.target.value)}}
                                    />
                                {/**Join Room Button */}
                                <Form.Label className="w-100"><button type = 'submit' className = "mt-3 join-room-btn" 
                                    onClick ={()=>callUser(idToCall)}>Join Room</button>
                                </Form.Label>
                            </Form.Group>
                        </Form>
                        {/**Error messages */}
                        {error && <Alert variant = "danger" >{error}</Alert>}
                    </div>
                    {/**Image on the right at the dashboard */}
                    <div className="img-graphic">
                        <Image className="actual-image" roundedCircle src={graphicImage} height="500px"/>
                    </div>
                </div>
            </div>         
    )
}
