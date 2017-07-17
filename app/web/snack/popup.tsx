import React from 'react';
import { renderCSS } from '../../../web-fela/index';
import { showModalExample } from './modal';


import { ProviderOverlays, showModal, showPopup, IModalPropsLow, closeModal } from '../../../web-overlays/index';

class App extends React.Component<{}, { show: boolean; }> {
  state = { show: false };
  popupComp: React.ReactInstance;
  render(): JSX.Element {
    return <ProviderOverlays>
      <div className={renderCSS({ width: '1rem', height: '1rem', backgroundColor: 'yellow', margin: 10 })}>XXXX</div>
      <div className={renderCSS({ width: '20px', height: '20px', backgroundColor: 'yellow', margin: 10, fontSize: '1rem' })}>XXXX</div>

      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      <div className={renderCSS({ width: 1200, height: 100, textAlign:'center' })}>
        <a className={renderCSS({ display: 'inline-block', height: 70, border: 'solid 2px red' })} href='#' ref={a => this.popupComp = a} onClick={ev => showPopupExample(this.popupComp)}>SHOW POPUP</a>
      </div>
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
    </ProviderOverlays>
  }
}

interface IPopupExampleProps extends IModalPropsLow<IPopupExampleRes> { title: string; }
interface IPopupExampleRes { result: boolean; }
export const showPopupExample = async (owner: React.ReactInstance, keepCallerOpen?: boolean) => {
  const res = await showPopup<IPopupExampleProps, IPopupExampleRes>(owner, ModalPopup, { title: 'Modal Title', $keepLast: keepCallerOpen});
}

const ModalPopup = (props: IPopupExampleProps) => <div className={renderCSS({ borderWidth: 2, borderStyle: 'solid', borderColor: 'black', padding: 10, backgroundColor: 'white', width: 400, height: 200 })}>
  POPUP<br />
  <span onClick={async ev => {
    await showModalExample();
  }}>SHOW MODAL</span>
</div>;

export default App;
