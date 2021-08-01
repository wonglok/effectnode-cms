import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Color } from 'three'
import { ShaderCubeChrome } from './ShaderCubeChrome'
export function EnvRender() {
  let { get } = useThree()

  let rainbow = useMemo(() => {
    let rainbow = new ShaderCubeChrome({
      renderer: get().gl,
      res: 128,
      color: new Color('#ffffff')
    })

    rainbow.compute()

    get().scene.environment = rainbow.out.envMap
    return rainbow
  }, [])

  useFrame(() => {
    rainbow.compute()
  })

  return null
}
