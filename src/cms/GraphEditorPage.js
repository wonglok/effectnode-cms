import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ENState, waitGet } from '../editor/ENState'
import { ENHtml } from '../editor/ENHtmls'
import { GraphEditorContent } from '../editor/GraphEditorContent'
import { setupFirebase } from '../editor/firebase'

export const GraphEditorPage = ({
  canvasID,
  ownerID,
  codes = [],
  firebaseConfig
}) => {
  let [ok, setOK] = useState(false)
  let [okSize, setOKSize] = useState(false)
  useEffect(() => {
    ENState.canvasID = canvasID
    ENState.canvasOwnerID = ownerID
    ENState.firebaseConfig = firebaseConfig

    waitGet('firebaseConfig').then((firebaseConfig) => {
      setupFirebase({ firebaseConfig })
      setOK(true)
    })
  }, [canvasID, ownerID])

  let ref = useRef()
  return (
    <div
      ref={ref}
      style={{ width: `100%`, height: `100%`, position: 'relative' }}
    >
      <Canvas
        dpr={(typeof window !== 'undefined' && window.devicePixelRatio) || 1.0}
      >
        {ok && okSize && <GraphEditorContent></GraphEditorContent>}
        <Resizer setOKSize={setOKSize} resize={ref}></Resizer>
      </Canvas>

      {ok && okSize && <ENHtml codes={codes}></ENHtml>}
    </div>
  )
}

function Resizer({ resize, setOKSize }) {
  let three = useThree()

  useEffect(() => {
    if (resize.current) {
      resize.current.style.width = `${window.innerWidth}px`
      resize.current.style.height = `${window.innerWidth}px`
    }
    setTimeout(() => {
      setOKSize(true)
    })
  }, [three, resize, resize.current])

  return null
}
