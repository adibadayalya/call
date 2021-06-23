import React, {  useState } from 'react'
import { Card, Button, Alert,Image } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
//import { SocketContext } from '../contexts/SocketContext';

export default function Dashboard() {
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth()
    const history = useHistory()
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
            <div style={{backgroundColor:"lightgrey"}}>
            <Card >         
            <Card.Body  className="text-center">
            <Image roundedCircle
                src ={currentUser.photoURL} alt="default"
                style = {{height:"150px", width:"150px",margin:"auto"}} />
                <h2 className="text-center mb-4">Hello {currentUser.displayName}!</h2>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to ="/update-profile" className = "btn btn-primary w-100 mt-3">Update Profile</Link>
                <Link to ="/call-menu" className = "btn btn-primary w-100 mt-3">Call Menu</Link>
            </Card.Body>
            <div className="w-100 text-center mt-2">
                <Button variant="link" style={{textDecoration:"none"}} onClick ={handleLogout}>Log Out</Button>
            </div>
            </Card>
            </div>         
    )
}
