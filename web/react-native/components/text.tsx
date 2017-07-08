import React from 'react';
import ReactDOM from 'react-dom';
////import createDOMElement from '../../modules/createDOMElement';
//import StyleSheet from '../../apis/StyleSheet';


//class Text {

//  static childContextTypes = { isInAParentText: true };
//  static contextTypes = { isInAParentText: true };
//  getChildContext() { return { isInAParentText: true }; }

//  render() {
//    const {
//      dir,
//      numberOfLines,
//      onPress,
//      selectable,
//      style,
//      /* eslint-disable */
//      adjustsFontSizeToFit,
//      allowFontScaling,
//      ellipsizeMode,
//      lineBreakMode,
//      minimumFontScale,
//      onLayout,
//      suppressHighlighting,
//      /* eslint-enable */
//      ...otherProps
//    } = this.props;

//    const { isInAParentText } = this.context;

//    if (onPress) {
//      otherProps.accessible = true;
//      otherProps.onClick = onPress;
//      otherProps.onKeyDown = this._createEnterHandler(onPress);
//    }

//    // allow browsers to automatically infer the language writing direction
//    otherProps.dir = dir !== undefined ? dir : 'auto';
//    otherProps.style = [
//      styles.initial,
//      this.context.isInAParentText !== true && styles.preserveWhitespace,
//      style,
//      selectable === false && styles.notSelectable,
//      numberOfLines === 1 && styles.singleLineStyle,
//      onPress && styles.pressable
//    ];

//    const component = isInAParentText ? 'span' : 'div';

//    return createDOMElement(component, otherProps);
//  }

//  _createEnterHandler(fn) {
//    return e => {
//      if (e.keyCode === 13) {
//        fn && fn(e);
//      }
//    };
//  }
//}

//const styles = StyleSheet.create({
//  initial: {
//    borderWidth: 0,
//    color: 'inherit',
//    display: 'inline',
//    font: 'inherit',
//    margin: 0,
//    padding: 0,
//    textDecorationLine: 'none',
//    wordWrap: 'break-word'
//  },
//  preserveWhitespace: {
//    whiteSpace: 'pre-wrap'
//  },
//  notSelectable: {
//    userSelect: 'none'
//  },
//  pressable: {
//    cursor: 'pointer'
//  },
//  singleLineStyle: {
//    maxWidth: '100%',
//    overflow: 'hidden',
//    textOverflow: 'ellipsis',
//    whiteSpace: 'nowrap'
//  }
//});

//export default Text);
