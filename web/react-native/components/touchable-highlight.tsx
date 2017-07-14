﻿import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../fela';
import { ViewStyle, ClickHandler } from './lib';

//D:\rw\know-how\react-native-web\src\components\Touchable\TouchableHighlight.js
export const TouchableHighlight = (props: DReactNative.IWebTouchableHighlight) => {

    const {
        activeOpacity = 0.85,
        underlayColor = 'black',
        onPress,
        ...otherPropsTyped
    } = props;
    const otherProps: DReactNative.IWebTouchableHighlight = otherPropsTyped as any;

    ClickHandler(onPress, otherProps);

    const ruleProps: DFela.TCSS = {
        ...ViewStyle,
        position: 'relative',
        overflow: 'hidden',
        ':active': {
            '::after': {
                opacity: (1 - activeOpacity).toString()
            }
        },
        ':after': {
            content: '',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            opacity: 0,
            transition: 'opacity 0.25s',
            backgroundColor: underlayColor,
        },
    };

    if (!otherProps.className) otherProps.className = '';
    otherProps.className += ' component-touchable-highlight ' + renderCSS(ruleProps);

    return <div {...otherProps as any} />;
}