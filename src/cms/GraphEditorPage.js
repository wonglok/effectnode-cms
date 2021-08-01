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
  let ref = useRef()

  let [okFirebase, setOKFirebase] = useState(false)
  let [okSize, setOKSize] = useState(false)
  useEffect(() => {
    let setH100 = (q) => {
      try {
        let dom = document.querySelector(q)
        if (dom) {
          dom.style.height = '100%'
        }
      } catch (e) {
        console.log(e)
      }
    }
    setH100('html')
    setH100('body')
    setH100('#root')
    setH100('#__next')

    console.log(ref.current)
    ENState.canvasID = canvasID
    ENState.canvasOwnerID = ownerID
    ENState.firebaseConfig = firebaseConfig

    waitGet('firebaseConfig').then((firebaseConfig) => {
      setupFirebase({ firebaseConfig })
      setOKFirebase(true)
    })
  }, [canvasID, ownerID])

  return (
    <div
      ref={ref}
      style={{ width: `100%`, height: `100%`, position: 'relative' }}
    >
      <Canvas
        dpr={(typeof window !== 'undefined' && window.devicePixelRatio) || 1.0}
      >
        <Resizer setOKSize={setOKSize}></Resizer>
        {okFirebase && okSize && <GraphEditorContent></GraphEditorContent>}
      </Canvas>

      {okFirebase && okSize && <ENHtml codes={codes}></ENHtml>}
    </div>
  )
}
