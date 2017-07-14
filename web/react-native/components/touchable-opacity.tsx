import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../fela';
import { ViewStyle, ClickHandler } from './lib';

//D:\rw\know-how\react-native-web\src\components\Touchable\TouchableHighlight.js
export const TouchableOpacity = (props: DReactNative.IWebTouchableOpacity) => {
  const {
        activeOpacity = 0.2,
    onPress,
    ...otherPropsTyped
    } = props;
  const otherProps: DReactNative.IWebTouchableOpacity = otherPropsTyped as any;

  ClickHandler(onPress, otherProps);

  const ruleProps: DFela.TCSS = {
    ...ViewStyle,
    transition: 'opacity 0.25s',
    ':active': {
      opacity: (1 - activeOpacity).toString()
    },
  };

  if (!otherProps.className) otherProps.className = '';
  otherProps.className += ' component-touchable-opacity ' + renderCSS(ruleProps);

  return <div {...otherProps as any} />;
}
