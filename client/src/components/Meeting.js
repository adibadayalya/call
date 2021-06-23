import React, { useState } from 'react'
import { Alert, Button} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {  useHistory } from 'react-router-dom';
//import { SocketContext } from '../contexts/SocketContext';
import VideoPlayer from './callComponents/VideoPlayer';
import Options from './callComponents/Options';
import Notification from './callComponents/Notification';

export default function Meeting() {
    const [error,setError] = useState('');
    const { logout} = useAuth()
    const history = useHistory()
    //const {videoOff,micOff} = useContext(SocketContext)
    
    async function handleLogout(){
        setError('')
        try {
            await logout()
            //videoOff()
            //micOff()
            history.push("/login")
        } catch {
            setError('Failed to Log Out')
        }
    }
    return (
            <div className="justify-content-center p-5" style={{backgroundColor:"black",justifyContent:"center"}}>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <div className="container">
                        <VideoPlayer className="center ml-2"/>
                </div>
            <div className="text-center">
            <Options>
                <Notification/>
            </Options>
                <Button variant="link" style={{textDecoration:"none"}} onClick ={handleLogout}>Log Out</Button>
            </div>
            </div>         
    )
}
