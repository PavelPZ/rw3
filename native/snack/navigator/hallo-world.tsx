import React from 'react';
import {
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
});

export default App;

