import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

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
        catch{
            setError('Failed to create an account')
        }
        setLoading(false)
    }
    return (
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required ref = {nameRef}/>
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref = {emailRef}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref = {passwordRef}/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confrim Password</Form.Label>
                        <Form.Control type="password" required ref = {passwordConfirmRef}/>
                    </Form.Group>
                    <Button disabled ={loading} type="submit" className="w-100 mt-2">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login" style={{textDecoration:"none"}}>Log In</Link>
        </div>
        </>
    )
}
