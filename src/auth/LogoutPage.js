import React, { useEffect } from 'react'
import { setupFirebase, firebase } from './firebase'

export function LogoutPage({ firebaseConfig }) {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <LogoutStatus firebaseConfig={firebaseConfig}></LogoutStatus>
    </div>
  )
}

function LogoutStatus({ firebaseConfig }) {
  useEffect(() => {
    setupFirebase({ firebaseConfig })
    return firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // firebaseConfig
        // window.location.assign('/effectnode')
      } else {
        firebase.auth().signOut()
      }
    })
  })

  return (
    <div className='cursor-default bg-red-500 text-white rounded-full px-6 py-3'>
      Logging you out
    </div>
  )
}
