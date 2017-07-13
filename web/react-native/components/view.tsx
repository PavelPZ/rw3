import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../../fela';
import { IWebView } from '../../../common/react-native-all';
import { themeable } from '../../../common/react-native-themeable/index';

//D:\rw\know-how\react-native-web\src\components\View\index.js
export class ViewNormal extends React.Component<IWebView> {

  render(): JSX.Element {
    const {
      style,
      ...otherPropsTyped
    } = this.props;
    const otherProps: IWebView = otherPropsTyped as any;

    const { isInAButtonView, isInAParentText } = this.context;

    const ruleProps: DFela.TCSS = {
      alignItems: 'stretch',
      borderWidth: 0,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      display: isInAButtonView ? 'inline-flex' : 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      position: 'relative',
      // fix flexbox bugs
      minHeight: 0,
      minWidth: 0,
      ...style as DFela.TCSS
    };

    otherProps.className += ' ' + renderCSS(ruleProps);

    const component = isInAButtonView ? 'span' : 'div';

    return isInAButtonView ? <span {...otherProps as any} /> : <div {...otherProps as any} />;
  }

  //context
  static childContextTypes = { isInAParentText: PropTypes.any };
  static contextTypes = { isInAButtonView: PropTypes.any, isInAParentText: PropTypes.any };
  getChildContext() {
    const isInAButtonView = this.context.isInAButtonView;
    return isInAButtonView ? { isInAButtonView } : {};
  }

}

export const View = themeable(ViewNormal);