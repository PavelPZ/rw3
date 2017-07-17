import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

class App extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 300 }}>
        <Modal animationType="fade" transparent={true} visible={this.state.modalVisible} >
          <View style={{ marginTop: 20, backgroundColor: 'yellow', flex: 1 }}>
            <View style={{ position: 'absolute', elevation: 1, zIndex: 1, left: 0, top: 0, right: 0, bottom: 0 }}>
              <Text>Hello World!{'\r\n\r\n\r\n'}</Text>

              <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <TouchableHighlight onPress={() => this.setModalVisible(true)}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default App;