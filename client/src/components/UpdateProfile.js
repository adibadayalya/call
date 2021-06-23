import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser,updatePassword, updateName } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        setError('')
        if(passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError('Passwords do not match!')
        }

        const promises = []
        if(nameRef.current.value !== currentUser.displayName)
        {
            promises.push(updateName(nameRef.current.value))
        }
        if(passwordRef.current.value)
        {
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(()=> {
            history.push('/')
        }).catch(()=> {
            setError('Failed to Update Account')
        }).finally(()=>{
            setLoading(false)
        })
    }
    return (
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required ref = {nameRef} defaultValue = {currentUser.displayName}/>
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref = {emailRef} defaultValue = {currentUser.email} disabled/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref = {passwordRef} placeholder ="Leave Blank to keep the same"/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confrim Password</Form.Label>
                        <Form.Control type="password" ref = {passwordConfirmRef} placeholder ="Leave Blank to keep the same"/>
                    </Form.Group>
                    <Button disabled ={loading} type="submit" className="w-100 mt-2">Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2"><Link to="/" style={{textDecoration:"none"}}>Back to Dashboard</Link>
        </div>
        </>
    )
}
