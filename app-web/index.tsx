import React from 'react'
import { Provider as OverlaysProvider } from 'web-overlays'
import { App as ReduxApp } from 'app-common'

const App = () => <ReduxApp stateLoader={new Promise(resolve => setTimeout(() => resolve({}), 1000))}>
  <OverlaysProvider>
    <h1>Hallo world</h1>
  </OverlaysProvider>
</ReduxApp>

export default App;
