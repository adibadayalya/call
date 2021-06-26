import React, { useRef, useState } from 'react'
import {Form, Button, InputGroup, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
//import { SocketContext } from '../contexts/SocketContext'
import {EyeFill,Mailbox } from 'react-bootstrap-icons'
import '../styles/login.css'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, googleSignIn, msSignIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    //const {setName, name} = useContext(SocketContext)

    function togglePassword(){
        if(passwordRef.current.type==="password"){
            passwordRef.current.type="text";
        } else {
            passwordRef.current.type="password";
        }
    }
    async function handleSubmit(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value , passwordRef.current.value)
            //setName(currentUser.displayName)
            //console.log(name)
            history.push("/")
        }
        catch(e){
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className="d-flex">
        <div className = "login shadow">
            <div className="loginContent">
            <h2 className="text-center mb-4 heading" style={{color:"rgba(13,110,253,255)"}}>Log In</h2>
            <hr style={{height:"2.5px"}}/>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <Form.Control type="email" required ref = {emailRef} style={{border:"none"}}/>
                            <InputGroup.Append style={{backgroundColor:"white", border:"none", padding:'8px'}}>
                                <Mailbox size ={20} color="black" style={{backgroundColor:"white"}} />
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="password" className="mt-3 mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control type="password" required ref = {passwordRef} style={{border:"none"}} />
                            <InputGroup.Append>
                                <Button onClick={togglePassword} variant="outline-secondary" style={{backgroundColor:"white",border:"none", borderRadius:"0px",padding:"8px"}}><EyeFill size={20} color="black"/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Button disabled ={loading} type="submit" className="mt-2 shadow">Log In</Button>
                    <div className="w-100 text-center mt-3">
                        <Link to ="/forgot-password" style={{textDecoration:"none"}}>Forgot Password?</Link>
                    </div>
                </Form>
                <div className="text-center mt-2">
                    Don't have an account? <Link to ="/signup" style={{textDecoration:"none"}}>Sign Up</Link>
                </div>
            </div>
        </div>
        <span style={{margin:"auto"}}>or</span>
        <div style={{maxWidth:"400px", margin:"auto"}} className="text-center">
            <Button className="w-100 mt-2 shadow" style ={{backgroundColor:"black", border:"none"}} onClick = {googleSignIn}>
                <img alt="Google" style={{marginRight:"4px",marginBottom:"2px"}} width="20px" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                            Continue with Google</Button>
                            <span className="line-text">or</span>
            <Button className="w-100 mt-2 shadow" style ={{backgroundColor:"black", border:"none"}} onClick = {msSignIn}>
                <img alt="Microsoft" style={{marginRight:"4px",marginBottom:"3px"}} width="20px" 
                    src="https://image.flaticon.com/icons/png/512/732/732221.png"/>
                            Continue with Microsoft</Button>
        </div>
        </div>
    )
}
