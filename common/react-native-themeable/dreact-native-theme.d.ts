declare namespace DReactNativeTheme {

  type Component = React.ComponentClass | React.SFC;

  interface ITheme {
    apply: IWithPropsDef | DReactNativeTheme.IWithProps[];
  }

  interface IStyleDef extends DFela.TCSS {
    $type: Component;
  }

  interface IPropsDef {
    $type: Component;
    $isProp?: boolean;
    style?: DFela.TCSS;
    [name: string]: any;
  }

  interface IWithPropsDef {
    style?: DFela.TCSS[] | DFela.TCSS;
  }

  type IWithProps = (type: React.ComponentClass, props: IPropsDef) => IWithPropsDef;

  //type IWithStylesProc = (def: IStyleDefs) => (type: React.ComponentClass, styles: IPropsDef) => IWithPropsDef;
  type IWithProc = (def: (IStyleDef | IPropsDef)[]) => (type: React.ComponentClass, styles: IPropsDef) => IWithPropsDef;
}