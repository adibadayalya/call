import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from '../firebase/AuthContext'

/**
 * Public routes which are in accessible while logged in 
 * or accesible without sigining in
 */

export default function PublicRoute({component : Component, ...rest}) {

    const {currentUser} = useAuth()
    return (
        <Route 
            {...rest}
            render = {props =>{
               return !currentUser ? <Component {...props}/> : <Redirect to ="/" />
            }}
            ></Route>
    )
}
