import React, {useContext, useEffect, useState} from 'react'
import {auth} from './firebase'
import firebase from 'firebase';

const AuthContext = React.createContext()



export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    var googleProvider = new firebase.auth.GoogleAuthProvider()
    var msProvider = new firebase.auth.OAuthProvider('microsoft.com')
    //console.log(Provider)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function updateName(name){
        return currentUser.updateProfile({
            displayName: name 
        })
    }

    function googleSignIn(){
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            //var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = credential.accessToken;
            // The signed-in user info.
            //var user = result.user;
                // ...
        }).catch((error) => {
            console.log(error);
            // ...
        });
    }

    function msSignIn(){
        firebase.auth().signInWithPopup(msProvider)
            .then((result) => {
                // IdP data available in result.additionalUserInfo.profile.
                // ...

                /** @type {firebase.auth.OAuthCredential} */
                //var credential = result.credential;

                // OAuth access and id tokens can also be retrieved:
                //var accessToken = credential.accessToken;
                //var idToken = credential.idToken;
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
