import React from 'react';
import ReactDOM from 'react-dom';
//import { RNA } from './common/react-native-all';
//import { themeable } from './common/react-native-themeable/index';
//import { Text } from './web/react-native/components/text';
//import { View } from './web/react-native/components/view';
//import I18nManager from './web/react-native/apis/I18nManager';
//import Platform from './web/react-native/apis/platform';

//import Root from './web/snack/fela';
//import Root from './app-common/snack/react-native';
//import Root from './common/snack/themeble/basic';
//import Root from './app-web/snack/modal';
//import Root from './app/web/snack/ripple';
//import Root from './app/web/snack/popup';
import Root from './app-web/snack/drawer';  
//import Root from './app-web/snack/block-gui';  
//import Root from 'app-web';

//RNA.Text = themeable(Text);
//RNA.View = themeable(View);
//RNA.I18nManager = I18nManager;
////RNA.Animated.Value = RN.Animated.Value;
////RNA.Animated.ValueXY = RN.Animated.ValueXY;
//RNA.Platform = Platform;


export function init() {
  ReactDOM.render(<Root />, document.getElementById('content'));
}


