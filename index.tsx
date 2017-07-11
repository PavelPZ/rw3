import React from 'react';
import ReactDOM from 'react-dom';
import { RNA } from './common/react-native-all';
import { Text as TextWeb } from './web/react-native/components/text';
import { View as ViewWeb } from './web/react-native/components/view';
import I18nManager from './web/react-native/apis/I18nManager';
import Platform from './web/react-native/apis/platform';

//import Root from './web/snack/fela';
import Root from './common/snack/react-native';

RNA.Text = TextWeb;
RNA.View = ViewWeb;
RNA.I18nManager = I18nManager;
//RNA.Animated.Value = RN.Animated.Value;
//RNA.Animated.ValueXY = RN.Animated.ValueXY;
RNA.Platform = Platform;


export function init() {
  ReactDOM.render(<Root />, document.getElementById('content'));
}


