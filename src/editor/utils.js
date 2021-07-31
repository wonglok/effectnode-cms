import { useEffect, useState } from 'react'

export const getID = function () {
  return (
    '_' +
    Math.random().toString(36).substr(2, 9) +
    Math.random().toString(36).substr(2, 9)
  )
}

export const makeShallowStore = (myObject = {}) => {
  let ___NameSpaceID = getID()
  let Utils = {
    exportJSON: () => {
      return JSON.parse(JSON.stringify(myObject))
    },
    getNameSpcaeID: () => {
      return ___NameSpaceID
    },

    onChange: (key, func) => {
      let evName = `${___NameSpaceID}`
      let hh = () => {
        func(myObject[key])
      }

      window.addEventListener(`${evName}-${key}`, hh)
      return () => {
        window.removeEventListener(`${evName}-${key}`, hh)
      }
    },

    useReactiveKey: (key, func) => {
      useEffect(() => {
        let evName = `${___NameSpaceID}`
        let hh = () => {
          func(myObject[key])
        }

        window.addEventListener(`${evName}-${key}`, hh)
        return () => {
          window.removeEventListener(`${evName}-${key}`, hh)
        }
      }, [])
    },

    makeKeyReactive: (key) => {
      let [vv, setSt] = useState(0)
      useEffect(() => {
        let evName = `${___NameSpaceID}`

        let hh = () => {
          setSt((s) => {
            return s + 1
          })
        }

        window.addEventListener(`${evName}-${key}`, hh)
        return () => {
          window.removeEventListener(`${evName}-${key}`, hh)
        }
      }, [vv])
    },

    //
    onChangeAny: (func) => {
      let evName = `${___NameSpaceID}`
      let hh = () => {
        func(myObject[key])
      }

      window.addEventListener(`${evName}`, hh)
      return () => {
        window.removeEventListener(`${evName}`, hh)
      }
    },

    notifyKeyChange: (key) => {
      window.dispatchEvent(
        new CustomEvent(`${___NameSpaceID}-${key}`, { detail: {} })
      )
    }
  }

  let proxy = new Proxy(myObject, {
    get: (o, k) => {
      //
      if (Utils[k]) {
        return Utils[k]
      }

      return o[k]
    },
    set: (o, key, val) => {
      o[key] = val

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent(`${___NameSpaceID}-${key}`, { detail: {} })
        )
      }

      return true
    }
  })

  return proxy
}
