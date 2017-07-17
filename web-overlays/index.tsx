import React from 'react';
import ReactDOM from 'react-dom';
import { renderCSS } from '../web-fela/index';
import { isStateles } from '../common-lib/index';

export const enum ModalType { modal, popup, drawer }
export interface IModalPropsLow<T> { $finish?: (res) => void; $idx?: number; $uniqueId?: number; $component?: DCommon.TReactComponent, $type?: ModalType, $popupOwner?: React.ReactInstance }
type TModalPropsLow = IModalPropsLow<{}>;

export const enum TPopupPlaces { Top, Left, Right, Bottom }
export const config = {
  opacity: 0.8,
  delay: 0.25,
  //delay: 1,
  overlayBackground: '#ddd',
  popupPlaces: [TPopupPlaces.Bottom, TPopupPlaces.Right, TPopupPlaces.Top, TPopupPlaces.Left],
  popupGap:5,
}

//root aplikace. Obsahuje aplikaci a VEDLE div jako placeholder pro Overlay backdrops a modal wrappers
export class ProviderOverlays extends React.Component {
  constructor() { super(); ProviderOverlays.singletone = this; }
  static singletone: ProviderOverlays;
  render(): JSX.Element {
    return <div>
      <div className={renderCSS({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' })}>
        {this.props.children}
      </div>
      <OverlaysStack ref={st => this.overlayStack = st} />
    </div>;
  }
  overlayStack: OverlaysStack;
  show<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, item: T): Promise<R> {
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

  closeModal(props: TModalPropsLow, res: {}, cancel: boolean) {
    const stack = this.overlayStack.state.stack;
    const $idx = props ? props.$idx : stack.length - 1;
    stack[$idx].$finish(res);
  }
  static uniqueId = 0;
}
const providerOverlayId = 'provider-overlay';

export function showPopup<T extends IModalPropsLow<R>, R>(owner: React.ReactInstance, content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$popupOwner = owner;
  props.$type = ModalType.popup;
  return ProviderOverlays.singletone.show(content, props);
}
export function showModal<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$type = ModalType.modal;
  return ProviderOverlays.singletone.show(content, props);
}
export function showDrawer<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$type = ModalType.drawer;
  return ProviderOverlays.singletone.show(content, props);
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
    return <div id={providerOverlayId} onKeyDown={ev => this.onGlobalKeyDown(ev)} tabIndex={0} className={renderCSS({ outline: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })}>
      {stack.map((st, idx) => {
        switch (st.$type) {
          case ModalType.modal: return <ModalWrapper $idx={idx} key={idx} />;
          case ModalType.popup: return <PopupWrapper $idx={idx} key={idx} />;
          case ModalType.drawer: return <DrawerWrapper $idx={idx} key={idx} />;
          default: throw 'notimplemented';
        }
      })}
    </div>;
  }
  onGlobalKeyDown(ev: React.KeyboardEvent<{}>) {
    if (!ev || ev.keyCode != 27) return;
    ev.stopPropagation();
    const { stack } = this.state; if (stack.length == 0) return;
    closeModal(null, null, true);
  };
}

abstract class Wrapper extends React.Component<{ $idx: number; }> {

  content: HTMLDivElement;

  abstract doRender(par: IDoRenderPar, content: JSX.Element): JSX.Element;
  setContentPosition(item: TModalPropsLow, content: HTMLElement) { }

  render(): JSX.Element {
    const $idx = this.props.$idx;
    const item = getStackItem($idx);
    const { $component, ...otherProps } = item;
    const { delay, overlayBackground } = config;
    const zIndex = 100 + $idx * 2;
    return this.doRender({ delay, item, zIndex, overlayBackground },
      isStateles($component) ? ($component as React.SFC)(otherProps as any) : React.createElement($component as React.ComponentClass<TModalPropsLow>, otherProps)
    );
  }

  componentDidMount(): void { //vse je vykresleno a existuje
    setTimeout(() => {
      const item = getStackItem(this.props.$idx);
      const { $uniqueId, $type } = item;
      const { opacity, delay } = config;
      const ov = document.getElementById(`overlay-${$uniqueId}`); const content = document.getElementById(`content-${$uniqueId}`);
      if ($type != ModalType.popup) ov.style.opacity = opacity.toString();
      content.style.opacity = '1';
      const $finish = item.$finish; //old finish, pouze promise.resolve
      this.setContentPosition(item, content);
      document.getElementById(providerOverlayId).focus();
      item.$finish = res => { //new finish - konec dialogu
        //animace
        if ($type != ModalType.popup) ov.style.opacity = '0';
        content.style.opacity = '0';
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

interface IWrapperStyles { overlaySt; wraperSt; contentSt; }
interface IDoRenderPar { delay: number; item: TModalPropsLow; zIndex: number; overlayBackground: string; };

class PopupWrapper extends Wrapper {

  doRender(par: IDoRenderPar, content: JSX.Element): JSX.Element {
    const { delay, zIndex, item, overlayBackground } = par;
    const { $uniqueId, } = item;

    const overlaySt = {
      ...modalLow,
      zIndex: zIndex,
      backgroundColor: 'transparent',
    };
    const contentSt = {
      ...modalStyle.content,
      transitionDuration: `${delay}s`,
      position: 'absolute',
      //overflow: 'auto',
      left: 0,
      top: 0,
    };

    return <div>
      <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt)} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, true); }}>
        <div className={renderCSS(contentSt)} style={{ maxWidth: window.innerWidth - 20, maxHeight: window.innerHeight - 20 }} onClick={ev => ev.stopPropagation()} id={`content-${$uniqueId}`} >
          {content}
        </div>
      </div>
    </div>;
  }

  setContentPosition(item: TModalPropsLow, content: HTMLElement) {
    let el = ReactDOM.findDOMNode(item.$popupOwner);
    const ownerRect = el.getBoundingClientRect();
    const popRect = content.getBoundingClientRect();
    const ownerCenter = { horz: ownerRect.left + ownerRect.width / 2, vert: ownerRect.top + ownerRect.height / 2 };
    const winHeight = window.innerHeight; const winWidth = window.innerWidth;
    const { popupGap } = config;
    const getTopLeft = (place: TPopupPlaces, shift: number) => {
      switch (place) {
        case TPopupPlaces.Bottom:
        case TPopupPlaces.Top: {
          const res1 = { left: ownerRect.left - (popRect.width - ownerRect.width) / 2, top: 0 };
          res1.top = place == TPopupPlaces.Top ? ownerRect.top - popRect.height - popupGap : ownerRect.bottom + popupGap;
          switch (shift) {
            case 0: return res1;
            case 1: if (popRect.width > ownerCenter.horz) { res1.left = 0; return res1; }
            case -1: res1.left = winWidth - popRect.width; return res1;
          }
        }
        case TPopupPlaces.Right:
        case TPopupPlaces.Left: {
          const res2 = { left: 0, top: ownerRect.top - (popRect.height - ownerRect.height) / 2 };
          res2.left = place == TPopupPlaces.Left ? ownerRect.left - popRect.width - popupGap : ownerRect.left + ownerRect.width + popupGap;
          switch (shift) {
            case 0: return res2;
            case 1: if (popRect.height > ownerCenter.vert) { res2.top = 0; return res2; }
            case -1: res2.top = winHeight - popRect.height; return res2;
          }
        }
      }
    };
    let newPlace = null;
    const place = config.popupPlaces.find(place => {
      const res = [0, 1, -1].find(shift => {
        const np = getTopLeft(place, shift);
        const right = np.left + popRect.width; const bottom = np.top + popRect.height;
        if (np.left >= 0 && np.top >= 0 && right <= winWidth && bottom <= winHeight) { newPlace = np; console.log(shift.toString()); return true; }
        return false;
      });
      if (res !== undefined) { console.log(place); return true;}
      return false;
    });
    if(!place) newPlace = { left: 0, top: 0 }; //center
    content.style.left = newPlace.left + 'px';
    content.style.top = newPlace.top + 'px';
  }
}


//jeden modal wrapper: dvojice Overlay divu s pozadim a Flex divu s obsahem
class ModalWrapper extends Wrapper {

  doRender(par: IDoRenderPar, content: JSX.Element): JSX.Element {
    const { delay, item, zIndex, overlayBackground } = par;
    const { $uniqueId, $type } = item;

    const overlaySt = {
      ...modalStyle.overlay,
      zIndex: zIndex,
      transitionDuration: `${delay}s`,
      backgroundColor: overlayBackground,
    };
    const wraperSt: any = {
      ...modalStyle.wrapper,
      ...($type == ModalType.modal ? modalStyle.modalWrapper : modalStyle.drawerWrapper),
      zIndex: zIndex + 1,
    };
    const contentSt = {
      ...modalStyle.content,
      ...($type == ModalType.modal ? null : modalStyle.drawerContent),
      transitionDuration: `${delay}s`,
    };

    return <div>
      <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt)}></div>
      <div className={renderCSS(wraperSt)} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, true); }} >
        <div className={renderCSS(contentSt)} style={{ maxWidth: window.innerWidth - 20, maxHeight: window.innerHeight - 20 }} onClick={ev => ev.stopPropagation()} id={`content-${$uniqueId}`} >
          {content}
        </div>
      </div>
    </div>;

  };
}

class DrawerWrapper extends ModalWrapper {
}


const modalLow: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};
const transition: CSSProperties = {
  opacity: 0,
  transitionProperty: `opacity`,
  transitionTimingFunction: 'ease-in-out'
}
const modalStyle = {
  overlay: {
    ...modalLow,
    ...transition
  } as CSSProperties,
  wrapper: {
    ...modalLow,
    backgroundColor: 'transparent',
    pointerEvents: 'auto',
  } as CSSProperties,
  modalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  drawerWrapper: {
  } as CSSProperties,
  content: {
    ...transition,
    backgroundColor: 'white',
  } as CSSProperties,
  drawerContent: {
    height: '100%', //XXX
    width:'1%'
  } as CSSProperties
};
