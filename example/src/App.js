import React from 'react'

import { HashRouter, Switch, Route } from 'react-router-dom'
import { OnePageDemo } from './OnePageDemo/OnePageDemo'

import { GraphEditorPageDemo } from './GraphEditorPageDemo/GraphEditorPageDemo'
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
