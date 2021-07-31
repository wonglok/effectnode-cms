import { CubeCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React from 'react'
import { Color } from 'three'

export function EnvRender() {
  let { get } = useThree()
  // const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
  //   encoding: sRGBEncoding, // since gamma is applied during rendering, the cubeCamera renderTarget texture encoding must be sRGBEncoding
  //   format: RGBAFormat
  // })

  // let cubeCamera = new CubeCamera(0.1, 1000, cubeRenderTarget)

  // useEffect(() => {
  //   //
  //   let { gl, scene } = get()
  //   cubeCamera.update(gl, scene)

  //   scene.add(cubeCamera)
  //   //

  //   scene.background = cubeRenderTarget.texture
  //   scene.environment = cubeRenderTarget.texture
  // }, [])

  return (
    <CubeCamera near={0.1} frames={1} resolution={128} far={1000}>
      {(texture) => {
        get().scene.background = new Color('#444')
        get().scene.environment = texture
      }}
    </CubeCamera>
  )
}
