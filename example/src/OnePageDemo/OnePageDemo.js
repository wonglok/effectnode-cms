import React from 'react'
import { CMSOnePage } from 'effectnode-cms'

export function OnePageDemo() {
  return (
    <CMSOnePage firebaseConfig={firebaseConfig} code={getCodes()}></CMSOnePage>
  )
}

export const firebaseConfig = {
  apiKey: 'AIzaSyAPuwK2yMl025KLVTnGDdN34XxHBYQHoVk',
  authDomain: 'effect-node-by-you.firebaseapp.com',
  databaseURL: 'https://en-you.firebaseio.com/',
  projectId: 'effect-node-by-you',
  storageBucket: 'effect-node-by-you.appspot.com',
  messagingSenderId: '587774316246',
  appId: '1:587774316246:web:2a52c46bd184fc3a1d4377',
  measurementId: 'G-SYFGKL6VNR'
}

export const getCodes = () => {
  let path = require('path')
  let r = require.context('../vfx-codes', true, /\.js$/, 'lazy')

  function importAll(r) {
    let arr = []
    r.keys().forEach((key) => {
      let filename = path.basename(key)

      arr.push({
        title: filename,
        loader: () => r(key)
      })
    })

    return arr
  }
  let codes = importAll(r)

  return codes
}
