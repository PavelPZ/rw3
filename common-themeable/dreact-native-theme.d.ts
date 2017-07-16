declare namespace DReactNative {

  //************** REACT NATIVE PROPS
  export interface IWebProps {
    onClick?: React.MouseEventHandler<{}>;
    onKeyDown?: React.KeyboardEventHandler<{}>;
    className?: string;
    children?: React.ReactNode;
    dir?: string;
  }

  export type IWebText = ReactNative.TextProperties & IWebProps;
  export type IWebView = ReactNative.ViewProperties & IWebProps;
  export type IWebButton = ReactNative.ButtonProperties & IWebProps;
  export type IWebTouchableHighlight = ReactNative.TouchableHighlightProperties & IWebProps;
  export type IWebTouchableOpacity = ReactNative.TouchableOpacityProperties & IWebProps;

  export interface IRNA {
    Animated?: {
      Value: ValueClass;
      ValueXY: ValueXYClass;
    };
    I18nManager?: ReactNative.I18nManager;
    Platform?: ReactNative.PlatformStatic;
  }

    interface ValueClass {
    new(value: number);
  }
  interface ValueXYClass {
    new(valueIn?: { x: number | ReactNative.Animated.AnimatedValue; y: number | ReactNative.Animated.AnimatedValue });
  }

  //***************** THEME
  type ThemeComponent = React.ComponentClass | React.SFC;

  interface ITheme {
    apply: IThemeWithPropsDef | IThemeWithProps[];
  }

  //interface IThemeStyleDef extends DFela.TCSS {
  //  $isProp?: boolean;
  //  $type: ThemeComponent;
  //}

  interface IThemePropsDef extends CSSProperties{
    $type: ThemeComponent;
    $isProp?: boolean;
    style?: CSSProperties;
    [name: string]: any;
  }

  interface IThemeWithPropsDef {
    style?: CSSProperties[] | CSSProperties;
  }

  type IThemeWithProps = (type: React.ComponentClass, props: IThemePropsDef) => IThemeWithPropsDef;

  type IThemeWithProc = (def: (IThemePropsDef)[]) => (type: React.ComponentClass, styles: IThemePropsDef) => IThemeWithPropsDef;

}