import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../web-fela/index';
import { ViewStyle } from './lib';

//D:\rw\know-how\react-native-web\src\components\View\index.js
export const View = (props: DReactNative.IWebView) =>  {

    const {
      style,
      onTouchCancel, onTouchEnd, onTouchEndCapture, onTouchMove, onTouchStart, //avoid TS Error
      ...otherPropsTyped
    } = props;
    const otherProps = otherPropsTyped;

    const convertViewStyles = (native: ReactNative.ViewStyle) => native as any as CSSProperties; //vadi textShadowColor, fontWeight, textAlign, transform

    const ruleProps = {
      ...ViewStyle,
      ...convertViewStyles(style)
    };

    if (!otherProps.className) otherProps.className = '';
    otherProps.className += ' component-view ' + renderCSS(ruleProps);

    return <div {...otherProps} />;
}
