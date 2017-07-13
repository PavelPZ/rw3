import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../fela';
import { IWebText } from '../../../common/react-native-all';
import { themeable } from '../../../common/react-native-themeable/index';

//d:\rw\know-how\react-native-web\src\components\Text\index.js
const TextNormal = (props: IWebText) => {
  const _createEnterHandler = (fn) => {
    return e => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  };
  const {
      dir,
    numberOfLines,
    onPress,
    selectable,
    style,
    ...otherPropsTyped
    } = props;
  const otherProps: IWebText = otherPropsTyped as any;

  if (onPress) {
    //otherProps.accessible = true; //is needed?
    otherProps.onClick = onPress;
    otherProps.onKeyDown = _createEnterHandler(onPress);
  }

  const st: any = style; if (st) { if (!st.textDecorationLine) { st.textDecoration = st.textDecorationLine; delete st.textDecorationLine; } };

  // allow browsers to automatically infer the language writing direction
  otherProps.dir = dir !== undefined ? dir : 'auto';

  const ruleProps: any = {
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

  //return isInAParentText ? <span {...otherProps as any} /> : <div {...otherProps as any} />;
  return <div {...otherProps as any} />;
};

export const Text = themeable(TextNormal);