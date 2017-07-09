import React from 'react';
import { Button, Text, View } from 'react-native';

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

const App = DrawerNavigator({ Landing: { screen: Landing } });

export default App;