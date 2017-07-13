import React from 'react';



interface IScale { step0: number, step1: number, step2: number, step3: number, step4: number, step5: number, step6: number, step7: number, step8: number, step9: number, step10: number, step11: number, step12: number, step13: number, step14: number, step15: number, step16: number, }
const scale: IScale = {
  step0: 1,
  step1: 15 / 16,
  step2: 8 / 9,
  step3: 5 / 6,
  step4: 4 / 5,
  step5: 3 / 4,
  step6: 1 / Math.SQRT2,
  step7: 2 / 3,
  step8: 5 / 8,
  step9: 3 / 5,
  step10: 9 / 16,
  step11: 8 / 15,
  step12: 1 / 2,
  step13: 2 / 5,
  step14: 3 / 8,
  step15: 1 / 3,
  step16: 1 / 4,
};

type TSteps = keyof IScale;

export const typography = ({ fontSize, fontSizeScale, lineHeight }: { fontSize: number; fontSizeScale: number | TSteps; lineHeight: number; }) => ({
  fontSize: (level: number) =>
    Array.from(Array(Math.abs(level))).reduce(size => {
      const scaleRatio =
        typeof fontSizeScale === 'string'
          ? scale[fontSizeScale as any]
          : fontSizeScale;
      return level > 0 ? size * (1 / scaleRatio) : size / (1 / scaleRatio);
    }, fontSize),
  lineHeight,
  rhythm: (ratio: number) => lineHeight * ratio,
});

const tp = typography({
  fontSize: 16,
  fontSizeScale: 'step5', // perfect fourth, modularscale.com
  lineHeight: 24,
});

var fs = tp.fontSize(3);
var rt = tp.rhythm(3);

