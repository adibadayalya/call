import React from 'react'
import SignInWithGoogle from './SignInWithGoogle'
import SignInWithMicrosoft from './SignInWithMicrosoft'

export default function SignInAlternatives() {
    return (
        <div style={{maxWidth:"400px", margin:"auto"}} className="text-center">
            <SignInWithGoogle />
            <span className="line-text">or</span>
            <SignInWithMicrosoft />
        </div>
    )
}
