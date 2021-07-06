import React, { useRef, useState } from 'react'
import {Form, Button, Alert, InputGroup} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Mailbox, EyeFill, FilePersonFill } from 'react-bootstrap-icons'
import '../styles/updateProfile.css'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser,updatePassword, updateName } = useAuth()
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
        <div className="shadow updateProf">
            <div className="content">
            <h2 className="text-center mb-4" style={{color:"rgba(13,110,253,255)"}}>Update Profile</h2>
            <hr style={{height:"2.5px"}}/>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                <Form.Group id="name" className="mt-1">
                        <Form.Label>Name</Form.Label>
                        <InputGroup>
                        <Form.Control type="text" required ref = {nameRef} defaultValue = {currentUser.displayName}/>
                            <InputGroup.Append style={{backgroundColor:"white", border:"none", padding:'8px'}}>
                                <FilePersonFill size ={20} color="black" style={{backgroundColor:"white"}} />
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="email" className="mt-1">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                        <Form.Control type="email" required ref = {emailRef} defaultValue = {currentUser.email} disabled/>
                        <InputGroup.Append style={{backgroundColor:"white", border:"none", padding:'8px'}}>
                                <Mailbox size ={20} color="black" style={{backgroundColor:"white"}} />
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="password" className="mt-1 mb-2">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control type="password" ref = {passwordRef} style={{border:"none"}} />
                            <InputGroup.Append>
                                <Button onClick={togglePassword} variant="outline-secondary" style={{backgroundColor:"white",border:"none", borderRadius:"0px",padding:"8px"}}><EyeFill size={20} color="black"/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="password-confirm" className="mt-1 mb-2">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control type="password" ref = {passwordConfirmRef} style={{border:"none"}}/>
                            <InputGroup.Append>
                                <Button onClick={toggleCnfPassword} variant="outline-secondary" style={{backgroundColor:"white",border:"none", borderRadius:"0px",padding:"8px"}}><EyeFill size={20} color="black"/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Button disabled ={loading} type="submit" className="mt-2">Update</Button>
                </Form>
            </div>
        </div>
        <div className="w-100 text-center mt-3"><Link className="shadow btn-primary backToDashBoard" to="/" style={{textDecoration:"none"}}>Back to Dashboard</Link>
        </div>
        </>
    )
}
