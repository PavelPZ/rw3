import RN from 'react-native';
import React from 'react';
import { createRenderer, combineRules } from 'fela'

export interface IRNA {
  Text?: React.ComponentClass<RN.TextProperties> | React.ClassicComponentClass<RN.TextProperties>;
  View?: React.ComponentClass<RN.ViewProperties> | React.ClassicComponentClass<RN.ViewProperties>;
  Animated?: {
    Value: ValueClass;
    ValueXY: ValueXYClass;
  };
  I18nManager?: RN.I18nManager;
  Platform?: RN.PlatformStatic;
  renderer: DFela.IRenderer;
  renderRules: (...rules: Array<DFela.TRule>) => string;
  renderRule: (rule: DFela.TRule) => string;
}

const r = createRenderer();
export const RNA: IRNA = {
  renderer: r,
  renderRules: (...rules) => r.renderRule(combineRules(...rules)),
  renderRule: rule => r.renderRule(rule),
};

interface ValueClass {
  new(value: number);
}
interface ValueXYClass {
  new(valueIn?: { x: number | ReactNative.Animated.AnimatedValue; y: number | ReactNative.Animated.AnimatedValue });
}



