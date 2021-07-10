import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from '../firebase/AuthContext'

/**
 * 
 * Private Route to prevent user from accessing dashborad 
 * and other routes without signing in 
 */

export default function PrivateRoute({component : Component, ...rest}) {

    const {currentUser} = useAuth()
    return (
        <Route 
            {...rest}
            render = {props =>{
               return currentUser ? <Component {...props}/> : <Redirect to ="/login" />
            }}
            ></Route>
    )
}
