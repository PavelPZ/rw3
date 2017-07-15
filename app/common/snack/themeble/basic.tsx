import React, { Component } from 'react'
import { Theme, withProps } from '../../../../common-themeable/index';
import { Text, View } from '../../../../platform-exports';

//const { Text, View } = RNA;
//https://colorlib.com/etc/metro-colors/
//https://github.com/olton/Metro-UI-CSS/blob/master/less/buttons.less
//https://danmalarkey.github.io/schema/colors.html
//http://www.creepyed.com/2012/11/windows-phone-8-theme-colors-hex-rgb/
//https://www.npmjs.com/package/color
const colors = {
  Primary: {
    default: '2086bf',
  },
  Success: '60a917',
  Info: '59cde2',
  Danger: 'ce352c',
  Warning: 'fa6800'
};

const redTheme = withProps([
  {
    $type: Text,
    $isProp: true,
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

const blueTheme = withProps([
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

  <Theme apply={[redTheme, blueTheme]}>
    <View>
      <Text>This component uses blue theme and large white fonts</Text>
    </View>
  </Theme>

</View>;

export default App;