import RN from 'react-native';
import { themeable } from './react-native-themeable/index';

//************* WEB
import { Text as TextNormal, View as ViewNormal, I18nManager, Platform, Button as ButtonNormal, TouchableHighlight as TouchableHighlightNormal, TouchableOpacity as TouchableOpacityNormal } from '../web/react-native/index';

//************* NATIVE
//import { Text as TextNormal, View as ViewNormal, I18nManager, Platform, Button as ButtonNormal, TouchableHighlight as TouchableHighlightNormal  } from 'react-native';

export const Text = themeable(TextNormal);
export const View = themeable(ViewNormal);
export const Button = themeable(ButtonNormal);
export const TouchableHighlight = themeable(TouchableHighlightNormal);
export const TouchableOpacity = themeable(TouchableOpacityNormal);
export { I18nManager, Platform };

export const RNA: DReactNative.IRNA = {};

