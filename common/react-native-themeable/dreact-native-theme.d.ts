declare namespace DReactNativeTheme {

  type Component = React.ComponentClass | React.SFC;

  interface ITheme {
    apply: IWithPropsDef;
  }

  type IStyleDefs = IStyleDef[];
  type IPropsDefs = IPropsDef[];

  interface IStyleDef extends DFela.TCSS {
    $type: Component;
  }

  interface IPropsDef {
    $type: Component;
    style?: DFela.TCSS;
    [name: string]: any;
  }

  interface IWithPropsDef {
    style?: DFela.TCSS[] | DFela.TCSS;
  }

  type IWithProps = (type: React.ComponentClass, props: IPropsDef) => IWithPropsDef;

  type IWithStylesProc = (def: IStyleDefs) => (type: React.ComponentClass, styles: IPropsDef) => IWithPropsDef;
  type IWithPropsProc = (def: IPropsDefs) => (type: React.ComponentClass, styles: IPropsDef) => IWithPropsDef;
}