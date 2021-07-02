import React, { useRef, useState } from 'react'
import {Form, Button, InputGroup, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Mailbox } from 'react-bootstrap-icons'

import '../styles/signUp.css' 

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions!') 
        }
        catch(e){
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div>
        <div className="form shadow" style={{marginTop:"15vh"}}>
            <div className="form-content">
            <h2 className="text-center mb-4" style={{color:"rgba(13,110,253,255)"}}>Password Reset</h2>
            <hr style={{height:"2.5px"}}/>
            {error && <Alert variant = "danger" >{error}</Alert>}
                {message && <Alert variant = "success" >{message}</Alert>}
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
                    <Button disabled ={loading} type="submit" className="w-100 mt-2">Send Reset Password Link</Button>
                </Form>
            </div>
            <div className="w-100 text-center mt-2"><Link to="/login" style={{textDecoration:"none"}}>Log In</Link></div>
        <div className="w-100 text-center mt-2">
            Don't have an account? <Link to ="/signup" style={{textDecoration:"none"}}>Sign Up!</Link>
        </div>
        </div>
        </div>
    )
}
