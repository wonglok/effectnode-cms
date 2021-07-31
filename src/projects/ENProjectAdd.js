import React, { useState } from 'react'
import { ENState } from '../editor/ENState'
import { onReady } from '../editor/firebase'

export function ENProjectAdd({ firebaseConfig }) {
  let [title, setTitle] = useState('New Logic Graph')
  return (
    <div
      style={{
        padding: '15px',
        display: `flex`,
        justifyContent: 'start',
        alignItems: 'center'
      }}
    >
      <textarea
        rows={1}
        style={{
          padding: '15px',
          margin: '0px'
        }}
        value={title}
        onInput={(e) => {
          setTitle(e.target.value)
        }}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      ></textarea>
      <button
        style={{
          padding: '15px',
          margin: `0px`
        }}
        onClick={() => {
          //
          onReady({ firebaseConfig }).then(({ db, user }) => {
            let myCanvasListing = db.ref(`profile/${user.uid}/canvas`)
            let newItem = myCanvasListing.push()
            newItem.set({
              title,
              ownerID: user.uid,
              shareACL: {
                placeholder: false
              }
            })

            ENState.listingReload++
          })
        }}
      >
        Add Logic Graph
      </button>
    </div>
  )
}
