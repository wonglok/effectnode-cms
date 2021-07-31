import React, { useEffect } from 'react'
import { loginGoogle, setupFirebase, firebase } from '../editor/firebase'
export function LoginPage({ done, firebaseConfig }) {
  return (
    <div
      style={{
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        display: `flex`,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <LoginWithGoogle
        firebaseConfig={firebaseConfig}
        done={done}
      ></LoginWithGoogle>
    </div>
  )
}

function LoginWithGoogle({ done, firebaseConfig }) {
  //
  useEffect(() => {
    setupFirebase({ firebaseConfig })
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        done(user)
      }
    })
  }, [])

  return (
    <button
      style={{
        cursor: 'pointer',
        backgroundColor: 'rgba(50,50,255,1.0)',
        color: 'white',
        borderRadius: '50px',
        padding: '20px 25px',
        appearance: 'none',
        border: 'none',
        fontSize: '20px'
      }}
      className=' cursor-pointer bg-blue-500 text-white rounded-full px-6 py-3'
      onClick={() => {
        loginGoogle()
      }}
    >
      Login With Google
    </button>
  )
}
