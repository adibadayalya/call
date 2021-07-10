import React, { useRef, useState } from 'react'
import {Form, Alert} from 'react-bootstrap'
import { useAuth } from '../firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Email from '../components/formComponents/Email'
import Password from '../components/formComponents/Password'
import SignInAlternatives from '../components/formComponents/SignInAlternatives'
import '../styles/login.css'

/**
 * login via email and other auth methods 
 * #returns the login page 
 */

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    async function handleSubmit(e){
        /**
         * Login Function for email users 
         */
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value , passwordRef.current.value)
            history.push("/")
        }
        catch(e){
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className="d-flex out-div">
        <div className = "login shadow">
            <div className="loginContent">
            <h2 className="text-center mb-4 heading" style={{color:"rgba(13,110,253,255)"}}>Log In</h2>
            <hr style={{height:"2.5px"}}/>
                {error && <Alert variant = "danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Email forwardedRef={emailRef}/>{/**Email form element */}

                    <Password forwardedRef ={passwordRef} /> {/**Passoword form element */}

                    <button disabled ={loading} type="submit" className="mt-2 shadow login-btn">Log In</button>
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
        <SignInAlternatives />
        </div>
    )
}
