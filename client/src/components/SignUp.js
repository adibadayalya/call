import React, { useRef, useState } from 'react'
import {Form, Button, InputGroup, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import '../styles/signUp.css'
import { Mailbox, EyeFill, FilePersonFill } from 'react-bootstrap-icons'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()
    const { signup, googleSignIn, msSignIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function togglePassword(){
        if(passwordRef.current.type==="password"){
            passwordRef.current.type="text";
        } else {
            passwordRef.current.type="password";
        }
    }
    function toggleCnfPassword(){
        if(passwordConfirmRef.current.type==="password"){
            passwordConfirmRef.current.type="text";
        } else {
            passwordConfirmRef.current.type="password";
        }
    }
    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError('Passwords do not match!')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value , passwordRef.current.value).then((result)=> {
                return result.user.updateProfile({
                    displayName: nameRef.current.value,
                    photoURL:"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                })
            })
            history.push("/")
        }
        catch(e){
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className="d-flex">
            <div className="signUp shadow">
                <div className="signUpContent">
                <h2 className="text-center mb-4" style={{color:"rgba(13,110,253,255)"}}>Create an Account</h2>
                <hr style={{height:"2.5px"}}/>
                    {error && <Alert variant = "danger" >{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                    <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" required ref = {nameRef} style={{border:"none"}}/>
                                <InputGroup.Append style={{backgroundColor:"white", border:"none", padding:'8px'}}>
                                    <FilePersonFill size ={20} color="black" style={{backgroundColor:"white"}} />
                                </InputGroup.Append>
                            </InputGroup>
                    </Form.Group>
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
                    <Form.Group id="password-confirm" className="mt-3 mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control type="password" required ref = {passwordConfirmRef} style={{border:"none"}} />
                            <InputGroup.Append>
                                <Button onClick={toggleCnfPassword} variant="outline-secondary" style={{backgroundColor:"white",border:"none", borderRadius:"0px",padding:"8px"}}><EyeFill size={20} color="black"/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Button disabled ={loading} type="submit" className="mt-3 shadow">Sign Up</Button>
                </Form>
            </div>
        </div>
        <span style={{margin:"auto"}}>or</span>
        <div className="options-box">
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login" style={{textDecoration:"none"}}>Log In</Link>
            </div>
            <span className="line-text">or</span>
            <div style={{maxWidth:"400px", margin:"auto"}} className="text-center">
                <Button className="w-100 mt-2 shadow" style ={{backgroundColor:"black", border:"none"}} onClick = {googleSignIn}>
                    <img style={{marginRight:"4px",marginBottom:"2px"}} alt="Google" width="20px" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                            Continue with Google
                </Button>
                <span className="line-text">or</span>
                <Button className="w-100 mt-2 shadow" style ={{backgroundColor:"black", border:"none"}} onClick = {msSignIn}>
                    <img style={{marginRight:"4px",marginBottom:"3px"}} alt="Microsoft" width="20px" 
                        src="https://image.flaticon.com/icons/png/512/732/732221.png"/>
                            Continue with Microsoft
                </Button>
            </div>
        </div>
    </div>
    )
}
