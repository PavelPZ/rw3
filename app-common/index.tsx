import React from 'react'
import { render } from 'react-dom'
import { createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import { reducer as vocabReducer } from './vocabularies'

export const config: DConfig.IConfig = {
}

const reducers = (state: DState.IState = {}, action) => ({
  vocabularies: vocabReducer(state, action)
});

export let store: Store<DState.IState>;

export class App extends React.Component<{ stateLoader: Promise<DState.IState>; }> {
  state = { initialized: false }
  render(): JSX.Element {
    const initApp = (initialState: DState.IState = {}) => {
      store = createStore<DState.IState>(reducers, initialState);
      this.setState({ initialized: true });
    }
    if (!this.state.initialized) {
      this.props.stateLoader.then(st => initApp(st)).catch(() => initApp());
      return <h1>loading...</h1>;
    } else
      return <Provider store={store}>{this.props.children}</Provider>;
  }
}



