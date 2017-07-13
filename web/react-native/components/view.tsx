import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../fela';

//D:\rw\know-how\react-native-web\src\components\View\index.js
export const View = (props: DReactNative.IWebView) =>  {

    const {
      style,
      ...otherPropsTyped
    } = props;
    const otherProps: DReactNative.IWebView = otherPropsTyped as any;

    const ruleProps: DFela.TCSS = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      borderWidth: 0,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      position: 'relative',
      // fix flexbox bugs
      minHeight: 0,
      minWidth: 0,
      ...style as DFela.TCSS
    };

    if (!otherProps.className) otherProps.className = '';
    otherProps.className += ' component-view ' + renderCSS(ruleProps);

    return <div {...otherProps as any} />;
}
