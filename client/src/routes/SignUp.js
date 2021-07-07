import React, { useRef, useState } from 'react'
import {Form, Alert} from 'react-bootstrap'
import { useAuth } from '../firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import '../styles/signUp.css'
import Email from '../formComponents/Email'
import Name from '../formComponents/Name'
import Password from '../formComponents/Password'
import PasswordConfirm from '../formComponents/PasswordConfirm'
import SignInAlternatives from '../formComponents/SignInAlternatives'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()
    const { signup} = useAuth()
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
        catch(e){
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className="d-flex out-div">
            <div className="signUp shadow">
                <div className="signUpContent">
                <h2 className="text-center mb-4" style={{color:"rgba(13,110,253,255)"}}>Create an Account</h2>
                <hr style={{height:"2.5px"}}/>
                    {error && <Alert variant = "danger" >{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>

                    <Name forwardedRef={nameRef} />
                    
                    <Email forwardedRef={emailRef}/>

                    <Password forwardedRef ={passwordRef} />

                    <PasswordConfirm forwardedRef = {passwordConfirmRef} />    
                    
                    <button disabled ={loading} type="submit" className="mt-3 shadow signup-btn">Sign Up</button>
                </Form>
            </div>
        </div>
        <span style={{margin:"auto"}}>or</span>
        <div className="options-box">
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login" style={{textDecoration:"none"}}>Log In</Link>
            </div>
            <span className="line-text">or</span>
            <SignInAlternatives />
        </div>
    </div>
    )
}
