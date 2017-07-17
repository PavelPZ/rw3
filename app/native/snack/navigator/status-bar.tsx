import React, { Component } from 'react';
import { StatusBar } from 'react-native';

class App extends Component {

  render() {
    return <StatusBar barStyle="light-content" hidden={true} />
  }
}

export default App;