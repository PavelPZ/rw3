import React from 'react';
import { renderCSS, renderKeyFrame } from '../../../web-fela/index';

//https://raw.githubusercontent.com/androidcss/pure-css-ripple-effect/master/index.html
const ripple = {
  position: 'relative',
  width: '150px',
  height: '75px',
  backgroundColor: '#99C',
  color: '#FFF',
  borderRadius: '3px',
  textDecoration: 'none',
  textAlign: 'center',
  verticalAlign: 'middle',
  display: 'table-cell',
}

const wave = {
  position: 'absolute',
  backgroundColor: '#FFF',
  top: 0,
  transform: 'scale(0)',
  opacity: 0.5,
  animationDuration: '2s'
}

const wave1_ = {}
const wave1 = {
  ...wave,
  width: '75px',
  height: '75px',
  left: '35px',
  borderRadius: '300px',
}

const wave2_ = {}
const wave2 = {
  ...wave,
  width: '150px',
  height: '75px',
  left: 0,
}

const keyFrame1: DFela.IKeyFrameStyle = {
  '0%': {
    transform: 'scale(0)'
  },
  '20%': {
    transform: 'scale(1)',
    opacity: 0.3
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 0
  }
}

const keyFrame2: DFela.IKeyFrameStyle = {
  '0%': {
    transform: 'scaleX(0)'
  },
  '20%': {
    transform: 'scaleX(1)',
    opacity: 0.3
  },
  '100%': {
    transform: 'scaleX(1)',
    opacity: 0
  }
}

const animWave1 = {
  [`:hover > .wave-1`]: {
    animationName: renderKeyFrame(keyFrame1)
  }
};

const animWave2 = {
  [`:hover > .wave-2`]: {
    animationName: renderKeyFrame(keyFrame2)
  }
};

class App extends React.Component {
  render(): JSX.Element {
    return <div>
      <div className={renderCSS({ ...ripple as any, ...animWave1 })}><div className={renderCSS(wave1 as any)  + ' wave-1'} ></div>Ripple1</div >
      <div className={renderCSS({ ...ripple as any, ...animWave2 })}><div className={renderCSS(wave2 as any) + ' wave-2'}></div>Ripple2</div>
    </div>;
  }

}

export default App;