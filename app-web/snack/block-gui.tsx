import React from 'react';
import { renderCSS } from 'web-fela';


import { Provider, showBlockGui, hideBlockGui } from 'web-overlays';

class App extends React.Component<{}, { show: boolean; }> {
  state = { show: false };
  render(): JSX.Element {
    return <Provider>
      <a href='#' onClick={ev => showBlockGuiExample()}>SHOW BLOCK GUI</a>
    </Provider>
  }
}

export const showBlockGuiExample = async () => {
  showBlockGui();
  showBlockGui();
  setTimeout(() => {
    hideBlockGui();
    setTimeout(() => hideBlockGui(), 1000);
  }, 1000);
}

export default App;
