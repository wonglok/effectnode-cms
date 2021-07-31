import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ENState, waitGet } from '../editor/ENState'
import { ENHtml } from '../editor/ENHtmls'
import { GraphEditorContent } from '../editor/GraphEditorContent'
import { Resizer } from '../editor/Resizer'
import { setupFirebase } from '../editor/firebase'
import { CanvasChecker } from '../auth/CanvasChecker'

export const GraphEditorPage = ({
  canvasID,
  ownerID,
  codes = [],
  firebaseConfig
}) => {
  return (
    <CanvasChecker firebaseConfig={firebaseConfig} canvasID={canvasID}>
      <GraphEditorApp
        firebaseConfig={firebaseConfig}
        canvasID={canvasID}
        ownerID={ownerID}
        codes={codes}
      ></GraphEditorApp>
    </CanvasChecker>
  )
}

export const GraphEditorApp = ({
  canvasID,
  ownerID,
  codes = [],
  firebaseConfig
}) => {
  let [okFirebase, setOKFirebase] = useState(false)
  let [okSize, setOKSize] = useState(false)
  useEffect(() => {
    ENState.canvasID = canvasID
    ENState.canvasOwnerID = ownerID
    ENState.firebaseConfig = firebaseConfig

    waitGet('firebaseConfig').then((firebaseConfig) => {
      setupFirebase({ firebaseConfig })
      setOKFirebase(true)
    })
  }, [canvasID, ownerID])

  let ref = useRef()
  return (
    <div
      ref={ref}
      className='auto-resize'
      style={{ width: `100%`, height: `100%`, position: 'relative' }}
    >
      <Canvas
        className='auto-resize'
        dpr={(typeof window !== 'undefined' && window.devicePixelRatio) || 1.0}
      >
        <Resizer setOKSize={setOKSize}></Resizer>
        {okFirebase && okSize && <GraphEditorContent></GraphEditorContent>}
      </Canvas>

      {okFirebase && okSize && <ENHtml codes={codes}></ENHtml>}

      {/* {okFirebase && (
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
              boxShadow: `0px 0px 20px 0px #bababa`,
              background: 'white',
              cursor: 'pointer',
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
      )} */}
    </div>
  )
}
