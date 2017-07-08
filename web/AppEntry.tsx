import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '../App';

export function init() {
  ReactDOM.render(<App />, document.getElementById('content'));
}



