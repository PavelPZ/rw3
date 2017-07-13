import React, { Component } from 'react'
import { withStyles, Theme, withProps, chain } from '../../react-native-themeable/index';
import { Text, View } from '../../react-native-all';

//const { Text, View } = RNA;
const redTheme = withProps([
  {
    $type: Text,
    style: {
      color: 'black',
      fontSize: 16,
    },
    onPress: () => alert('redTheme'),
  }, {
    $type: View,
    style: {
      backgroundColor: 'red',
    }
  },
])

const blueTheme = withStyles([
  {
    $type: Text,
    color: 'white',
    fontSize: 26,
  }, {
    $type: View,
    backgroundColor: 'blue',
  },
])

const App = () => <View>

  <Text>
    Following elements use different themes defined by `withStyles` helper function:
        </Text>

  <Theme apply={redTheme}>
    <View>
      <Text>This component uses red theme with small black fonts</Text>
    </View>
  </Theme>

  <Theme apply={chain(blueTheme, redTheme)}>
    <View>
      <Text>This component uses blue theme and large white fonts</Text>
    </View>
  </Theme>

</View>;


export default App;