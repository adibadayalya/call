import React from 'react'
import {Button} from 'react-bootstrap'
import { useAuth } from '../firebase/AuthContext'

export default function SignInWithGoogle() {
    const {googleSignIn} = useAuth()
    return (
        <Button className="w-100 mt-2 shadow" style ={{backgroundColor:"black", border:"none"}} onClick = {googleSignIn}>
            <img alt="Google" style={{marginRight:"4px",marginBottom:"2px"}} width="20px" 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
        Continue with Google</Button>
    )
}
