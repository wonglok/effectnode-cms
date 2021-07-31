import React from 'react'

//
import { ENControls } from './ENControls'

//
import { ENCore } from './ENCore'
// import { ENHDRI as ENHdri } from './ENHDRI'
import { ENDisplayConnectorWire, ENDisplayCursor } from './ENDisplayCursor'
import { ENDisplayLinks, ENDisplayNodes } from './ENDisplayNodes'

// ENState
export function GraphEditorContent() {
  return (
    <group>
      {/*  */}
      <ENControls></ENControls>

      {/* <ENHdri></ENHdri> */}

      <ENCore></ENCore>

      <ENDisplayNodes></ENDisplayNodes>
      <ENDisplayLinks></ENDisplayLinks>

      <ENDisplayCursor></ENDisplayCursor>

      <ENDisplayConnectorWire></ENDisplayConnectorWire>

      <ambientLight intensity={0.87}></ambientLight>
      <directionalLight
        position={[10, 10, 0]}
        intensity={0.87}
      ></directionalLight>
      <ambientLight position={[10, 10, -10]} intensity={0.87}></ambientLight>
    </group>
  )
}
