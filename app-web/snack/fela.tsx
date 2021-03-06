﻿import React from 'react';
import { renderCSSs } from 'web-fela';


const ext: DFela.IExtendItem = {
  condition: true,
  style: {

  }
};

const rule: DFela.TRule = (props: { color: string; }) => ({
  fontSize: '20px',
  color: 'blue',
  lineHeight: 1.5,
  display: 'flex',
  transitionProperty: 'color',
  transitionDuration: '2s',
  extend: {
    condition: true,

  }
} as CSSProperties)

const ruleBlack: DFela.TRule = () => ({
  color: 'yellow'
})

export default class Div extends React.Component<{}, { color?: string; }> {
  state = { color: 'red' };
  //state = { color: null };
  render(): JSX.Element {
      return <h1 className={renderCSSs(rule, ruleBlack, () => (this.state ? { color: this.state.color } : {}))} {...this.props} onClick={() => this.setState({ color: this.state.color == 'red' ? 'green' : 'red' })}>
      Animation
  </h1>;
  }
}
