import React from 'react';
import RN from 'react-native';
import { RNA } from './common/react-native-all';
import { themeable } from './common/react-native-themeable/index';

RNA.Text = themeable(RN.Text);
RNA.View = themeable(RN.View);
RNA.Animated.Value = RN.Animated.Value;
RNA.Animated.ValueXY = RN.Animated.ValueXY;
RNA.Platform = RN.Platform;

import App from './common/snack/react-native';

export default App;