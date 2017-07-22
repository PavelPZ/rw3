import React, { Component } from 'react';
import { View, WebView, Button, StyleSheet } from 'react-native';

class App extends Component {

  state = { visible: false };

  show(isShow: boolean) {
    this.setState({visible: !this.state.visible});
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        {!this.state.visible ? <View style={{ zIndex: 9, position: 'absolute' }}>
          <Button onPress={() => this.show(true)} title='Show' />
        </View> : null}
        {this.state.visible ? <WebView source={{ uri: 'http://dict.com' }} style={{ zIndex:10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} /> : null }
        {this.state.visible ? <View style={{ position: 'absolute', zIndex: 11, left:170, top:10 }} >
          <Button title='BACK' onPress={() => this.show(false)} />
        </View> : null}
      </View>
    );
  }
}

export default App;