import React from 'react'

import { HashRouter, Switch, Route } from 'react-router-dom'

import { GraphEditorPageDemo } from './GraphEditorPageDemo/GraphEditorPageDemo'
import { OnePageDemo } from './OnePageDemo/OnePageDemo'
import { ProjectListingPageDemo } from './ProjectListingPageDemo/ProjectListingPageDemo'
const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/project'>
          <GraphEditorPageDemo />
        </Route>
        <Route path='/listing'>
          <ProjectListingPageDemo />
        </Route>
        <Route path='/'>
          <OnePageDemo />
        </Route>
      </Switch>
    </HashRouter>
  )
}

// react-router-dom

export default App
