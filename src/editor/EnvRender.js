import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Color } from 'three'
import { ShaderCubeChrome } from './ShaderCubeChrome'
export function EnvRender() {
  let { get } = useThree()

  let rainbow = useMemo(() => {
    let rainbow = new ShaderCubeChrome({
      renderer: get().gl,
      res: 64,
      color: new Color('#ffffff')
    })

    rainbow.compute({ time: 0.54, computeEnvMap: true })

    get().scene.environment = rainbow.out.envMap
    return rainbow
  }, [])

  let time = 0
  useFrame((st, dt) => {
    if (dt >= 1 / 30) {
      dt = 1 / 30
    }
    time += dt
    rainbow.compute({ time: time, computeEnvMap: true })
  })

  return null
}
