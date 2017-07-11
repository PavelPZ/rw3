import { createRenderer, combineRules } from 'fela';
import { render } from 'fela-dom';

const r = createRenderer();
render(r);
export const renderRules = (...rules: DFela.TRule[]) => r.renderRule(combineRules(...rules));
export const renderRule = (rule: DFela.TRule) => r.renderRule(rule);
export const renderCSSs = (...csss: DFela.TCSS[]) => r.renderRule(combineRules(...csss.map(css => () => css)));
export const renderCss = (css: DFela.TCSS) => r.renderRule(() => css);
