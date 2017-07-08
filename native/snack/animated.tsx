import React from 'react'
import { Animated, View, Text, Button } from 'react-native'

const animation = new Animated.Value(1)
const hover = () => Animated.spring(animation, { toValue: 2 }).start()
const unhover = () => Animated.spring(animation, { toValue: 1 }).start()

const AnimatedComponent = ({ children }) => {

  return (
    <Animated.View style={{
      justifyContent: 'center', alignItems: 'center', width: 100, height: 100
      , backgroundColor: animation.interpolate({ inputRange: [1, 2], outputRange: ['#28d79f', '#c23369'] })
      , transform: [
        { scale: animation },
        {
          rotate: animation.interpolate({
            inputRange: [1, 2], outputRange: ['0deg', '180deg']
          })
        }
      ]
    }}>
      {children}
    </Animated.View>
  )
}

export default class App extends React.Component {
  render() {
    return (<View style={{ padding: 100 }}>
      <AnimatedComponent>
        <Text>Animated text</Text>
      </AnimatedComponent>
      <View style={{ paddingTop: 100 }}>
        <Button title='hover' onPress={() => hover()}></Button>
        <Button title='unhover' onPress={() => unhover()}></Button>
      </View>
    </View>);
  }
}