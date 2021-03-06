import React from 'react'
import { Form, InputGroup,Button } from 'react-bootstrap'
import {EyeFill} from 'react-bootstrap-icons'

/**
 * forwardedRef = password ref
 * this JSX element returns the PASSWORD field in the form at the different locations throughout the app and 
 * ability to toggle the visibility of the password
 */

export default function Password({forwardedRef}) {
    
    function togglePassword(){
        //changing the password visibility
        if(forwardedRef.current.type==="password"){
            forwardedRef.current.type="text";
        } else {
            forwardedRef.current.type="password";
        }
    }

    return (
        <Form.Group id="password" className="mt-3 mb-3">
            <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control type="password" required ref = {forwardedRef} style={{border:"none"}} />
                    <InputGroup.Append>
                        <Button onClick={togglePassword} variant="outline-secondary" 
                        style={{backgroundColor:"white",border:"none", borderRadius:"0px",padding:"8px"}}>
                            <EyeFill size={20} color="black"/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
        </Form.Group>
    )
}
