import React from 'react';
import { Text, View, Button, TouchableHighlight, TouchableOpacity } from '../../../platform-exports';


//https://snack.expo.io/BJMg9qzBZ
class App extends React.Component {
  render(): JSX.Element {
    //className='ripple' 
    return <View style={{ justifyContent: 'center' }}>
      <View style={{ alignSelf: 'center', borderStyle: 'solid', borderColor: 'red', borderWidth: 4, backgroundColor: 'green', /*opacity: 0.5,*/ padding: 20 }}>
        <Text>TTT</Text>
      </View>
      <Text style={{ textAlign: 'center'/*, xlineHeight:40*/ }}>
        before {'             '} press before press before press before press before press before press before press before press before press {' '}
        <Text onPress={() => alert('pressed')} style={{ color: 'red', fontStyle: 'italic', textDecorationLine: 'underline line-through', fontWeight: 'bold' }} >RN {'\r\n'} Text</Text>
        {' '}after press
      </Text>
      <View style={{ alignSelf: 'center' }}>
        <Button title='My First Button' onPress={() => { /*alert('press')*/ }} />
      </View>
      <TouchableHighlight onPress={() => { }} activeOpacity={0.65} underlayColor='red'>
        <View style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white' }}>Hallo</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity onPress={() => { }} activeOpacity={0.5}>
        <View style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
          <Text style={{ color: 'white' }}>Hallo</Text>
        </View>
      </TouchableOpacity>
    </View>;
  }
}

export default App;
