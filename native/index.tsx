import React from 'react';
import RN from 'react-native';
import { RNA } from '../common/react-native-all';
import { render } from 'fela-dom';

RNA.Text = RN.Text;
RNA.View = RN.View;
RNA.Animated.Value = RN.Animated.Value;
RNA.Animated.ValueXY = RN.Animated.ValueXY;
RN.Platform = RN.Platform;

render(RNA.renderer);

const {View, Text} = RNA;

export const App = () => <View><Text>Hallo React Native</Text></View>;

