import React from 'react';
import { renderCSS } from '../../../web-fela/index';


import { ProviderOverlays, showModal, showPopup, IModalPropsLow, closeModal } from '../../../web-overlays/index';

class App extends React.Component<{}, { show: boolean; }> {
  state = { show: false };
  popupComp: React.ReactInstance;
  render(): JSX.Element {
    return <ProviderOverlays>
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      <div style={{ width: 1200, height: 100, textAlign:'center' }}>
        <a style={{ display: 'inline-block', height: 70, border: 'solid 2px red' }} href='#' ref={a => this.popupComp = a} onClick={ev => showPopupExample(this.popupComp)}>SHOW POPUP</a>
      </div>
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
    </ProviderOverlays>
  }
}

interface IPopupExampleProps extends IModalPropsLow<IPopupExampleRes> { title: string; }
interface IPopupExampleRes { result: boolean; }
const showPopupExample = async (owner: React.ReactInstance) => {
  const res = await showPopup<IPopupExampleProps, IPopupExampleRes>(owner, ModalPopup, { title: 'Modal Title' });
  //alert(JSON.stringify(res));
}

const ModalPopup = (props: IPopupExampleProps) => <div style={{ borderWidth: 2, borderStyle: 'solid', borderColor: 'black', padding: 10, backgroundColor: 'white', width: 400, height: 200 }}>
  POPUP
</div>;

export default App;
