import React from 'react';
import PropTypes from 'prop-types';
import { renderCSSs } from '../../web-fela/index';
import { ClickHandler } from './lib';

//D:\rw\know-how\react-native-web\src\components\Button\index.js
//https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js
export const Button = (props: DReactNative.IWebButton) =>  {

    const {
      title,
      onPress,
      color,
      disabled,
      children,
      ...otherPropsTyped
    } = props;
    const otherProps: DReactNative.IWebButton = otherPropsTyped as any;

    ClickHandler (onPress, otherProps);

    const ruleProps: DFela.TCSS = {
      backgroundColor: disabled ? '#dfdfdf' : '#2196F3',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      ...(!disabled ? { cursor: 'pointer' } : null),
    };

    const titleProps: DFela.TCSS = {
      color: disabled ? '#a1a1a1' : 'white',
      padding: 8,
      fontWeight: 500,
    };


    if (!otherProps.className) otherProps.className = '';
    otherProps.className += ' component-button xripple ' + renderCSSs(ruleProps);

    return <div {...otherProps as any} onClick={() => { if (disabled) return; onPress(); }}>
      <div style={titleProps}>{title}</div>
    </div>;
}
