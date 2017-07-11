import React from 'react';
import { RNA } from '../../common/react-native-all';

//https://snack.expo.io/BJMg9qzBZ
const App = () => {
  const { Text, View } = RNA;
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ borderStyle: 'solid', borderColor: 'red', borderWidth: 4, backgroundColor: 'gray', opacity: 0.5 }}>
      <Text>TTT</Text>
    </View>
    <Text style={{ textAlign: 'center', /*lineHeight:2*/ }}>
      before {'             '} press before press before press before press before press before press before press before press before press {'\r\n'}
      <Text onPress={() => alert('pressed')} style={{ color: 'red', fontStyle: 'italic', textDecorationLine: 'underline line-through' }}>RN Text</Text> {'\r\n'}
      after press
    </Text>
  </View>;
};

export default App;