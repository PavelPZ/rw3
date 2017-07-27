import { createRenderer, combineRules } from 'fela';
import { render } from 'fela-dom';
import pluginExtend from "fela-plugin-extend";
//import pluginMonolithic from "fela-monolithic";
import pluginPrefixer from "fela-plugin-prefixer";
import pluginFallbackValue from "fela-plugin-fallback-value";
import pluginLvha from "fela-plugin-lvha";
import pluginUnit from "fela-plugin-unit";

const renderer = createRenderer({
  plugins: [
    pluginUnit('px'),
    pluginExtend(),
    pluginPrefixer(),
    pluginFallbackValue(),
    pluginLvha(),
    //pluginMonolithic({ prettySelectors: true }),
  ]
});
render(renderer);

export const renderRules = (...rules: DFela.TRule[]) => renderer.renderRule(combineRules(...rules));
export const renderRule = (rule: DFela.TRule) => renderer.renderRule(rule);
export const renderCSSs = (...csss: CSSProperties[]) => renderer.renderRule(combineRules(...csss.map(css => () => css)));
export const renderCSS = (css: CSSProperties) => renderer.renderRule(() => css);
export const renderKeyFrame = (frame: KeyFrames) => renderer.renderKeyframe(() => frame);
export const renderStatic = (css: string | CSSProperties) => renderer.renderStatic(css);
