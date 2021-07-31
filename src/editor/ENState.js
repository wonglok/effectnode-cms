import { Vector3 } from 'three'
import { makeShallowStore } from './utils'

export const ENState = makeShallowStore({
  listing: [],
  listingReload: 0,

  layouts: [],
  layoutsReload: 0,

  //
  canvasID: false,
  canvasOwnerID: false,

  // overlay
  overlay: '',

  // position
  cursorMode: 'ready',
  hovering: 'floor',
  draggingNodeID: false,
  draggingIOID: false,
  addNodeTitle: 'mytitle',

  cursorAt: new Vector3(),
  dragStartPos: new Vector3(),
  moved: 0,
  isDown: false,

  nodes: [],
  connections: [],

  currentEditSocketID: false,
  currentEditNodeID: false,

  firebaseConfig: false
})

export const waitGet = (key) => {
  return new Promise((resolve) => {
    let tt = setInterval(() => {
      let value = ENState[key]
      if (value) {
        clearInterval(tt)
        resolve(value)
      }
    })
  })
}
