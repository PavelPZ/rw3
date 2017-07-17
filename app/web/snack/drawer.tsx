import React from 'react';
import { renderCSS } from '../../../web-fela/index';
import { showModalExample } from './modal';


import { ProviderOverlays, showModal, showDrawer, IModalPropsLow, closeModal } from '../../../web-overlays/index';

class App extends React.Component<{}, { show: boolean; }> {
  state = { show: false };
  render(): JSX.Element {
    return <ProviderOverlays>
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      <div style={{ width: 1200, height: 100, textAlign:'center' }}>
        <a style={{ display: 'inline-block', height: 70, border: 'solid 2px red' }} href='#' onClick={ev => showDrawerExample()}>SHOW DRAWER</a>
      </div>
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
      asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />asdfasdfsad<br />
    </ProviderOverlays>
  }
}

interface IDrawerExampleProps extends IModalPropsLow<IDrawerExampleRes> { title: string; }
interface IDrawerExampleRes { result: boolean; }
export const showDrawerExample = async () => {
  const res = await showDrawer<IDrawerExampleProps, IDrawerExampleRes>(ModalDrawer, { title: 'Modal Title' });
  //alert(JSON.stringify(res));
}

const ModalDrawer = (props: IDrawerExampleProps) => <div style={{ borderWidth: 2, borderStyle: 'solid', borderColor: 'black', padding: 10, backgroundColor: 'white', width: 400, height:'99.7%' }}>
  DRAWER<br />
  <span onClick={async ev => {
    await showModalExample();
    closeModal(props, {});
  }}>SHOW MODAL</span>
</div>;

export default App;
