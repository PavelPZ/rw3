import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../web-fela/index';
import { ClickHandler } from './lib';
import { palette } from 'common-lib';

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

  const st = style as any as CSSProperties; //vadi textShadowColor, fontWeight, textAlign, transform
  if (st && st.textDecorationLine) { st.textDecoration = st.textDecorationLine; delete st.textDecorationLine; } 

  ClickHandler(onPress, otherProps);

  // allow browsers to automatically infer the language writing direction
  if (otherProps != undefined) otherProps.dir = 'auto';

  const ruleProps: CSSProperties = {
    borderWidth: 0,
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    //...(!this.context.isInAParentText ? { whiteSpace: 'pre-wrap' } : null),
    ...(selectable === false ? { userSelect: 'none' } as CSSProperties : null),
    ...(numberOfLines === 1 ? {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    } as CSSProperties : null),
    ...(onPress ? { cursor: 'pointer' } : null),
    ...st
  };

  if (!otherProps.className) otherProps.className = '';
  otherProps.className += ' component-text ' + renderCSS(ruleProps);

  return <div {...otherProps as any}/>;
};

