import React, { useEffect, useState } from 'react'
import { LoginChecker } from '../auth/LoginChecker'
import { logout } from '../editor/firebase'
import { ProjectListing } from '../projects/ProjectListing'
import { GraphEditorPage } from './GraphEditorPage'

export const CMSOnePage = ({ firebaseConfig, codes = [] }) => {
  let [selected, setSelected] = useState(false)

  useEffect(() => {
    //

    let calc = () => {
      let json = new URLSearchParams(document.location.search).get('json')

      if (json) {
        try {
          let parsed = JSON.parse(json)

          if (parsed && parsed.canvasID && parsed.ownerID) {
            setSelected(parsed)
          } else {
            setSelected(false)
          }
        } catch (e) {
          console.log(e)
          setSelected(false)
        }
      } else {
        setSelected(false)
      }
    }

    let href = ''
    let tt = setInterval(() => {
      if (window.location.href !== href) {
        href = window.location.href
        calc()
      }
    })

    return () => {
      clearInterval(tt)
    }
  }, [])

  return (
    <LoginChecker firebaseConfig={firebaseConfig}>
      {!selected && (
        <ProjectListing
          firebaseConfig={firebaseConfig}
          onEdit={(ev) => {
            setSelected({
              title: ev.title,
              ownerID: ev.ownerID,
              canvasID: ev.canvasID
            })
            window.history.pushState(
              {},
              'encms',
              `${window.location.pathname}?json=${encodeURIComponent(
                JSON.stringify(ev)
              )}`
            )
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
            top: `0px`,
            left: `0px`,
            zIndex: '1'
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
              window.history.pushState(
                {},
                'encms',
                `${window.location.pathname}`
              )
            }}
          >
            Back
          </div>
        </div>
      )}
      {selected && (
        <div
          //
          style={{
            position: 'absolute',
            bottom: `0px`,
            right: `0px`,
            zIndex: '1'
          }}
        >
          <div
            style={{
              fontSize: '12px',
              margin: '7px',
              padding: '7px 15px',
              background: 'white',
              cursor: 'pointer',
              borderRadius: '50px',
              border: 'gray solid 1px'
            }}
          >
            ({selected.title})
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
            zIndex: '1'
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
