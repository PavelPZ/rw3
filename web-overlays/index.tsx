import React from 'react';
import ReactDOM from 'react-dom';
import { renderCSS } from '../web-fela/index';
import { isStateles } from '../common-lib/index';

export const enum ModalType { modal, popup, drawer }
export interface IModalPropsLow<T> { $finish?: (res) => void; $doClose?: (res, noAnimation: boolean) => void, $idx?: number; $uniqueId?: number; $component?: DCommon.TReactComponent, $type?: ModalType, $popupOwner?: React.ReactInstance, $keepLast?: boolean, $transition?: ITransition }
type TModalPropsLow = IModalPropsLow<{}>;

export const enum TPopupPlaces { Top, Left, Right, Bottom }
export const config = {
  opacity: 0.8,
  duration: 0.20,
  //duration: 1,
  overlayBackground: '#ddd',
  popupPlaces: [TPopupPlaces.Bottom, TPopupPlaces.Right, TPopupPlaces.Top, TPopupPlaces.Left],
  popupGap: 5,
}

//root aplikace. Obsahuje aplikaci a VEDLE div jako placeholder pro Overlay backdrops a modal wrappers
export class ProviderOverlays extends React.Component {
  constructor() { super(); ProviderOverlays.singletone = this; }
  static singletone: ProviderOverlays;
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
        item.$uniqueId = ProviderOverlays.uniqueId++;
        item.$component = content;
        stack.push(item);
        this.overlayStack.forceUpdate();
      };
      const { stack } = this.overlayStack.state;
      const hideLast = stack.length > 0 && stack[stack.length - 1].$type != ModalType.modal && !item.$keepLast;
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
  return ProviderOverlays.singletone.show(content, props);
}
export function showModal<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$type = ModalType.modal;
  props.$transition = opacityTransition;
  return ProviderOverlays.singletone.show(content, props);
}
export function showDrawer<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  props.$type = ModalType.drawer;
  props.$transition = opacityTranslateXTransition;
  return ProviderOverlays.singletone.show(content, props);
}
export function closeModal(props: TModalPropsLow, res: {}, cancel?: boolean, noAnimation?: boolean) {
  return ProviderOverlays.singletone.closeModal(props, res, cancel, noAnimation);
}

const getStackItem = (idx: number) => { return ProviderOverlays.singletone.overlayStack.state.stack[idx]; }

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
          case ModalType.drawer:
          case ModalType.modal: return <ModalWrapper $idx={idx} key={idx} />;
          case ModalType.popup: return <PopupWrapper $idx={idx} key={idx} />;
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

  abstract doRender(par: IRenderingPar, content: JSX.Element): JSX.Element;
  setContentPosition(item: TModalPropsLow, content: HTMLElement) { }

  render(): JSX.Element {
    //prepare data
    const $idx = this.props.$idx; //stack idx
    const item = getStackItem($idx); //stack item
    const { $component, ...otherProps } = item;
    const { duration, overlayBackground } = config;
    const zIndex = 100 + $idx * 2;
    //do rendering
    return this.doRender({ duration, item, zIndex, overlayBackground },
      isStateles($component) ? ($component as React.SFC)(otherProps as any) : React.createElement($component as React.ComponentClass<TModalPropsLow>, otherProps)
    );
  }

  componentDidMount(): void { //vse je vykresleno a existuje
    setTimeout(() => {
      const item = getStackItem(this.props.$idx); //stack of modal components
      const { $uniqueId, $type, $transition } = item; const { opacity, duration } = config;
      //start animation, position popup, set focus for ESC key
      const ov = document.getElementById(`overlay-${$uniqueId}`); const content = document.getElementById(`content-${$uniqueId}`);

      if ($type != ModalType.popup) ov.style.opacity = opacity.toString();
      Object.assign(content.style, $transition.start);
      this.setContentPosition(item, content);
      document.getElementById(providerOverlayId).focus();
      //set close modal callback
      item.$doClose = (res, noAnimation) => { //new finish - konec dialogu
        const doClose = () => { //remove from stack
          const state = ProviderOverlays.singletone.overlayStack.state;
          state.stack = state.stack.slice(0, state.stack.length - 1);
          ProviderOverlays.singletone.overlayStack.forceUpdate();
          const root = document.getElementById(providerOverlayId); if (root) root.focus(); //predej focus rootu, aby se uplatnil escape
          item.$finish(res);
        };
        if (noAnimation) doClose();
        else {
          Object.assign(content.style, $transition.end);
          if ($type != ModalType.popup) Object.assign(ov.style, opacityTransition.end); //ov.style.opacity = '0'; //finish animation
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

  setContentPosition(item: TModalPropsLow, content: HTMLElement) {
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


//jeden modal wrapper: dvojice Overlay divu s pozadim a Flex divu s obsahem
class ModalWrapper extends Wrapper {

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
      ...($type == ModalType.modal ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : null),
      zIndex: zIndex + 1,
      backgroundColor: 'transparent',
      pointerEvents: 'auto',
    };
    const contentSt = {
      ...($type == ModalType.modal ? null : { height: '100%', width: '1%'}),
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

const opacityTransition: ITransition = {
  init: (duration: number) => ({
    opacity: 0,
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease-in',
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
    transform: 'translateX(-150%)',
  }),
  start: {
    ...opacityTransition.start,
    transform: 'translateX(0)',
  } as CSSProperties,
  end: {
    ...opacityTransition.end,
    transform: 'translateX(-150%)',
  } as CSSProperties,
}

const opacityTranslateYTransition: ITransition = {
  init: (duration: number) => ({
    ...opacityTransition.init(duration),
    transitionProperty: 'opacity, transform',
    transform: 'translateY(-100%)',
  }),
  start: {
    ...opacityTransition.start,
    transform: 'translateY(0)',
  } as CSSProperties,
  end: {
    ...opacityTransition.end,
    transform: 'translateY(-100%)',
  } as CSSProperties,
}
