import React from 'react'
import SignInWithGoogle from './SignInWithGoogle'
import SignInWithMicrosoft from './SignInWithMicrosoft'

/**
 * this JSX element is basically a collection of all alternative sign in methods wuch as Google and Microsoft 
 * sign in
 */

export default function SignInAlternatives() {
    return (
        <div style={{maxWidth:"400px", margin:"auto"}} className="text-center">
            <SignInWithGoogle />
            <span className="line-text">or</span>
            <SignInWithMicrosoft />
        </div>
    )
}
