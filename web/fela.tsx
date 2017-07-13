import { createRenderer, combineRules } from 'fela';
import { render } from 'fela-dom';
import pluginExtend from "fela-plugin-extend";
import pluginPrefixer from "fela-plugin-prefixer";
import pluginFallbackValue from "fela-plugin-fallback-value";
import pluginLvha from "fela-plugin-lvha";
import pluginUnit from "fela-plugin-unit";


const r = createRenderer({ plugins: [pluginUnit('px', { lineHeight: 'px' }), pluginExtend(), pluginPrefixer(), pluginFallbackValue(), pluginLvha() ] });

render(r);
export const renderRules = (...rules: DFela.TRule[]) => r.renderRule(combineRules(...rules));
export const renderRule = (rule: DFela.TRule) => r.renderRule(rule);
export const renderCSSs = (...csss: DFela.TCSS[]) => r.renderRule(combineRules(...csss.map(css => () => css)));
export const renderCSS = (css: DFela.TCSS) => r.renderRule(() => css);
export const renderStatic = (css: string | DFela.TCSS) => r.renderStatic(css);
