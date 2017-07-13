import { createRenderer, combineRules } from 'fela';
import { render } from 'fela-dom';
import pluginExtend from "fela-plugin-extend";
import pluginPrefixer from "fela-plugin-prefixer";
import pluginFallbackValue from "fela-plugin-fallback-value";
import pluginLvha from "fela-plugin-lvha";
import pluginUnit from "fela-plugin-unit";

import cssStatic from './css-static';

const renderer = createRenderer({ plugins: [pluginUnit('px'), pluginExtend(), pluginPrefixer(), pluginFallbackValue(), pluginLvha()] });

render(renderer);
renderer.renderStatic(cssStatic);

export const renderRules = (...rules: DFela.TRule[]) => renderer.renderRule(combineRules(...rules));
export const renderRule = (rule: DFela.TRule) => renderer.renderRule(rule);
export const renderCSSs = (...csss: DFela.TCSS[]) => renderer.renderRule(combineRules(...csss.map(css => () => css)));
export const renderCSS = (css: DFela.TCSS) => renderer.renderRule(() => css);
export const renderStatic = (css: string | DFela.TCSS) => renderer.renderStatic(css);
