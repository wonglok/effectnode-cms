/* eslint-disable dot-notation */
import { meshBounds, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
// import { Color } from "three";
import { MathUtils } from 'three'
import { ENState } from './ENState'

export function Laptop({ ...props }) {
  const group = useRef()

  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    group.current.rotation.z = MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 4) / 20,
      0.1
    )

    group.current.position.y = MathUtils.lerp(
      group.current.position.y,
      (-5 + Math.sin(t)) / 5,
      0.1
    )
  })

  return (
    <group
      raycast={meshBounds}
      onPointerEnter={() => {
        //
        ENState.hovering = 'object'
      }}
      onPointerLeave={() => {
        //
        ENState.hovering = 'floor'
      }}
      //
      onPointerDown={(e) => {
        e.stopPropagation()
        e.target.setPointerCapture(e.pointerId)
      }}
      onPointerUp={(e) => {
        ENState.overlay = 'main'
        ENState.hovering = 'overlay'

        e.stopPropagation()
        e.target.releasePointerCapture(e.pointerId)
      }}
      ref={group}
      {...props}
    >
      <pointLight position-x={0} position-z={-2} position-y={2}></pointLight>
      <group rotation-x={Math.PI * 0.0} position={[0, -0.04, 0.41]}>
        <mesh onClick={() => {}}>
          <sphereBufferGeometry args={[4, 32, 32]}></sphereBufferGeometry>
          <meshStandardMaterial
            metalness={1}
            roughness={0.3}
            color='#bababa'
          ></meshStandardMaterial>
        </mesh>
      </group>

      <group position={[0, 7, 1]} rotation-x={Math.PI * -0.25}>
        <Text
          color={'#000000'}
          fontSize={1.5}
          maxWidth={200}
          lineHeight={1}
          textAlign={'center'}
          anchorX='center'
          anchorY='middle'
          outlineWidth={0.12}
          outlineColor='#ffffff'
        >{`Click to start`}</Text>

        {/* <Text
          color={'#000000'}
          fontSize={1.3}
          maxWidth={200}
          lineHeight={1}
          textAlign={'center'}
          anchorX='center'
          anchorY='middle'
          outlineWidth={0.04}
          outlineColor='#ffffff'
        >{`Click to start`}</Text> */}
      </group>
    </group>
  )
}

export function ENCore() {
  //
  //

  return (
    <group>
      <Suspense fallback={null}>
        <group position-y={3}>
          <Laptop></Laptop>
        </group>
      </Suspense>
    </group>
  )
}
