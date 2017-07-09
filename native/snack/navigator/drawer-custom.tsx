import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';

import { DrawerNavigator } from 'react-navigation';

const Landing = props => (
  <View
    style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginTop: 24
    }}>
    <Button
      onPress={() => props.navigation.navigate('DrawerOpen')}
      title="Open Drawer"
    />
    <Text>or swipe from the edge</Text>
  </View>
);

const Drawer = props => (
  <View style={{ flex: 1, padding: 30 }}><Text>CUSTOMX {'\r\n\r\n'}{JSON.stringify(props, 2)}</Text></View>
);

const App = DrawerNavigator({ Landing: { screen: Landing } }, {
  contentComponent: props => <Drawer {...props}/>
});

export default App;