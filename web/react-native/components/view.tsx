import React, { HTMLAttributes } from 'react';
import { ViewProperties, AllStyles } from 'react-native';
import PropTypes from 'prop-types';
import { RNA } from '../../../common/react-native-all';

type IViewProps = ViewProperties & HTMLAttributes<{}>;

//D:\rw\know-how\react-native-web\src\components\View\index.js
export class View extends React.Component<IViewProps> {

  render(): JSX.Element {
    const {
      style,
      /* eslint-disable */
      //collapsable,
      //onAccessibilityTap,
      //onLayout,
      //onMagicTap,
      //removeClippedSubviews,
      /* eslint-enable */
      ...otherPropsTyped
    } = this.props;
    const otherProps: IViewProps = otherPropsTyped as any;

    const { isInAButtonView, isInAParentText } = this.context;

    const ruleProps = styles.initial;

    otherProps.className = RNA.renderRules(() => ruleProps, () => style);

    //otherProps.className = [styles.initial, isInAParentText && styles.inline, style];

    // avoid HTML validation errors
    const component = isInAButtonView ? 'span' : 'div';

    return isInAButtonView ? <span {...otherProps} /> : <div {...otherProps} />;
  }

  //context
  static childContextTypes = { isInAParentText: PropTypes.any };
  static contextTypes = { isInAButtonView: PropTypes.any, isInAParentText: PropTypes.any };
  getChildContext() {
    const isInAButtonView = this.context.isInAButtonView;
    return isInAButtonView ? { isInAButtonView } : {};
  }

}

const styles = {
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  } as AllStyles,
  inline: {
    display: 'inline-flex'
  }
};