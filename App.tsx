import React from 'react';
import RN from 'react-native';
import { RNA } from './platform-exports';

RNA.Animated.Value = RN.Animated.Value;
RNA.Animated.ValueXY = RN.Animated.ValueXY;
RNA.Platform = RN.Platform;

import App from './app/common/snack/react-native';

export default App;