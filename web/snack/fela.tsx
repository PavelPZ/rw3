import React from 'react';
import { RNA } from '../../common/react-native-all';

const rule: DFela.TRule = () => ({
  fontSize: '20px',
  color: 'blue',
  lineHeight: 1.5,
  display: 'flex',
  transitionProperty: 'color',
  transitionDuration: '2s',
})

const ruleBlack: DFela.TRule = () => ({
  color: 'yellow'
})

export default class Div extends React.Component<{}, { color?: string; }> {
  state = { color: 'red' };
  //state = { color: null };
  render(): JSX.Element {
    return <h1 className={RNA.renderRules(rule, ruleBlack, () => (this.state ? { color: this.state.color } : {}))} {...this.props} onClick={() => this.setState({ color: this.state.color == 'red' ? 'green' : 'red' })}>
      Animation
  </h1>;
  }
}
