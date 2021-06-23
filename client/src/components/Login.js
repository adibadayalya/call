import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
//import { SocketContext } from '../contexts/SocketContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    //const {setName, name} = useContext(SocketContext)

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
        catch{
            setError('Failed to sign in')
        }
        setLoading(false)
    }
    return (
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref = {emailRef}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref = {passwordRef}/>
                    </Form.Group>
                    <Button disabled ={loading} type="submit" className="w-100 mt-2">Log In</Button>
                    <div className="w-100 text-center mt-3">
                        <Link to ="/forgot-password" style={{textDecoration:"none"}}>Forgot Password?</Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to ="/signup" style={{textDecoration:"none"}}>Sign Up</Link>
        </div>
        </>
    )
}
