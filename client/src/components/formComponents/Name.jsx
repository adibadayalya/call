import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import {FilePersonFill} from 'react-bootstrap-icons'

/**
 * forwardedRef = name ref
 * this JSX element returns the NAME field in the form at the different locations throughout the app
 */

export default function Name({forwardedRef}) {
    return (
        <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <InputGroup>
                <Form.Control type="text" required ref = {forwardedRef} style={{border:"none"}}/>
                <InputGroup.Append style={{backgroundColor:"white", border:"none", padding:'8px'}}>
                    <FilePersonFill size ={20} color="black" style={{backgroundColor:"white"}} />
                </InputGroup.Append>
            </InputGroup>
        </Form.Group>
    )
}
