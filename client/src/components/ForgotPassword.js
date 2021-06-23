import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

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
        catch{
            setError('Failed to reset Password')
        }
        setLoading(false)
    }
    return (
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant = "danger" >{error}</Alert>}
                {message && <Alert variant = "success" >{message}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref = {emailRef}/>
                    </Form.Group>
                    <Button disabled ={loading} type="submit" className="w-100 mt-2">Reset Password</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2"><Link to="/login" style={{textDecoration:"none"}}>Log In</Link></div>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to ="/signup" style={{textDecoration:"none"}}>Sign Up</Link>
        </div>
        </>
    )
}
