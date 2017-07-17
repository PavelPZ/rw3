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
    const otherProps = otherPropsTyped;

    ClickHandler (onPress, otherProps);

    const ruleProps: CSSProperties = {
      backgroundColor: disabled ? '#dfdfdf' : '#2196F3',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      ...(!disabled ? { cursor: 'pointer' } : null),
    };

    const titleProps: CSSProperties = {
      color: disabled ? '#a1a1a1' : 'white',
      padding: 8,
      fontWeight: 500,
    };


    if (!otherProps.className) otherProps.className = '';
    otherProps.className += ' component-button xripple ' + renderCSSs(ruleProps);

    return <div {...otherProps} onClick={() => { if (disabled) return; onPress(); }}>
      <div className={renderCSSs(titleProps)}>{title}</div>
    </div>;
}
