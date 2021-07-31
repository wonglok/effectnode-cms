import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export function Resizer({ resize, setOKSize }) {
  let three = useThree()

  useEffect(() => {
    if (resize.current) {
      resize.current.style.width = `${window.innerWidth}px`
      resize.current.style.height = `${window.innerHeight}px`
    }
    setTimeout(() => {
      setOKSize(true)
    })
  }, [three, three?.size?.width, three?.size?.height, resize.current])

  return null
}
