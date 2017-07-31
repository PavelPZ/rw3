import React from 'react';
import { renderStatic } from '../../web-fela/index';
import { renderCSS } from '../../web-fela/index';

export const ViewStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  position: 'relative',
  // fix flexbox bugs
  minHeight: 0,
  minWidth: 0,
};

export const KeyboardHandler = onPress => (ev: React.KeyboardEvent<{}>) => { if (!onPress || ev.keyCode !== 13) return; ev.stopPropagation(); onPress(ev); };
export const MouseHandler = onPress => (ev: React.MouseEvent<{}>) => { if (!onPress) return; ev.stopPropagation(); onPress(ev); };
export const ClickHandler = (onPress: () => void, props) => {
  if (!onPress) return null;
  props.onClick = MouseHandler(onPress);
  props.onKeyDown = KeyboardHandler(onPress);
};

renderStatic(`
.component-text .component-text {
  display: inline;
  white-space: normal;
}

.component-button .component-view {
  display: inline-flex;
}

/*  RIPPLE */
.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .5s, opacity 1s;
  }

  .ripple:active:after {
    transform: scale(0, 0);
    opacity: .2;
    transition: 0s;
  }

`);

