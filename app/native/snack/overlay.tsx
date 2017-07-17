import React from 'react';
import {
  Text,
  View,
} from 'react-native';

class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, elevation: 14, zIndex: 14, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
          <View style={{ position: 'absolute', elevation: 1, zIndex: 1, left: 0, top: 0, right: 0, bottom: 0, backgroundColor: 'blue' }}>
            <Text>THIRST</Text>
          </View>
          <View style={{ position: 'absolute', elevation: 2, zIndex: 2, left: 0, top: 0, right: 0, bottom: 0, backgroundColor: 'red' }}>
            <Text>FORTHS</Text>
          </View>
        </View>
        <View style={{ flex: 1, elevation: 15, zIndex: 15, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
          <View style={{ position: 'absolute', elevation: 1, zIndex: 1, left: 0, top: 0, right: 0, bottom: 0, backgroundColor: 'yellow' }}>
            <Text>FIRST</Text>
          </View>
          <View style={{ position: 'absolute', elevation: 2, zIndex: 2, left: 0, top: 0, right: 0, bottom: 0, backgroundColor: 'gray' }}>
            <Text>SECOND</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default App;