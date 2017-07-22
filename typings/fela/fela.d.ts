declare module "fela" {
  function createRenderer(config?: DFela.IConfig): DFela.IRenderer;
  function combineRules(...rules: Array<DFela.TRule>): DFela.TRule;
  function enhance(...enhancers: Array<DFela.TEnhancer>): (rendererCreator: DFela.TRendererCreator) => DFela.TRendererCreator;
}

declare module "fela-dom" {
  function render(renderer: DFela.IRenderer, node?: HTMLElement);
}

declare module "fela-plugin-extend" { const any: any; export default any; }
declare module "fela-plugin-prefixer" { const any: any; export default any; }
declare module "fela-plugin-fallback-value" { const any: any; export default any; }
declare module "fela-plugin-lvha" { const any: any; export default any; }
declare module "fela-plugin-unit" { const any: any; export default any; }
