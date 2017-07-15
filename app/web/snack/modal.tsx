import React from 'react';
import { renderCSS } from '../../../web-fela/index';


import { ProviderOverlays, showModal, IModalPropsLow, closeModal } from '../../../web-overlays/index';

//*************************************

interface IModalProps { delay: number; opacity: number; zindex: number; onFinished: (res) => void; }

interface IModal2Props { onRemove: (modalResult: any) => void }

class App extends React.Component<{}, { show: boolean; }> {
  state = { show: false };
  render(): JSX.Element {
    return <ProviderOverlays>
      <h1>Hallo world</h1>
      <p> asd fas dfasdf ads f adsf </p>
      <a href='#' onClick={() => this.setState(st => ({ show: true }))}>SHOW</a>
      {' | '}
      <a href='#' onClick={ev => showModalExample()}>SHOW NEW</a>
      {this.state.show && <Modal delay={1} opacity={0.7} zindex={100} onFinished={res => { this.setState(st => ({ show: false })); alert(res); }} />}
    </ProviderOverlays>
  }
}

interface IModalExampleProps extends IModalPropsLow<IModalExampleRes> { title: string; }
interface IModalExampleRes { result: boolean; }

const showModalExample = async () => {
  const res = await showModal<IModalExampleProps, IModalExampleRes>(ModalExample, { title: 'Modal Title' });
  //alert(JSON.stringify(res));
}

const ModalExample = (props: IModalExampleProps) => <div>
  <h1 style={{ paddingTop: `${(/*10-*/props.$idx) * 30}px` }} > {`${props.title} ${props.$idx}`}</h1>
  <span onClick={() => closeModal(props, { result: true })}>CLOSE</span>
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
