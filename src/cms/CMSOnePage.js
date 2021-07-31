import React, { useState } from 'react'
import { LoginChecker } from '../auth/LoginChecker'
import { logout } from '../editor/firebase'
import { ProjectListing } from '../projects/ProjectListing'
import { GraphEditorPage } from './GraphEditorPage'

export const CMSOnePage = ({ firebaseConfig, codes = [] }) => {
  let [selected, setSelected] = useState(false)
  return (
    <LoginChecker firebaseConfig={firebaseConfig}>
      {!selected && (
        <ProjectListing
          firebaseConfig={firebaseConfig}
          onEdit={(ev) => {
            setSelected({
              ownerID: ev.ownerID,
              canvasID: ev.canvasID
            })
          }}
        ></ProjectListing>
      )}

      {selected && (
        <GraphEditorPage
          firebaseConfig={firebaseConfig}
          canvasID={selected.canvasID}
          ownerID={selected.ownerID}
          codes={codes}
        ></GraphEditorPage>
      )}

      {selected && (
        <div
          //
          style={{
            position: 'absolute',
            top: `60px`,
            right: `0px`,
            zIndex: '1000'
          }}
        >
          <div
            style={{
              margin: '12px',
              padding: '12px 25px',
              background: 'white',
              boxShadow: `0px 0px 20px 0px #bababa`,
              cursor: 'pointer',
              borderRadius: '50px'
            }}
            onClick={() => {
              //
              setSelected(false)
            }}
          >
            Back
          </div>
        </div>
      )}

      {!selected && (
        <div
          //
          style={{
            position: 'absolute',
            top: `0px`,
            right: `0px`,
            zIndex: '1000'
          }}
        >
          <div
            style={{
              margin: '12px',
              padding: '12px 25px',
              background: 'white',
              cursor: 'pointer',
              boxShadow: `0px 0px 20px 0px #bababa`,
              borderRadius: '50px'
            }}
            onClick={() => {
              //
              logout()
            }}
          >
            Logout
          </div>
        </div>
      )}
    </LoginChecker>
  )
}
