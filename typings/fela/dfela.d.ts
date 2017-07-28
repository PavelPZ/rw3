declare namespace DFela {

  type TRuleProps = {};
  type TRule = (props: TRuleProps) => CSSProperties;
  interface TKeyFrameRule { (props: TRuleProps): KeyFrames; }
  type TRendererCreator = (config?: IConfig) => IRenderer;
  type TPlugin = (style: CSSProperties) => CSSProperties; //http://fela.js.org/docs/advanced/Plugins.html
  type TEnhancer = (renderer: IRenderer) => IRenderer; //http://fela.js.org/docs/advanced/Enhancers.html

  //interface KeyFrames {
  //  [keys: string]: CSSProperties;
  //}

  interface ITheme {
    constants: { [keys: string]: string; };
    rules: { [keys: string]: CSSProperties; };
    ruleSets: { [keys: string]: { [keys: string]: CSSProperties; }; };
  }

  interface IRenderer<T extends {} = {}> {
    renderRule(rule: TRule, props?: TRuleProps): string;
    renderKeyframe(keyFrame: TKeyFrameRule, props?: TRuleProps): string;
    renderFont(family: string, files: Array<string>, props: TRuleProps): void;
    //Fela changes, 
    renderStatic(style: string | CSSProperties, selector?: string): void;
    //renderToString(): string;
    //subscribe(event: (msg: ISubscribeRuleOrStaticObjectMessage | ISubscribeKeyframesMessage | ISubscribeFontFaceMessage | ISubscribeStaticStringMessage | ISubscribeClearMessage) => void): { unsubscribe: () => void; }
    //subscribe(event: (msg: ISubscribeRuleOrStaticObjectMessage | ISubscribeKeyframesMessage | ISubscribeFontFaceMessage | ISubscribeStaticStringMessage | ISubscribeClearMessage) => void): { unsubscribe: () => void; }
    clear();
  }

  //const enum TSubscribeMessageType { rule = 1, staticObject = 1, keyframes = 2, fontFace = 3, staticString = 4, clear = 5 }
  //interface ISubscribeMessage { type: TSubscribeMessageType; }
  //interface ISubscribeRuleOrStaticObjectMessage extends ISubscribeMessage { static?: boolean; declaration: string; selector: string; media: string; }
  //interface ISubscribeKeyframesMessage extends ISubscribeMessage { name: string; keyframe: string; }
  //interface ISubscribeFontFaceMessage extends ISubscribeMessage { fontFamily: string; fontFace: string; }
  //interface ISubscribeStaticStringMessage extends ISubscribeMessage { css: string; }
  //interface ISubscribeClearMessage extends ISubscribeMessage { }

  //http://fela.js.org/docs/advanced/RendererConfiguration.html
  interface IConfig {
    plugins?: Array<TPlugin>;
    keyframePrefixes?: Array<string>;
    enhancers?: Array<TEnhancer>;
    mediaQueryOrder?: Array<string>;
    selectorPrefix?: string;
  }

  export type IExtendItem = DStyles.CSSProperties | { condition:boolean; style: CSSProperties }

  export interface IExtend {
    extend?: IExtendItem | IExtendItem[];
  }
}


type CSSProperties = DStyles.CSSProperties & DStyles.NestedCSSSelectors & DFela.IExtend;
type KeyFrames = DStyles.KeyFrames;