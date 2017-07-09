//https://quip.com/HCxGAHjCqqLG
import React, { Component } from 'react';
import { Text, View, TextInput, Button, Picker } from 'react-native';
import { createStore } from 'redux';
import { StackNavigator } from 'react-navigation';

const initialState = { username: "harley" }
const upcaseReducer = (state, action) => {
  if (action.type == "UPCASE") {
    return {
      username: action.username.toUpperCase()
    }
  }

  return state
}

const store = createStore(upcaseReducer, initialState)

class HomeScreen extends Component<any,any> {
  constructor() {
    super()
    this.state = {
      nonRedux: {
        username: "harley"
      }
    }
  } 

  _onChangeText = (value) => {
    this.setState({
      nonRedux: {
        username: value
      }
    })

    store.dispatch({ type: "UPCASE", username: value })
  }
  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Name</Text>
          <TextInput
            value={this.state.nonRedux.username}
            onChangeText={this._onChangeText}
            style={{ flex: 1, borderWidth: 1, height: 40 }} />
          <Button title="Go Next" onPress={() => alert('onPress')} />
        </View>
        <Text>nonRedux: {JSON.stringify(this.state.nonRedux)}</Text>
        <Text>Store: {JSON.stringify(store.getState())}</Text>
      </View>
    );
  }
}

const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen }
})
export default class App extends Component {
  render() {
    return <AppNavigator />
  }
}