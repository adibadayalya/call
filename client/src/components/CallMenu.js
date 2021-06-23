import React, { useState } from 'react'
import { Card, Button, Alert,Image,Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import CreateMeeting from './CreateMeeting';

export default function CallMenu() {
    const [idToCall, setIdToCall] = useState('');
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    async function handleLogout(){
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch {
            setError('Failed to Log Out')
        }
    }
    function callUser(){
        console.log(idToCall)
        //history.push('/meeting')
        //history.push(`/`)
    }
    return (
            <div style={{backgroundColor:"lightgrey"}}>
                
            <Card >         
            <Card.Body  className="text-center">
            <Image roundedCircle
                src ={currentUser.photoURL} alt="default"
                style = {{height:"150px", width:"150px",margin:"auto"}}/>   
                <h2 className="text-center mb-4">Call Menu</h2>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Form>
                <Form.Group id="name" className="mt-3">
                        <CreateMeeting />
                        <Form.Control type="text" placeholder="Enter Meeting Code" value = {idToCall} onChange = {(e)=>{setIdToCall(e.target.value)}}/>
                        {/*console.log(idToCall)*/}
                        <Form.Label className="w-100"><Link to ="/meeting" className = "btn btn-primary w-100 mt-3" onClick ={()=>callUser(idToCall)}>Join Meeting</Link></Form.Label>
                    </Form.Group>
                </Form>
                <Link to ="/" className = "btn btn-primary w-100 mt-3">Back To Dashboard</Link>
            </Card.Body>
            <div className="w-100 text-center mt-2">
                <Button variant="link" style={{textDecoration:"none"}} onClick ={handleLogout}>Log Out</Button>
            </div>
            </Card>
            </div>         
    )
}
