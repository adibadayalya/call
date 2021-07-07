import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import {Mailbox} from 'react-bootstrap-icons'

export default function Email({forwardedRef}) {
    return (
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <InputGroup>
                <Form.Control type="email" required ref = {forwardedRef} style={{border:"none"}}/>
                <InputGroup.Append style={{backgroundColor:"white", border:"none", padding:'8px'}}>
                    <Mailbox size ={20} color="black" style={{backgroundColor:"white"}} />
                </InputGroup.Append>
            </InputGroup>
        </Form.Group>
    )
}
