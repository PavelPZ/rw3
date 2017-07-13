import RN from 'react-native';
export * from '../web/react-native/index';

export interface IWebProps {
  onClick?: React.MouseEventHandler<{}>;
  onKeyDown?: React.KeyboardEventHandler<{}>;
  className?: string;
}

export type IWebText = RN.TextProperties & IWebProps;
export type IWebView = RN.ViewProperties & IWebProps;

export interface IRNA {
  Text?: React.ComponentClass<IWebText> | React.ClassicComponentClass<IWebText>;
  View?: React.ComponentClass<IWebView> | React.ClassicComponentClass<IWebView>;
  Animated?: {
    Value: ValueClass;
    ValueXY: ValueXYClass;
  };
  I18nManager?: RN.I18nManager;
  Platform?: RN.PlatformStatic;
}

export const RNA: IRNA = {};

interface ValueClass {
  new(value: number);
}
interface ValueXYClass {
  new(valueIn?: { x: number | ReactNative.Animated.AnimatedValue; y: number | ReactNative.Animated.AnimatedValue });
}
