import RN from 'react-native';
import { themeable } from './react-native-themeable/index';

//************* WEB
import { Text as TextNormal, View as ViewNormal, I18nManager, Platform} from '../web/react-native/index';

//************* NATIVE
//import { Text as TextNormal, View as ViewNormal, I18nManager, Platform } from 'react-native';

export const Text = themeable(TextNormal);
export const View = themeable(ViewNormal);
export { I18nManager, Platform };

export const RNA: DReactNative.IRNA = {};

