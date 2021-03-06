﻿import React from 'react';
import { renderCSS } from 'web-fela';
import { showPopupExample } from './popup';


import { Provider, showModal, showPopup, IModalPropsLow, closeModal } from 'web-overlays';

//*************************************

interface IModalProps { delay: number; opacity: number; zindex: number; onFinished: (res) => void; }

interface IModal2Props { onRemove: (modalResult: any) => void }

class App extends React.Component<{}, { show: boolean; }> {
  state = { show: false };
  popupComp: React.ReactInstance;
  render(): JSX.Element {
    return <Provider>
      <h1>Hallo world</h1>
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      <p> asd fas dfasdf ads f adsf </p>
      <a href='#' onClick={() => this.setState(st => ({ show: true }))}>SHOW</a>
      {' | '}
      <a href='#' onClick={ev => showModalExample()}>SHOW NEW</a>
      {this.state.show && <Modal delay={1} opacity={0.7} zindex={100} onFinished={res => { this.setState(st => ({ show: false })); alert(res); }} />}
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
    </Provider>
  }
}

interface IModalExampleProps extends IModalPropsLow<IModalExampleRes> { title: string; asFullScreen: boolean; }
interface IModalExampleRes { result: boolean; }

export const showModalExample = async () => {
  const asFullScreen = window.innerWidth < 500;
  const res = await showModal<IModalExampleProps, IModalExampleRes>(ModalExample, { title: 'Modal Title', asFullScreen: asFullScreen }, asFullScreen);
  //alert(JSON.stringify(res));
}

const ModalExample = (props: IModalExampleProps) => {
  const linkId = new Date().getTime().toString();
  return <div className={renderCSS({ paddingTop: `${(/*10-*/props.$idx) * 30}`, backgroundColor: 'white' })} >
    <h1> {`${props.title} ${props.$idx}`}</h1>
    <span onClick={() => closeModal(props, { result: true })}>CLOSE</span>
    {' | '}
    <span onClick={() => showModalExample()}>NEW</span>
    {' | '}
    <a id={linkId} onClick={ev => showPopupExample(document.getElementById(linkId))}>SHOW POPUP</a>
  </div>
};

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
