import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export function Resizer({ setOKSize }) {
  let three = useThree()

  useEffect(() => {
    let sync = () => {
      let elements = document.querySelectorAll(`.auto-resize`) || []
      for (let el of elements) {
        if (el) {
          el.style.width = `${window.innerWidth}px`
          el.style.height = `${window.innerHeight}px`
        }
      }
    }

    sync()
    setTimeout(() => {
      setOKSize(true)
    })
    window.addEventListener('resize', sync, false)
    return () => {
      window.removeEventListener('resize', sync)
    }
  }, [three, three?.size?.width, three?.size?.height])

  return null
}
