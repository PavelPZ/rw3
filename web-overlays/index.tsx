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

//*** singletones
let provider: Provider;
let overlayStack: OverlaysStack;
let stack: TModalPropsLow[];
let blockGuiCount = 0;
let blockGuiProps: TModalPropsLow;


//root aplikace. Obsahuje aplikaci a VEDLE div jako placeholder pro Overlay backdrops a modal wrappers
export class Provider extends React.Component {
  constructor() { super(); provider = this; }
  render(): JSX.Element {
    return <OverlaysStack ref={st => overlayStack = st} app={
      <div key='app' className={renderCSS({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' })}>
        {this.props.children}
      </div>
    } />;
  }
  show<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, item: T): Promise<R> {
    return new Promise<R>(resolve => {
      const doShow = () => {
        item.$finish = () => resolve();
        item.$idx = stack.length;
        item.$uniqueId = Provider.uniqueId++;
        item.$component = content;
        stack.push(item);
        overlayStack.forceUpdate();
      };
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
  return provider.show(content, props);
}
export function showModal<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T, asFullScreen: boolean): Promise<R> {
  props.$type = asFullScreen ? ModalType.modalFullScreen : ModalType.modal;
  props.$transition = opacityTransition;
  return provider.show(content, props);
}
export function showDrawer<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$type = ModalType.drawer;
  props.$transition = opacityTranslateXTransition;
  return provider.show(content, props);
}
export function closeModal(props: TModalPropsLow, res: {}, cancel?: boolean, noAnimation?: boolean) {
  return provider.closeModal(props, res, cancel, noAnimation);
}
export function showBlockGui() {
  blockGuiCount++;
  if (blockGuiCount > 1) return;
  blockGuiProps = { $type: ModalType.blockGui, $transition: blokGuiTransition };
  provider.show(null, blockGuiProps);
}
export function hideBlockGui() {
  if (blockGuiCount < 1) throw 'blockGuiCount < 1';
  blockGuiCount--;
  if (blockGuiCount > 0) return;
  provider.closeModal(blockGuiProps, null, true, true);
}

interface IOverlaysStackState {
  stack: TModalPropsLow[];
}
interface IOverlaysStack {
  app: JSX.Element;
}

//seznam ModalWrapper's
class OverlaysStack extends React.Component<IOverlaysStack, IOverlaysStackState> {
  state: IOverlaysStackState = { stack: stack = [] };
  render(): JSX.Element {
    return <div id={providerOverlayId} onKeyDown={ev => this.onGlobalKeyDown(ev)} tabIndex={0} className={renderCSS({ outline: 'none', })}>
      {this.props.app}
      {stack.map((st, idx) => <Wrapper $idx={idx} key={idx} />)}
    </div>;
  }
  onGlobalKeyDown(ev: React.KeyboardEvent<{}>) {
    if (!ev || ev.keyCode != 27) return;
    ev.stopPropagation();
    const item = stack.length == 0 ? null : stack[stack.length - 1];
    if (item == 0 || item.$type == ModalType.blockGui || item.$type == ModalType.modalFullScreen) return;
    closeModal(null, null, true);
  };
}

class Wrapper extends React.Component<{ $idx: number; }> {

  doRender(item: TModalPropsLow, zIndex: number, content: JSX.Element): JSX.Element {
    const { $uniqueId, $type, $transition } = item;

    switch ($type) {
      case ModalType.modalFullScreen: return <div id={`content-${$uniqueId}`} className={renderCSS(overlaySt(zIndex, $type, $transition))} onClick={ev => ev.stopPropagation()} >
        {content}
      </div>;

      case ModalType.modal: return <div>
        <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt(zIndex, $type, $transition))}></div>
        <div className={renderCSS(wrapperSt(zIndex + 1, $type))} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, true); }} >
          <div id={`content-${$uniqueId}`} className={renderCSS(contentSt($type, $transition))} style={{ maxWidth: window.innerWidth - 20, maxHeight: window.innerHeight - 20 }} onClick={ev => ev.stopPropagation()} >
            {content}
          </div>
        </div>
      </div>;

      case ModalType.drawer: return <div>
        <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt(zIndex, $type, $transition))}></div>
        <div className={renderCSS(wrapperSt(zIndex + 1, $type))} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, true); }} >
          <div id={`content-${$uniqueId}`} className={renderCSS(contentSt($type, $transition))} onClick={ev => ev.stopPropagation()} >
            {content}
          </div>
        </div>
      </div>;

      case ModalType.blockGui: return <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt(zIndex, $type, $transition))} onClick={ev => { ev.stopPropagation(); }}>
        <div className={renderCSS(contentSt($type, $transition))} id={`content-${$uniqueId}`} >
        </div>
      </div>;

      case ModalType.popup: return <div id={`overlay-${$uniqueId}`} className={renderCSS(overlaySt(zIndex, $type, $transition))} onClick={ev => { ev.stopPropagation(); closeModal(this.props, null, false, true); }}>
        <div className={renderCSS(contentSt($type, $transition))} style={{ maxWidth: window.innerWidth - 20, maxHeight: window.innerHeight - 20 }} onClick={ev => ev.stopPropagation()} id={`content-${$uniqueId}`} >
          {content}
        </div>
      </div>;

    };
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

  render(): JSX.Element {
    //prepare data
    const $idx = this.props.$idx; //stack idx
    const item = stack[$idx]; //stack item
    const { $component, ...otherProps } = item;
    const zIndex = 100 + $idx * 2;
    //do rendering
    return this.doRender(item, zIndex,
      !$component ? null : (isStateles($component) ? ($component as React.SFC)(otherProps as any) : React.createElement($component as React.ComponentClass<TModalPropsLow>, otherProps))
    );
  }

  componentDidMount(): void { //vse je vykresleno a existuje
    setTimeout(() => {
      const item = stack[this.props.$idx]; //stack of modal components
      const { $uniqueId, $type, $transition } = item; const { opacity, duration } = config;
      //start animation, position popup, set focus for ESC key
      const ov = document.getElementById(`overlay-${$uniqueId}`); //pro fullscreenmodal overlay neexistuje
      const content = document.getElementById(`content-${$uniqueId}`);

      if ($type != ModalType.popup && ov) ov.style.opacity = opacity.toString();
      Object.assign(content.style, $transition.start);
      if ($type == ModalType.popup) this.setPopupContentPosition(item, content);
      document.getElementById(providerOverlayId).focus();
      //set close modal callback
      item.$doClose = (res, noAnimation) => { //new finish - konec dialogu
        const doClose = () => { //remove from stack
          const state = overlayStack.state;
          stack = state.stack = stack.slice(0, stack.length - 1);
          overlayStack.forceUpdate();
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


const fullScreen = (zIndex: number) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: zIndex,
} as CSSProperties);

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

const overlaySt = (zIndex: number, $type: ModalType, $transition: ITransition) => ({
  extend: [
    fullScreen(zIndex),
    {
      condition: $type == ModalType.modalFullScreen,
      style: {
        ...$transition.init(config.duration),
        backgroundColor: 'white',
      }
    },
    {
      condition: $type == ModalType.modal || $type == ModalType.drawer,
      style: {
        ...opacityTransition.init(config.duration),
        backgroundColor: config.overlayBackground,
      }
    },
    {
      condition: $type == ModalType.blockGui,
      style: {
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'wait',
      }
    },
    {
      condition: $type == ModalType.popup,
      style: {
        backgroundColor: 'transparent',
      }
    },
  ]
} as CSSProperties)

const wrapperSt = (zIndex: number, $type: ModalType) => ({
  extend: [
    {
      condition: $type == ModalType.modal,
      style: {
        ...fullScreen(zIndex + 1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        pointerEvents: 'auto',
      }
    },
    {
      condition: $type == ModalType.drawer,
      style: {
        ...fullScreen(zIndex + 1),
        backgroundColor: 'transparent',
        pointerEvents: 'auto',
      }
    },
  ]
} as CSSProperties)

const contentSt = ($type: ModalType, $transition: ITransition) => ({
  extend: [
    {
      condition: $type == ModalType.modal,
      style: {
        ...$transition.init(config.duration),
      }
    },
    {
      condition: $type == ModalType.drawer,
      style: {
        ...$transition.init(config.duration),
        height: '100%',
        width: '1%',
      }
    },
    {
      condition: $type == ModalType.blockGui,
      style: {
        ...$transition.init(config.blockGuiDelay),
        width: 30,
        height: 30,
        backgroundColor: 'red'
      }
    },
    {
      condition: $type == ModalType.popup,
      style: {
        ...$transition.init(config.duration),
        position: 'absolute',
        left: 0,
        top: 0,
      }
    },
  ]
} as CSSProperties)

