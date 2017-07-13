import React from 'react';
import { Text, View } from '../react-native-all';


//https://snack.expo.io/BJMg9qzBZ
const App = () => {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ borderStyle: 'solid', borderColor: 'red', borderWidth: 4, backgroundColor: 'green', /*opacity: 0.5,*/ padding: 20 }} className='ripple' >
      <Text>TTT</Text>
    </View>
    <Text style={{ textAlign: 'center'/*, xlineHeight:40*/ }}>
      before {'             '} press before press before press before press before press before press before press before press before press {' '}
      <Text onPress={() => alert('pressed')} style={{ color: 'red', fontStyle: 'italic', textDecorationLine: 'underline line-through', fontWeight: 'bold' }} >RN {'\r\n'} Text</Text>
      {' '}after press
    </Text>
  </View>;
};

export default App;