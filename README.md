# effectnode-cms

> Effectnode VFX CMS with firebase

[![NPM](https://img.shields.io/npm/v/effectnode-cms.svg)](https://www.npmjs.com/package/effectnode-cms) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save effectnode-cms
```

## Usage

```jsx
import React from 'react'
import { CMSOnePage } from 'effectnode-cms'

export function OnePageDemo() {
  return (
    <CMSOnePage firebaseConfig={firebaseConfig} codes={getCodes()}></CMSOnePage>
  )
}

export const firebaseConfig = {
  apiKey: '____CHANGE_ME____',
  authDomain: '____CHANGE_ME____',
  databaseURL: '____CHANGE_ME____',
  projectId: '____CHANGE_ME____',
  storageBucket: '____CHANGE_ME____',
  messagingSenderId: '____CHANGE_ME____',
  appId: '____CHANGE_ME____',
  measurementId: '____CHANGE_ME____'
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
```

## License

MIT © [wonglok](https://github.com/wonglok)
