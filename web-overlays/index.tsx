import React from 'react';
import { renderCSS } from '../web-fela/index';
import { isStateles } from '../common-lib/index';

export interface IModalPropsLow<T> { $finish?: (res) => void; $idx?: number; $uniqueId?: number; $component?: TReactComponent }
type TModalPropsLow = IModalPropsLow<{}>;
type TReactComponent = React.ComponentClass | React.SFC;

export const config = {
  opacity: 0.8,
  delay: 0.25,
  //delay: 1,
  overlayBackground: '#ddd',
}

//root aplikace. Obsahuje aplikaci a VEDLE div jako placeholder pro Overlay backdrops a modal wrappers
export class ProviderOverlays extends React.Component {
  constructor() { super(); ProviderOverlays.singletone = this; }
  static singletone: ProviderOverlays;
  render(): JSX.Element {
    return <div>
      {this.props.children}
      <OverlaysStack ref={st => this.overlayStack = st} />
    </div>;
  }
  overlayStack: OverlaysStack;
  public showModal<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, item: T): Promise<R> {
    return new Promise<R>(resolve => {
      const { stack } = this.overlayStack.state;
      item.$finish = resolve;
      item.$idx = stack.length;
      item.$uniqueId = ProviderOverlays.uniqueId++;
      item.$component = content;
      stack.push(item);
      this.overlayStack.forceUpdate();
    });
  }
  public closeModal(props: TModalPropsLow, res: {}, cancel: boolean) {
    const stack = this.overlayStack.state.stack;
    const $idx = props ? props.$idx : stack.length-1;
    stack[$idx].$finish(res);
  }
  static uniqueId = 0;
}
const providerOverlayId = 'provider-overlay';

export function showModal<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  return ProviderOverlays.singletone.showModal(content, props);
}
export function closeModal(props: TModalPropsLow, res: {}, cancel?: boolean) {
  return ProviderOverlays.singletone.closeModal(props, res, cancel);
}

const getStackItem = (idx: number) => { return ProviderOverlays.singletone.overlayStack.state.stack[idx]; }

interface IOverlaysStackState {
  stack: TModalPropsLow[];
}

//seznam ModalWrapper's
class OverlaysStack extends React.Component<{}, IOverlaysStackState> {
  state: IOverlaysStackState = { stack: [] };
  render(): JSX.Element {
    const { stack } = this.state; if (stack.length == 0) return null;
    return <div id={providerOverlayId} onKeyDown={ev => this.onGlobalKeyDown(ev)} tabIndex={0} className={renderCSS({ outline: 'none' })}>{stack.map((st, idx) => <ModalWrapper $idx={idx} key={idx} />)}</div>;
  }
  onGlobalKeyDown(ev: React.KeyboardEvent<{}>) {
    if (!ev || ev.keyCode != 27) return;
    ev.stopPropagation();
    const { stack } = this.state; if (stack.length == 0) return;
    closeModal(null, null, true);
  };
}

//jeden modal wrapper: dvojice Overlay divu a Flex divu
class ModalWrapper extends React.Component<{ $idx: number; }> {
  render(): JSX.Element {
    const $idx = this.props.$idx;
    const { $uniqueId, $component, ...otherProps } = getStackItem($idx);
    const { opacity, delay, overlayBackground } = config;
    const zIndex = 100 + $idx * 2;
    const modalSt: any = {
      ...modalStyle.overlay,
      zIndex: zIndex,
      transitionDuration: `${delay}s`,
      backgroundColor: overlayBackground,
    };
    const wraperSt: any = {
      ...modalStyle.wrapper,
      zIndex: zIndex + 1,
    };
    const contentSt: any = {
      ...modalStyle.content,
      transitionDuration: `${delay}s`,
    };
    return <div key={$idx} >
      <div id={`overlay-${$uniqueId}`} className={renderCSS(modalSt)}></div>
      <div className={renderCSS(wraperSt)} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, true); }} >
        <div className={renderCSS(contentSt)} onClick={ev => ev.stopPropagation()} id={`content-${$uniqueId}`} >
          {isStateles($component) ? ($component as React.SFC)(otherProps as any) : React.createElement($component as React.ComponentClass<TModalPropsLow>, otherProps)}
        </div>
      </div>
    </div>;
  }

  componentDidMount(): void { //vse je vykresleno a existuje
    setTimeout(() => {
      const item = getStackItem(this.props.$idx);
      const $uniqueId = item.$uniqueId;
      const { opacity, delay } = config;
      const ov = document.getElementById(`overlay-${$uniqueId}`); const content = document.getElementById(`content-${$uniqueId}`);
      ov.style.opacity = opacity.toString(); content.style.opacity = '1';
      const $finish = item.$finish; //old finish, pouze promise.resolve
      document.getElementById(providerOverlayId).focus();
      item.$finish = res => { //new finish - konec dialogu
        ov.style.opacity = '0'; content.style.opacity = '0'; //animace
        setTimeout(() => { //pockej na konec animace, pak odstran wrapper
          const state = ProviderOverlays.singletone.overlayStack.state;
          state.stack = state.stack.slice(0, state.stack.length - 1);
          ProviderOverlays.singletone.overlayStack.forceUpdate();
          const root = document.getElementById(providerOverlayId); if (root) root.focus(); //predej focus rootu, aby se uplatnil escape
          $finish(res);
        }, delay * 1000);
      };
    }, 1);
  }

}

const modalLow = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};
const transition = {
  opacity: 0,
  transitionProperty: `opacity`,
  transitionTimingFunction: 'ease-in-out'
}
const modalStyle = {
  overlay: {
    ...modalLow,
    ...transition
  },
  wrapper: {
    ...modalLow,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
  },
  content: {
    ...transition,
    backgroundColor: 'white',
  }
};
