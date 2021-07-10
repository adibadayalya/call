import React, {useContext, useEffect, useState} from 'react'
import {auth} from './firebase'
import firebase from 'firebase';

/**
 * This file contains all the authentication related functions 
 * it exports the required functions and user details to various locations throughout the app wherever required
 */

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    var googleProvider = new firebase.auth.GoogleAuthProvider()
    var msProvider = new firebase.auth.OAuthProvider('microsoft.com')
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    function signup(email, password){
        //signup user usign email and password
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email, password){
        //log an existing user in using email and password
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        //signing out an existing user
        return auth.signOut()
    }

    function resetPassword(email){
        //resetting password through Email (forgot password) (only for users signed in using email and password)
        return auth.sendPasswordResetEmail(email)
    }

    function updatePassword(password){
        //changing password through tht update profile menu (only for users signed in using email and password)
        return currentUser.updatePassword(password)
    }

    function updateName(name){
        //updating the user name (only for users signed in using email and password)
        return currentUser.updateProfile({
            displayName: name 
        })
    }

    function googleSignIn(){
        // google authentication
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            // ...
        }).catch((error) => {
            console.log(error);
            // ...
        });
    }

    function msSignIn(){
        //microsoft authentication
        firebase.auth().signInWithPopup(msProvider)
            .then((result) => {
                // ...
            })
            .catch((error) => {
                // Handle error.
                console.log(error)
            });

    }

    useEffect(()=>{
        const unsubscibe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscibe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updatePassword,
        updateName,
        googleSignIn,
        msSignIn
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
