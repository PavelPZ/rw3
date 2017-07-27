import React from 'react';
import ReactDOM from 'react-dom';
import { renderCSS } from 'web-fela';
import { isStateles } from 'common-lib';

export const enum ModalType { modal, modalFullScreen, popup, drawer, blockGui }
export interface IModalPropsLow<T> { $finish?: (res) => void; $doClose?: (res, noAnimation: boolean) => void, $idx?: number; $uniqueId?: number; $component?: DCommon.TReactComponent, $type?: ModalType, $popupOwner?: React.ReactInstance, $keepLast?: boolean, $transition?: ITransition }
type TModalPropsLow = IModalPropsLow<{}>;

export const enum TPopupPlaces { Top, Left, Right, Bottom }
export const config = {
  opacity: 0.60,
  duration: 0.30,
  blockGuiDelay: 0.8,
  //duration: 1,
  overlayBackground: '#ddd',
  popupPlaces: [TPopupPlaces.Bottom, TPopupPlaces.Right, TPopupPlaces.Top, TPopupPlaces.Left],
  popupGap: 5,
}

//root aplikace. Obsahuje aplikaci a VEDLE div jako placeholder pro Overlay backdrops a modal wrappers
export class Provider extends React.Component {
  constructor() { super(); Provider.singletone = this; }
  static singletone: Provider;
  render(): JSX.Element {
    return <OverlaysStack ref={st => this.overlayStack = st} app={
      <div key='app' className={renderCSS({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' })}>
        {this.props.children}
      </div>
    } />;
  }
  overlayStack: OverlaysStack;
  show<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, item: T): Promise<R> {
    return new Promise<R>(resolve => {
      const doShow = () => {
        const { stack } = this.overlayStack.state;
        item.$finish = () => resolve();
        item.$idx = stack.length;
        item.$uniqueId = Provider.uniqueId++;
        item.$component = content;
        stack.push(item);
        this.overlayStack.forceUpdate();
      };
      const { stack } = this.overlayStack.state;
      const lastItem = stack.length <= 0 ? null : stack[stack.length - 1];
      const hideLast = lastItem != null && lastItem.$type != ModalType.modal && lastItem.$type != ModalType.modalFullScreen && !item.$keepLast;
      if (hideLast) {
        this.closeModal(null, null, true, true);
        setTimeout(doShow, 1);
      } else
        doShow();
    });
  }

  closeModal(props: TModalPropsLow, res: {}, cancel: boolean, noAnimation: boolean) {
    const stack = this.overlayStack.state.stack;
    const $idx = props ? props.$idx : stack.length - 1;
    stack[$idx].$doClose(res, noAnimation); //.$finish(res);
  }
  static uniqueId = 0;
}
const providerOverlayId = 'provider-overlay';

export function showPopup<T extends IModalPropsLow<R>, R>(owner: React.ReactInstance, content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$popupOwner = owner;
  props.$type = ModalType.popup;
  props.$transition = opacityTransition;
  return Provider.singletone.show(content, props);
}
export function showModal<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$type = ModalType.modalFullScreen;
  props.$transition = opacityTransition;
  return Provider.singletone.show(content, props);
}
export function showDrawer<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$type = ModalType.drawer;
  props.$transition = opacityTranslateXTransition;
  return Provider.singletone.show(content, props);
}
export function closeModal(props: TModalPropsLow, res: {}, cancel?: boolean, noAnimation?: boolean) {
  return Provider.singletone.closeModal(props, res, cancel, noAnimation);
}
export function showBlockGui() {
  blockGuiCount++;
  if (blockGuiCount > 1) return;
  blockGuiProps = { $type: ModalType.blockGui, $transition: blokGuiTransition };
  Provider.singletone.show(null, blockGuiProps);
}
export function hideBlockGui() {
  if (blockGuiCount < 1) throw 'blockGuiCount < 1';
  blockGuiCount--;
  if (blockGuiCount > 0) return;
  Provider.singletone.closeModal(blockGuiProps, null, true, true);
}
let blockGuiCount = 0;
let blockGuiProps: TModalPropsLow;


const getStackItem = (idx: number) => { return Provider.singletone.overlayStack.state.stack[idx]; }

interface IOverlaysStackState {
  stack: TModalPropsLow[];
}
interface IOverlaysStack {
  app: JSX.Element;
}

//seznam ModalWrapper's
class OverlaysStack extends React.Component<IOverlaysStack, IOverlaysStackState> {
  state: IOverlaysStackState = { stack: [] };
  render(): JSX.Element {
    const { stack } = this.state; //if (stack.length == 0) return null;
    return <div id={providerOverlayId} onKeyDown={ev => this.onGlobalKeyDown(ev)} tabIndex={0} className={renderCSS({ outline: 'none', })}>
      {this.props.app}
      {stack.map((st, idx) => {
        switch (st.$type) {
          case ModalType.drawer: return <DrawerWrapper $idx={idx} key={idx} />;
          case ModalType.modalFullScreen:
          case ModalType.modal: return <ModalWrapper $idx={idx} key={idx} />;
          case ModalType.popup: return <PopupWrapper $idx={idx} key={idx} />;
          case ModalType.blockGui: return <BlockGuiWrapper $idx={idx} key={idx} />;
          default: throw 'notimplemented';
        }
      })}
    </div>;
  }
  onGlobalKeyDown(ev: React.KeyboardEvent<{}>) {
    if (!ev || ev.keyCode != 27) return;
    ev.stopPropagation();
    const { stack } = this.state;
    const item = stack.length == 0 ? null : stack[stack.length - 1];
    if (item == 0 || item.$type == ModalType.blockGui || item.$type == ModalType.modalFullScreen) return;
    closeModal(null, null, true);
  };
}

abstract class Wrapper extends React.Component<{ $idx: number; }> {

  abstract doRender(par: IRenderingPar, content: JSX.Element): JSX.Element;
  setPopupContentPosition(item: TModalPropsLow, content: HTMLElement) { }

  render(): JSX.Element {
    //prepare data
    const $idx = this.props.$idx; //stack idx
    const item = getStackItem($idx); //stack item
    const { $component, ...otherProps } = item;
    const { duration, overlayBackground } = config;
    const zIndex = 100 + $idx * 2;
    //do rendering
    return this.doRender({ duration, item, zIndex, overlayBackground },
      !$component ? null : (isStateles($component) ? ($component as React.SFC)(otherProps as any) : React.createElement($component as React.ComponentClass<TModalPropsLow>, otherProps))
    );
  }

  componentDidMount(): void { //vse je vykresleno a existuje
    setTimeout(() => {
      const item = getStackItem(this.props.$idx); //stack of modal components
      const { $uniqueId, $type, $transition } = item; const { opacity, duration } = config;
      //start animation, position popup, set focus for ESC key
      const ov = document.getElementById(`overlay-${$uniqueId}`); //pro fullscreenmodal overlay neexistuje
      const content = document.getElementById(`content-${$uniqueId}`);

      if ($type != ModalType.popup && ov) ov.style.opacity = opacity.toString();
      Object.assign(content.style, $transition.start);
      this.setPopupContentPosition(item, content);
      document.getElementById(providerOverlayId).focus();
      //set close modal callback
      item.$doClose = (res, noAnimation) => { //new finish - konec dialogu
        const doClose = () => { //remove from stack
          const state = Provider.singletone.overlayStack.state;
          state.stack = state.stack.slice(0, state.stack.length - 1);
          Provider.singletone.overlayStack.forceUpdate();
          const root = document.getElementById(providerOverlayId); if (root) root.focus(); //predej focus rootu, aby se uplatnil escape
          item.$finish(res);
        };
        if (noAnimation) doClose();
        else {
          Object.assign(content.style, $transition.end);
          if ($type != ModalType.popup && ov) Object.assign(ov.style, opacityTransition.end); //ov.style.opacity = '0'; //finish animation
          setTimeout(() => doClose(), duration * 1000); //wait for finish animation end
        }
      };
    }, 1);
  }

}

interface IRenderingPar { duration: number; item: TModalPropsLow; zIndex: number; overlayBackground: string; };

class PopupWrapper extends Wrapper {

  doRender(par: IRenderingPar, content: JSX.Element): JSX.Element {
    const { duration, zIndex, item, overlayBackground } = par;
    const { $uniqueId, $transition } = item;

    const overlaySt: CSSProperties = {
      ...modalLow,
      zIndex: zIndex,
      backgroundColor: 'transparent',
    };
    const contentSt: CSSProperties = {
      ...$transition.init(duration),
      position: 'absolute',
      left: 0,
      top: 0,
    };

    return <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt)} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, false, true); }}>
      <div className={renderCSS(contentSt)} style={{ maxWidth: window.innerWidth - 20, maxHeight: window.innerHeight - 20 }} onClick={ev => ev.stopPropagation()} id={`content-${$uniqueId}`} >
        {content}
      </div>
    </div>;
  }

  setPopupContentPosition(item: TModalPropsLow, content: HTMLElement) {
    let el = ReactDOM.findDOMNode(item.$popupOwner);
    const ownerRect = el.getBoundingClientRect();
    const popRect = content.getBoundingClientRect();
    const ownerCenter = { horz: ownerRect.left + ownerRect.width / 2, vert: ownerRect.top + ownerRect.height / 2 };
    const winHeight = window.innerHeight; const winWidth = window.innerWidth;
    const { popupGap } = config;
    //spocitej pozici
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
    //najdi prvni ozici, u ktere nepresahuje obsah pres screen
    let newPlace = null;
    const place = config.popupPlaces.find(place => {
      const res = [0, 1, -1].find(shift => {
        const np = getTopLeft(place, shift);
        const right = np.left + popRect.width; const bottom = np.top + popRect.height;
        if (np.left >= 0 && np.top >= 0 && right <= winWidth && bottom <= winHeight) { newPlace = np; console.log(shift.toString()); return true; }
        return false;
      });
      if (res !== undefined) { console.log(place); return true; }
      return false;
    });
    //escape - put to center
    if (!place) newPlace = { left: (winWidth - popRect.width) / 2, top: (winHeight - popRect.height) / 2 };
    //set position
    content.style.left = newPlace.left + 'px';
    content.style.top = newPlace.top + 'px';
  }
}

class BlockGuiWrapper extends Wrapper {

  doRender(par: IRenderingPar, content: JSX.Element): JSX.Element {
    const { zIndex, item } = par;
    const { $uniqueId, $transition } = item;

    const overlaySt: CSSProperties = {
      ...modalLow,
      zIndex: zIndex,
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'wait',
    };
    const contentSt: CSSProperties = {
      ...$transition.init(config.blockGuiDelay),
      width: 30,
      height: 30,
      backgroundColor: 'red'
    };

    return <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt)} onClick={ev => { ev.stopPropagation(); }}>
      <div className={renderCSS(contentSt)} id={`content-${$uniqueId}`} >
      </div>
    </div>;
  }
}

class DrawerWrapper extends Wrapper {

  doRender(par: IRenderingPar, content: JSX.Element): JSX.Element {
    const { duration, item, zIndex, overlayBackground } = par;
    const { $uniqueId, $type, $transition } = item;

    const overlaySt = {
      ...modalLow,
      ...opacityTransition.init(duration),
      zIndex: zIndex,
      backgroundColor: overlayBackground,
    };
    const wraperSt: any = {
      ...modalLow,
      zIndex: zIndex + 1,
      backgroundColor: 'transparent',
      pointerEvents: 'auto',
    };
    const contentSt = {
      ...$transition.init(duration),
      height: '100%',
      width: '1%',
    };

    return <div>
      <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt)}></div>
      <div className={renderCSS(wraperSt)} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, true); }} >
        <div id={`content-${$uniqueId}`} className={renderCSS(contentSt)} onClick={ev => ev.stopPropagation()} >
          {content}
        </div>
      </div>
    </div>;

  };
}


//jeden modal wrapper: dvojice Overlay divu s pozadim a Flex divu s obsahem
class ModalWrapper extends Wrapper {

  doRender(par: IRenderingPar, content: JSX.Element): JSX.Element {
    const { duration, item, zIndex, overlayBackground } = par;
    const { $uniqueId, $type, $transition } = item;

    if ($type == ModalType.modalFullScreen) {
      const contentSt: CSSProperties = {
        ...modalLow,
        ...$transition.init(duration),
        zIndex: zIndex,
        backgroundColor: 'white',
      };
      return <div id={`content-${$uniqueId}`} className={renderCSS(contentSt)} onClick={ev => ev.stopPropagation()} >
        {content}
      </div>;
    } else {
      const overlaySt: CSSProperties = {
        ...modalLow,
        ...opacityTransition.init(duration),
        zIndex: zIndex,
        backgroundColor: overlayBackground,
      };
      const wraperSt: CSSProperties = {
        ...modalLow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: zIndex + 1,
        backgroundColor: 'transparent',
        pointerEvents: 'auto',
      };
      const contentSt: CSSProperties = {
        ...$transition.init(duration),
      };

      return <div>
        <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt)}></div>
        <div className={renderCSS(wraperSt)} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, true); }} >
          <div id={`content-${$uniqueId}`} className={renderCSS(contentSt)} style={{ maxWidth: window.innerWidth - 20, maxHeight: window.innerHeight - 20 }} onClick={ev => ev.stopPropagation()} >
            {content}
          </div>
        </div>
      </div>;
    }

  };
}

const modalLow: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
};

interface ITransition {
  init: (duration: number) => CSSProperties;
  start: CSSProperties;
  end: CSSProperties;
}

const blokGuiTransition: ITransition = {
  init: (delay: number) => ({
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDelay: `${delay}s`,
    transitionDuration: '0s',
  }) as CSSProperties,
  start: {
    opacity: 1,
  } as CSSProperties,
  end: {
    opacity: 0,
  } as CSSProperties,
}

const opacityTransition: ITransition = {
  init: (duration: number) => ({
    opacity: 0,
    transitionProperty: 'opacity',
    //transitionTimingFunction: 'ease-in',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    transitionDuration: `${duration}s`,
  }) as CSSProperties,
  start: {
    opacity: 1,
  } as CSSProperties,
  end: {
    opacity: 0,
  } as CSSProperties,
}

const opacityTranslateXTransition: ITransition = {
  init: (duration: number) => ({
    ...opacityTransition.init(duration),
    transitionProperty: 'opacity, transform',
    transform: 'translateX(-300%)',
  }),
  start: {
    ...opacityTransition.start,
    transform: 'translateX(0)',
  } as CSSProperties,
  end: {
    ...opacityTransition.end,
    transform: 'translateX(-300%)',
  } as CSSProperties,
}
