﻿export const rippleCSS = `
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
.component-text .component-text { 
  display: inline;
  white-space: normal;
}
.component-button .component-view { 
  display: inline-flex;
}
`;