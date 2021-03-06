import React from 'react'
import {Button} from 'react-bootstrap'
import { useAuth } from '../../firebase/AuthContext'

/**
 * this JSX element returns the CONTINUE WITH MICROSOFT BUTTON and it's functionaliy
 */

export default function SignInWithMicrosoft() {

    const {msSignIn} = useAuth()//Microsoft authentication function
    
    return (
        <Button className="w-100 mt-2 shadow" style ={{backgroundColor:"black", border:"none"}} onClick = {msSignIn}>
            <img alt="Microsoft" style={{marginRight:"4px",marginBottom:"3px"}} width="20px" 
            src="https://image.flaticon.com/icons/png/512/732/732221.png"/>
        Continue with Microsoft
        </Button>
    )
}
