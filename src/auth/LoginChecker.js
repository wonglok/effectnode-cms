import React, { useEffect, useState } from 'react'
import { firebase, setupFirebase } from '../editor/firebase'
import { LoginPage } from './LoginPage'
export function LoginChecker({ firebaseConfig, children, canvasID = false }) {
  let [state, setState] = useState('ready')

  useEffect(() => {
    let cleans = []

    setupFirebase({ firebaseConfig })

    let clean = firebase.auth().onAuthStateChanged((user) => {
      //
      if (canvasID && user) {
        firebase
          .database()
          .ref(`/profile/${user.uid}/canvas/${canvasID}`)
          .once('value', (snap) => {
            let val = snap.val()
            if (val && val.ownerID === user.uid) {
              setState('show')
            } else if (val.shareACL[user.uid]) {
              setState('show')
            } else {
              setState('noRights')
            }
          })
      } else {
        if (user) {
          setState('show')
        } else {
          setState('needsLogin')
        }
      }
    })

    cleans.push(clean)

    return () => {
      cleans.forEach((s) => s())
    }
  }, [])

  return (
    <span>
      {state === 'show' && children}
      {state === 'loading' && (
        <div style={{ width: '100%', height: '100%' }}>Loading</div>
      )}
      {state === 'needsLogin' && (
        <LoginPage
          done={() => {
            //
            setState('show')
          }}
          firebaseConfig={firebaseConfig}
        ></LoginPage>
      )}
      {state === 'noRights' && (
        <div style={{ width: '100%', height: '100%' }}>No Access Rights.</div>
      )}
    </span>
  )
}

/*
//
{
  "rules": {
    ".read": false,
    ".write": false,

    "profile": {
      "$user_id": {
        "canvas": {
          "$canvasID": {
            ".read": "auth !== null",
            "shareACL": {
              ".write": "auth !== null && auth.uid === $user_id",
            },
            "ownerACL": {
              ".write": "auth !== null && auth.uid === $user_id",
            }
          },
        }
      }
    },
    "canvas": {
      "$canvasID": {
        ".read": true,
        ".write": "auth !== null && root.child('profile').child(auth.uid).child('canvas').child('ownerACL').hasChild(auth.uid) || auth !== null && root.child('profile').child(auth.uid).child('canvas').child('ownerACL').hasChild(auth.uid) "
      }
    }
  }
}
*/
