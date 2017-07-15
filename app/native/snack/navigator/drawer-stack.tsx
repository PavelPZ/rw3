import React from 'react';
import { AppRegistry, Text, Button, View} from 'react-native';
import { StackNavigator, DrawerNavigator} from 'react-navigation';

// Simple screens
const Screen11 = (props) => (
  <View>
    <Button
      title="Go to Screen12"
      onPress={() => props.navigation.navigate('Screen12')}
    />
    <Button
      onPress={() => props.navigation.navigate('DrawerOpen')}
      title="Open drawer"
    />
  </View>

)
Screen11.navigationOptions = {
  title: 'Screen11',
}

const Screen12 = () => (
  <Text>Screen12</Text>
)
Screen12.navigationOptions = {
  title: 'Screen12'
}
const Screen2 = () => (
  <Text>Screen2</Text>
)
const Screen3 = () => (
  <Text>Screen3</Text>
)

// Define our stack navigation
const Screen1Stack = StackNavigator({
  Screen11: {
    screen: Screen11,
  },
  Screen12: {
    screen: Screen12,
  },
});

const Screen2Stack = StackNavigator({
  Screen2: {
    screen: Screen2,
  }
});

const Screen3Stack = StackNavigator({
  Screen3: {
    screen: Screen3,
  }
});

// Define our main drawer navigation
const App = DrawerNavigator({
  Screen1Stack: {
    screen: Screen1Stack,
  },
  Screen2Stack: {
    screen: Screen2Stack,
  },
  Screen3Stack: {
    screen: Screen3Stack,
  }
});

export default App;