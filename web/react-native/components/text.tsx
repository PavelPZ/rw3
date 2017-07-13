import React  from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../fela';
import { IWebText } from '../../../common/react-native-all';
import { themeable } from '../../../common/react-native-themeable/index';

//d:\rw\know-how\react-native-web\src\components\Text\index.js
export class TextNormal extends React.Component<IWebText> {

  render(): JSX.Element {
    const {
      dir,
      numberOfLines,
      onPress,
      selectable,
      style,
      ...otherPropsTyped
    } = this.props;
    const otherProps: IWebText = otherPropsTyped as any;

    const { isInAParentText } = this.context;

    if (onPress) {
      //otherProps.accessible = true; //is needed?
      otherProps.onClick = onPress;
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    const st: any = style; if (st) { if (!st.textDecorationLine) { st.textDecoration = st.textDecorationLine; delete st.textDecorationLine; } };

    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';

    const ruleProps: any = {
      borderWidth: 0,
      color: 'inherit',
      display: 'inline',
      font: 'inherit',
      margin: 0,
      padding: 0,
      textDecorationLine: 'none',
      wordWrap: 'break-word',
      ...(!this.context.isInAParentText ? { whiteSpace: 'pre-wrap' } : null),
      ...(selectable === false ? { userSelect: 'none' } : null),
      ...(numberOfLines === 1 ? {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      } : null),
      ...(onPress ? { cursor: 'pointer' } : null),
      ... st
    };


    otherProps.className += ' ' + renderCSS(ruleProps);

    return isInAParentText ? <span {...otherProps as any} /> : <div {...otherProps as any} />;
  }

  _createEnterHandler(fn) {
    return e => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  }

  //context
  static childContextTypes = { isInAParentText: PropTypes.any };
  static contextTypes = { isInAParentText: PropTypes.any };
  getChildContext() { return { isInAParentText: true }; }
}

export const Text = themeable(TextNormal);