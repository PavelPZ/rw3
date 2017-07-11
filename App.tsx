import React from 'react';
import RN from 'react-native';
import { RNA } from './common/react-native-all';
import { render } from 'fela-native';

RNA.Text = RN.Text;
RNA.View = RN.View;
RNA.Animated.Value = RN.Animated.Value;
RNA.Animated.ValueXY = RN.Animated.ValueXY;
RNA.Platform = RN.Platform;

render(RNA.renderer);

import App from './common/snack/react-native';

export default App;

