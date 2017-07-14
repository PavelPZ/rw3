import React from 'react';


interface IModalPropsLow<T> { $finish?: (res) => void; $idx?: number; $uniqueId?: number; $component?: TReactComponent }
type TReactComponent = React.ComponentClass | React.SFC;

export const config = {
  opacity: 0.8,
  delay: 0.25,
}

class ProviderOverlays extends React.Component {
  constructor() { super(); ProviderOverlays.singletone = this; }
  static singletone: ProviderOverlays;
  render(): JSX.Element {
    return <div onKeyDown={ev => this.onGlobalKeyDown(ev)}>
      {React.Children.only(this.props.children)}
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
  public closeModal(idx: number, res: {}, cancel:boolean) {
    const stack = this.overlayStack.state.stack;
    if (cancel && idx >= 0 && idx != stack.length - 1) return;
    if (!cancel && idx != stack.length - 1) throw '!cancel && idx != stack.length - 1';
    const item = stack[stack.length - 1];
    item.$finish(res);
    //resolve(result);
  }
  onGlobalKeyDown(ev: React.KeyboardEvent<{}>) {
    if (!ev || ev.keyCode != 27) return;
    ev.stopPropagation();
    const { stack } = this.overlayStack.state; if (stack.length == 0) return;
    this.closeModal(-1, null, true);
    //stack[stack.length - 1].$finish(null);
  };
  static uniqueId = 0;
}

export function showModal<T extends IModalPropsLow<R>, R>(content: React.ComponentClass<T> | React.SFC<T>, props: T): Promise<R> {
  return ProviderOverlays.singletone.showModal(content, props);
}
export function closeModal(idx: number, res: {}, cancel?: boolean) {
  return ProviderOverlays.singletone.closeModal(idx, res, cancel);
}

const getStackItem = (idx?: number) => {
  const stack = ProviderOverlays.singletone.overlayStack.state.stack;
  if (typeof idx === 'undefined') return stack[stack.length - 1];
  return stack[idx];
}

interface IOverlaysStackState {
  stack: IModalPropsLow<{}>[];
}

class OverlaysStack extends React.Component<{}, IOverlaysStackState> {
  state: IOverlaysStackState = { stack: [] };
  render(): JSX.Element {
    const { stack } = this.state; if (stack.length == 0) return null;
    return <div>{stack.map((st, idx) => <ModalWrapper $idx={idx} key={idx} />)}</div>;
  }
}

class ModalWrapper extends React.Component<{ $idx: number; }> {
  render(): JSX.Element {
    const $idx = this.props.$idx;
    const { $uniqueId, $component, ...otherProps } = getStackItem($idx);
    //this.$finish = $finish;
    //const contentProps: any = { ...otherProps }; //, $finish: this._hide.bind(this) };
    const { opacity, delay } = config;
    const zIndex = 100 + $idx * 2;
    const modalSt: any = {
      ...modalStyle.overlay,
      zIndex: zIndex,
      transition: `opacity ${delay}s`
    };
    const wraperSt: any = {
      ...modalStyle.wrapper,
      zIndex: zIndex + 1,
      transition: `opacity ${delay}s`
    };
    return <div key={$idx}>
      <div id={`overlay-${$uniqueId}`} style={modalSt}></div>
      <div id={`wrapper-${$uniqueId}`} style={wraperSt} onClick={ev => { ev.stopPropagation(); closeModal($idx, null, true); }} tabIndex={0}>
        <div style={modalStyle.content} onClick={ev => ev.stopPropagation()}>
          {isFunctional($component) ? ($component as React.SFC)(otherProps as any) : React.createElement($component as React.ComponentClass<IModalPropsLow<{}>>, otherProps)}
        </div>
      </div>
    </div>;
  }

  componentDidMount(): void {
    setTimeout(() => {
      const $idx = this.props.$idx;
      const item = getStackItem($idx);
      const $uniqueId = item.$uniqueId;
      const { opacity, delay } = config;
      const ov = document.getElementById(`overlay-${$uniqueId}`);
      const wrap = document.getElementById(`wrapper-${$uniqueId}`);
      wrap.focus();
      ov.style.opacity = opacity.toString(); wrap.style.opacity = '1';
      const $finish = item.$finish;
      item.$finish = res => {
        ov.style.opacity = '0'; wrap.style.opacity = '0';
        setTimeout(() => {
          const st = ProviderOverlays.singletone.overlayStack.state;
          st.stack = st.stack.slice(0, st.stack.length - 1);
          ProviderOverlays.singletone.overlayStack.forceUpdate();
          if (st.stack.length > 0) {
            const lastItem = st.stack[st.stack.length - 1];
            const lastWrap = document.getElementById(`wrapper-${lastItem.$uniqueId}`);
            setTimeout(() => lastWrap.focus(), 1);
          }
          $finish(res);
        }, delay * 1000);
      };
    }, 1);
  }

  //$finish: (res: {}) => void;
  //_doHide: (res: {}) => void;
  //_hide(res: {}) {
  //  this._doHide(res);
  //}
}

function isFunctional(Component) {
  return !Component.prototype || !Component.prototype.render
}

const modalLow = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};
const modalStyle = {
  overlay: {
    ...modalLow,
    backgroundColor: '#ddd',
    opacity: 0,
  },
  wrapper: {
    ...modalLow,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
    opacity: 0,
  },
  content: {}
};

//*************************************

interface IModalProps { delay: number; opacity: number; zindex: number; onFinished: (res) => void; }

interface IModal2Props { onRemove: (modalResult: any) => void }

class App extends React.Component<{}, { show: boolean; }> {
  state = { show: false };
  render(): JSX.Element {
    return <ProviderOverlays>
      <div>
        <h1>Hallo world</h1>
        <p> asd fas dfasdf ads f adsf </p>
        <a href='#' onClick={() => this.setState(st => ({ show: true }))}>SHOW</a>
        {' | '}
        <a href='#' onClick={ev => this.showModal()}>SHOW NEW</a>
        {this.state.show && <Modal delay={1} opacity={0.7} zindex={100} onFinished={res => { this.setState(st => ({ show: false })); alert(res); }} />}
      </div>
    </ProviderOverlays>
  }
  async showModal() {
    const res = await showModal<IModalExampleProps, IModalExampleRes>(ModalExample, { title: 'Modal Title' });
    //alert(JSON.stringify(res));
  }
}

interface IModalExampleProps extends IModalPropsLow<IModalExampleRes> { title: string; }
interface IModalExampleRes { result: boolean; }
const ModalExample = (props: IModalExampleProps) => <div style={{ backgroundColor: 'white' }} >
  <h1>{`${props.title} ${props.$idx}`}</h1>
  <span onClick={() => closeModal(props.$idx, { result: true })}>CLOSE</span>
  {' | '}
  <span onClick={() => showModal<IModalExampleProps, IModalExampleRes>(ModalExample, { title: 'Modal Title' })}>NEW</span>
</div>;

class Modal extends React.Component<IModalProps> {
  id: string;
  render(): JSX.Element {
    //this.id = `m${new Date().getTime()}`;
    this.id = 'modal-';
    const { id } = this;
    const { delay, zindex } = this.props;
    return <div>
      <style>{`
.${id}-wrapper,
.${id}-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.${id}-overlay {
  background-color: #ddd;
  opacity: 0;
  z-index: ${zindex};
  transition: opacity ${delay}s;
}

.${id}-wrapper {
  z-index: ${zindex + 1};
  transition: opacity ${delay}s;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  pointer-events: auto;
  opacity: 0;
}

`}</style>
      <div id={`overlay-${id}`} className={`${id}-overlay`}></div>
      <div className={`${id}-wrapper`} id={`wrapper-${id}`} >
        <div id={`content-${id}`} className={`${id}-content`}>
          <h2>Modal dialog</h2>
          <p>f as fasdf asd f asdf asd f asf asd f adsf asd f asdf asd fasd f asdf asd fasd f adsf asdf sad fasd </p>
          <a href='#' onClick={() => this._hide()}>HIDE</a>
        </div>
      </div>
    </div>
  }

  componentDidMount(): void {
    setTimeout(() => {
      const { id } = this;
      const { onFinished, delay, opacity } = this.props;
      const ov = document.getElementById(`overlay-${id}`);
      const wrap = document.getElementById(`wrapper-${id}`);
      ov.style.opacity = opacity.toString(); wrap.style.opacity = '1';
      this._hide = () => { ov.style.opacity = '0'; wrap.style.opacity = '0'; setTimeout(() => onFinished('DONE'), delay * 1000); };
    }, 1);
  }

  _hide: () => void;
}


export default App;
