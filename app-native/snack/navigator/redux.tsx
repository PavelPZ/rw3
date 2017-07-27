import React from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator, NavigationActions, addNavigationHelpers, DrawerNavigator } from 'react-navigation';

// ************ AuthButton
const AuthButtonLow = ({ logout, loginScreen, isLoggedIn }) => (
  <Button
    title={isLoggedIn ? 'Log Out' : 'Open Login Screen'}
    onPress={isLoggedIn ? logout : loginScreen}
  />
);

const AuthButton = connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn,
  }),
  dispatch => ({
    logout: () => dispatch({ type: 'Logout' }),
    loginScreen: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
  }))(AuthButtonLow);

// ************ LoginScreen
const logStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const LoginScreen = ({ navigation }) => (
  <View style={logStyles.container}>
    <Text style={logStyles.welcome}>
      Screen A
    </Text>
    <Text>
      This is great
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Login' })}
      title="Log in"
    />
  </View>
);

LoginScreen['navigationOptions'] = {
  title: 'Log In',
};

// ************ LoginStatusMessage
const logStStyles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const LoginStatusMessageLow = ({ isLoggedIn, dispatch }) => {
  if (!isLoggedIn) {
    return <Text>Please log in</Text>;
  }
  return (
    <View>
      <Text style={logStStyles.welcome}>
        {'You are "logged in" right now'}
      </Text>
      <Button
        onPress={() =>
          dispatch(NavigationActions.navigate({ routeName: 'Profile' }))}
        title="Profile"
      />
    </View>
  );
};

const LoginStatusMessage = connect(state => ({ isLoggedIn: state.auth.isLoggedIn, }))(LoginStatusMessageLow);

// ************ LoginStatusMessage
const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (
  <View style={mainStyles.container}>
    <LoginStatusMessage />
    <AuthButton />
  </View>
);

MainScreen['navigationOptions'] = {
  title: 'Home Screen',
};

// ************ ProfileScreen
const profStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const ProfileScreen = () => (
  <View style={profStyles.container}>
    <Text style={profStyles.welcome}>
      Profile Screen
    </Text>
  </View>
);

ProfileScreen['navigationOptions'] = {
  title: 'Profile',
};

// **********************************************
//              AppNavigator
// **********************************************

const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Profile: { screen: ProfileScreen },
});

const AppWithNavigationStateLow = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);


const AppWithNavigationState = connect(state => ({ nav: state.nav, }))(AppWithNavigationStateLow);

// ************ Reducer

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function navReducer(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
});

// ***** APP
class App extends React.Component {
  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
