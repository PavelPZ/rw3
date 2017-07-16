import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../web-fela/index';
import { ClickHandler } from './lib';

//d:\rw\know-how\react-native-web\src\components\Text\index.js
export const Text = (props: DReactNative.IWebText) => {
  const {
    numberOfLines,
    onPress,
    selectable,
    style,
    ...otherPropsTyped
    } = props;
  const otherProps = otherPropsTyped;

  const convertTextStyles = (native: ReactNative.TextStyle) => native as any as CSSProperties; //vadi textShadowColor, fontWeight, textAlign, transform

  ClickHandler(onPress, otherProps);

  const st = convertTextStyles(style); if (st) { if (!st.textDecorationLine) { st.textDecoration = st.textDecorationLine; delete st.textDecorationLine; } };

  // allow browsers to automatically infer the language writing direction
  if (otherProps != undefined) otherProps.dir = 'auto';

  const ruleProps: CSSProperties = {
    borderWidth: 0,
    color: 'inherit',
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    //...(!this.context.isInAParentText ? { whiteSpace: 'pre-wrap' } : null),
    ...(selectable === false ? { userSelect: 'none' } : null),
    ...(numberOfLines === 1 ? {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    } : null),
    ...(onPress ? { cursor: 'pointer' } : null),
    ...st
  };

  if (!otherProps.className) otherProps.className = '';
  otherProps.className += ' component-text ' + renderCSS(ruleProps);

  return <div {...otherProps}/>;
};

