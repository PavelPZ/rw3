import React from 'react';
import PropTypes from 'prop-types';
import { renderCSSs } from '../../web-fela/index';
import { ClickHandler } from './lib';
import { palette, buttonTheme } from 'common-lib';

//D:\rw\know-how\react-native-web\src\components\Button\index.js
//https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js
export const Button = (props: DReactNative.IWebButton) => {

  const {
    title,
    onPress,
    color,
    disabled,
    children,
    tabIndex,
    flat,
    ...otherPropsTyped
    } = props;
  const otherProps: React.HTMLAttributes<HTMLDivElement> = otherPropsTyped as any;

  ClickHandler(onPress, otherProps);

  if (!otherProps.className) otherProps.className = '';
  otherProps.className += ' component-button ' + (!disabled ? 'ripple ' : '') + renderCSSs(buttonTheme(color, flat, disabled));

  return <div {...otherProps} tabIndex={disabled ? -1 : (tabIndex ? tabIndex : 1)} onClick={() => { if (disabled) return; onPress(); }}>
    {title ? title.toUpperCase() : props.children}
  </div>;
}
