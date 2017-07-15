//https://snack.expo.io/H1vNtncfZ
import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

class RecentChatsScreen extends React.Component {
  render() {
    return <View style={{ paddingTop:20 }}><Text>List of recent chats</Text></View>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <View style={{ paddingTop: 20 }}><Text>List of all contacts</Text></View>
  }
}

const App = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});

export default App;