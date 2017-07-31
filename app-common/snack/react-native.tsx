import React from 'react';
import { Text, View, Button, TouchableHighlight, TouchableOpacity } from 'exports';
import { palette } from 'common-lib';


//https://snack.expo.io/BJMg9qzBZ
class App extends React.Component {
  render(): JSX.Element {
    return <View style={{ justifyContent: 'center' }}>
      <View style={{ alignSelf: 'center', borderStyle: 'solid', borderColor: 'red', borderWidth: 4, backgroundColor: 'green', /*opacity: 0.5,*/ padding: 20 }}>
        <Text>TTT</Text>
      </View>
      <Text style={{ color: palette.text, textAlign: 'center'/*, xlineHeight:40*/ }}>
        before {'             '} press before press before press before press before press before press before press before press before press {' '}
        <Text onPress={() => alert('pressed')} style={{ color: 'red', fontStyle: 'italic', textDecorationLine: 'underline line-through', fontWeight: 'bold' }} >RN {'\r\n'} Text</Text>
        {' '}after press <Text style={{ color: palette.textSecondary }}>Secondary text</Text>
      </Text>
      <View style={{ alignSelf: 'center', padding: 10, flexDirection: 'row' }}>
        <Button title='primary' onPress={() => { alert('press') }} />
        <Button title='primary Light' tabIndex={2} color={palette.primaryLight} onPress={() => { /*alert('press')*/ }} />
        <Button title='primary Dark' tabIndex={3} color={palette.primaryDark} onPress={() => { /*alert('press')*/ }} />
        <Button title='secondary' tabIndex={4} color={palette.secondary} onPress={() => { /*alert('press')*/ }} />
        <Button title='secondary Dark' tabIndex={5} color={palette.secondaryDark} onPress={() => { /*alert('press')*/ }} />
        <Button title='secondary Light' tabIndex={6} color={palette.secondaryLight} onPress={() => { /*alert('press')*/ }} />
        <Button title='Disabled' disabled onPress={() => { /*alert('press')*/ }} />
        <Button title='' tabIndex={7}  onPress={() => { }} ><span>Text <i>Button</i></span></Button> 
      </View>
      <View style={{ alignSelf: 'center', padding: 10, flexDirection: 'row' }}>
        <Button flat title='primary' tabIndex={11} onPress={() => { alert('press') }} />
        <Button flat title='primary Light' tabIndex={12} color={palette.primaryLight} onPress={() => { /*alert('press')*/ }} />
        <Button flat title='primary Dark' tabIndex={13} color={palette.primaryDark} onPress={() => { /*alert('press')*/ }} />
        <Button flat title='secondary' tabIndex={14} color={palette.secondary} onPress={() => { /*alert('press')*/ }} />
        <Button flat title='secondary Dark' tabIndex={15} color={palette.secondaryDark} onPress={() => { /*alert('press')*/ }} />
        <Button flat title='secondary Light' tabIndex={16} color={palette.secondaryLight} onPress={() => { /*alert('press')*/ }} />
        <Button flat title='Disabled' disabled onPress={() => { /*alert('press')*/ }} />
        <Button flat title='' tabIndex={17} onPress={() => { }} ><span>Text <i>Button</i></span></Button>
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
