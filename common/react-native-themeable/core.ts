import React from 'react'
import PropTypes from 'prop-types';

/*global __DEV__*/

const APPLY_KEY = 'RNTApply'
const ORIG_PROPS_KEY = 'RNTOriginalProps'

/**
 * Component which defines theme function (apply) for its children.
 */
export class Theme extends React.Component<DReactNative.ITheme> {
  getChildContext() {
    return { [APPLY_KEY]: this.props.apply }
  }
  render(): JSX.Element { return React.Children.only(this.props.children); }
  static childContextTypes = {
    [APPLY_KEY]: PropTypes.any
  }
}

/**
 * Decorator which injects theme context to the component.
 */
//export const theme = apply => Component => {
//  if (isFunctional(Component)) {
//    return makeFunctionalThemeDecorator(Component, apply)
//  }
//  return makeThemeDecorator(Component, apply)
//}

/**
 * Decorator to plug component into themeable system.
 */
export function themeable<T extends React.ComponentClass | React.SFC>(Component: T): T {
  const res = isFunctional(Component) ? makeFunctionalComponent(Component as React.SFC) : makeComponent(Component as React.ComponentClass);
  return res as T;
  //if (isFunctional(Component)) {
  //  res = makeFunctinalComponent(Component);
  //  //return makeFunctinalComponent(Component) as T;
  //}
  //return makeComponent((Component as any) as React.ComponentClass)
}

function isFunctional(Component) {
  return !Component.prototype || !Component.prototype.render
}

//function makeThemeDecorator(Component, apply) {
//  class ThemeDecorator extends Component {
//    getChildContext() {
//      const childContext = super.getChildContext && super.getChildContext()
//      return {
//        ...childContext,
//        [APPLY_KEY]: apply,
//      }
//    }
//  }
//  ThemeDecorator.childContextTypes = {
//    ...Component.childContextTypes,
//    [APPLY_KEY]: PropTypes.any,
//  }
//  return ThemeDecorator
//}

//function makeFunctionalThemeDecorator(Component, apply) {
//  class ThemeDecorator extends React.Component{
//    getChildContext() {
//      const childContext = super['getChildContext'] && super['getChildContext']()
//      return {
//        ...childContext,
//        [APPLY_KEY]: apply,
//      }
//    }
//    render() {
//      return React.createElement(Component, this.props)
//    }
//  }
//  ThemeDecorator['childContextTypes'] = {
//    ...Component.childContextTypes,
//    [APPLY_KEY]: PropTypes.any,
//  }
//  return ThemeDecorator
//}

//https://gist.github.com/tejacques/54997ef2d6f672314d53
//function makeComponent_(origComp: React.ComponentClass): React.ComponentClass {

//  return class RNTComponent extends origComp {

//    //render(): JSX.Element {
//    //  const props = applyTheme(this.props, this.context, origComp, RNTComponent);
//    //  return React.createElement(origComp, props);
//    //} 
//    constructor(originalProps, ctx) {
//      super(applyTheme(originalProps, ctx, origComp, RNTComponent), ctx)
//    }


//    get props() {
//      return applyTheme(this[ORIG_PROPS_KEY], this.context, origComp, RNTComponent)
//    }

//    set props(originalProps) {
//      this[ORIG_PROPS_KEY] = originalProps
//    }

//    componentWillReceiveProps(nextProps, ctx) {
//      if (super.componentWillReceiveProps) {
//        const props = applyTheme(nextProps, this.context, origComp, RNTComponent)
//        return super.componentWillReceiveProps(props, ctx)
//      }
//    }

//    shouldComponentUpdate(nextProps, nextState, ctx) {
//      if (super.shouldComponentUpdate) {
//        const props = applyTheme(nextProps, this.context, origComp, RNTComponent)
//        return super.shouldComponentUpdate(props, nextState, ctx)
//      }
//      return true
//    }

//    componentWillUpdate(nextProps, nextState, ctx) {
//      if (super.componentWillUpdate) {
//        const props = applyTheme(nextProps, this.context, origComp, RNTComponent)
//        return super.componentWillUpdate(props, nextState, ctx)
//      }
//    }

//    static displayName = 'RNT_' + (origComp.displayName || origComp.name || 'Component');
//    static contextTypes = { [APPLY_KEY]: PropTypes.any, };
//  }

//  //if (__DEV__) {
//  //  // suppress warning message when calling `super` with modified props
//  //  console.ignoredYellowBox = [
//  //    ...(console.ignoredYellowBox || []),
//  //    `Warning: ${RNTComponent.displayName}(...): When calling super() in`,
//  //  ]
//  //}
//}

function makeComponent(origComp: React.ComponentClass): React.SFC {
  function RNTComponent(props, ctx) {
    return React.createElement(origComp, applyTheme(props, ctx, origComp, RNTComponent));
  }

  RNTComponent['contextTypes'] = {
    [APPLY_KEY]: PropTypes.any,
  }

  return RNTComponent
}

function makeFunctionalComponent(origComp: React.SFC): React.SFC {

  function RNTComponent(props, ctx) {
    return origComp(applyTheme(props, ctx, origComp, RNTComponent), ctx)
  }

  RNTComponent['contextTypes'] = {
    [APPLY_KEY]: PropTypes.any,
  }

  return RNTComponent
}

function applyTheme(props, ctx, OriginalComponent, NewComponent) {
  if (ctx && ctx[APPLY_KEY]) {
    const apply = ctx[APPLY_KEY]
    if (Array.isArray(apply)) {
      return apply.reduce((prev, app) => ({ ...prev, ...app(NewComponent, props) }), {});
    } else {
      return { ...apply(NewComponent, props) };
    }
  }
  return { ...props }
}

/**
 * Chains apply functions passed as arguments.
 * It can be passed as many functions as needed.
 * @param { function } apply apply function
 * @returns { function } apply function
 */
const chain = (...applies: DReactNative.IThemeWithProps[]) => (type: React.ComponentClass, props: DReactNative.IThemePropsDef) => {
  return applies.reduce((p, a) => a(type, p), props)
}
