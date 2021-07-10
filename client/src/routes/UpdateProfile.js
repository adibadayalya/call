import React, { useRef, useState } from 'react'
import {Form, Button, Alert, InputGroup} from 'react-bootstrap'
import { useAuth } from '../firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Mailbox, FilePersonFill } from 'react-bootstrap-icons'
import Password from '../components/formComponents/Password'
import PasswordConfirm from '../components/formComponents/PasswordConfirm'
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
        <div className="out-div">
        <div className="shadow updateProf">
            <div className="content">
            <h2 className="text-center" style={{color:"rgba(13,110,253,255)"}}>Update Profile</h2>
            <h6 className="text-center" style={{fontSize:"10px"}} >**Please type in the current passowrd in both fields if password change is not required</h6>
            <hr style={{height:"2.5px"}}/>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                <Form.Group id="name">
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
                    
                    <Password forwardedRef={passwordRef} />

                    <PasswordConfirm forwardedRef={passwordConfirmRef} />
                    <div className="w-100 text-center mt-3 d-flex" >
                        <Button disabled ={loading} type="submit" >Update</Button>
                        <Link className="shadow btn-primary backToDashBoard" to="/" style={{textDecoration:"none"}}>Back to Dashboard</Link>                    
                    </div>
                </Form>
            </div>
        </div>
        </div>
    )
}
