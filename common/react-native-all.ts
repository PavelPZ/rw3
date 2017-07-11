import RN from 'react-native';
import React from 'react';

export interface IRNA {
  Text?: React.ComponentClass<RN.TextProperties> | React.ClassicComponentClass<RN.TextProperties>;
  View?: React.ComponentClass<RN.ViewProperties> | React.ClassicComponentClass<RN.ViewProperties>;
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



