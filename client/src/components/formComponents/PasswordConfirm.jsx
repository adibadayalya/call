import React from 'react'
import { Form, InputGroup,Button } from 'react-bootstrap'
import {EyeFill} from 'react-bootstrap-icons'

/**
 * forwardedRef = password confirm ref
 * this JSX element returns the CONFIRM PASSWORD field in the form at the different locations throughout the app and 
 * ability to toggle its visibility 
 */

export default function PasswordConfirm({forwardedRef}) {

    function toggleCnfPassword(){
        //changing the password visibility
        if(forwardedRef.current.type==="password"){
            forwardedRef.current.type="text";
        } else {
            forwardedRef.current.type="password";
        }
    }

    return (
        <Form.Group id="password-confirm" className="mt-3 mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
                <Form.Control type="password" required ref = {forwardedRef} style={{border:"none"}} />
                <InputGroup.Append>
                    <Button onClick={toggleCnfPassword} variant="outline-secondary" 
                    style={{backgroundColor:"white",border:"none", borderRadius:"0px",padding:"8px"}}>
                        <EyeFill size={20} color="black"/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form.Group>
    )
}
