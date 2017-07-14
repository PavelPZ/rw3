import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../fela';
import { ViewStyle } from './lib';

//D:\rw\know-how\react-native-web\src\components\View\index.js
export const View = (props: DReactNative.IWebView) =>  {

    const {
      style,
      ...otherPropsTyped
    } = props;
    const otherProps: DReactNative.IWebView = otherPropsTyped as any;

    const ruleProps: DFela.TCSS = {
      ...ViewStyle,
      ...style as DFela.TCSS
    };

    if (!otherProps.className) otherProps.className = '';
    otherProps.className += ' component-view ' + renderCSS(ruleProps);

    return <div {...otherProps as any} />;
}
