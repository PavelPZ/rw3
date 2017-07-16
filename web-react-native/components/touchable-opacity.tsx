import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../web-fela/index';
import { ViewStyle, ClickHandler } from './lib';

//D:\rw\know-how\react-native-web\src\components\Touchable\TouchableHighlight.js
export const TouchableOpacity = (props: DReactNative.IWebTouchableOpacity) => {
  const {
    activeOpacity = 0.2,
    onPress,
    accessibilityLabel,
    style, //avoid TS Error
    ...otherPropsTyped
  } = props;
  const otherProps = otherPropsTyped;

  ClickHandler(onPress, otherProps);

  const ruleProps: CSSProperties = {
    ...ViewStyle,
    transitionDuration: '0.25s',
    transitionProperty: 'opacity',
    ':active': {
      opacity: 1 - activeOpacity,
    },
  };

  if (!otherProps.className) otherProps.className = '';
  otherProps.className += ' component-touchable-opacity ' + renderCSS(ruleProps);

  return <div {...otherProps} />;
}
