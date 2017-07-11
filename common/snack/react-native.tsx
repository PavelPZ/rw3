import React from 'react';
import { RNA } from '../../common/react-native-all';

const App = () => {
  const { Text, View } = RNA;
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ textAlign: 'center' }}>
      before press {'\r\n'}
      <Text onPress={() => alert('pressed')} style={{ color: 'red', fontStyle: 'italic', textDecorationLine: 'underline line-through' }}>RN Text</Text> {'\r\n'}
      after press
    </Text>
  </View>;
};

export default App;