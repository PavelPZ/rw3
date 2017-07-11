import React, { HTMLAttributes } from 'react';
import { TextProperties } from 'react-native';
import PropTypes from 'prop-types';
import { renderRules } from '../../fela';

type ITextProps = TextProperties & HTMLAttributes<{}>;

//d:\rw\know-how\react-native-web\src\components\Text\index.js
export class Text extends React.Component<ITextProps> {

  render(): JSX.Element {
    const {
      dir,
      numberOfLines,
      onPress,
      selectable,
      style,
      ...otherPropsTyped
    } = this.props;
    const otherProps: ITextProps = otherPropsTyped as any;

    const { isInAParentText } = this.context;

    if (onPress) {
      //otherProps.accessible = true; //is needed?
      otherProps.onClick = onPress;
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';

    const ruleProps:any = {
      ...styles.initial,
      ...(!this.context.isInAParentText ? styles.preserveWhitespace : null),
      ...(selectable === false ? styles.notSelectable : null),
      ...(numberOfLines === 1 ? styles.singleLineStyle : null),
      ...(onPress ? styles.pressable : null)
    };

    otherProps.className = renderRules(() => ruleProps, () => {
      if (!style || !style.textDecorationLine) return style;
      const dl = style.textDecorationLine; delete style.textDecorationLine;
      return { ...style, textDecoration: dl } as any;
    });

    return isInAParentText ? <span {...otherProps} /> : <div {...otherProps} />;
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

const styles = {
  initial: {
    borderWidth: 0,
    color: 'inherit',
    display: 'inline',
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    wordWrap: 'break-word'
  },
  preserveWhitespace: {
    whiteSpace: 'pre-wrap'
  },
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
};

export default Text;
