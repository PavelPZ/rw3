//input focus https://codepen.io/welovewebdesign/pen/pgeyeZ
import { colors, textColor4Color, textColors } from './colors';

export const palette = {
  primary: colors.Teal.color.color,
  primaryLight: colors.Teal.lighten[2].color,
  primaryDark: colors.Teal.darken[2].color,

  //secondary: colors.Orange.akcent[2].color,
  //secondaryLight: colors.Orange.akcent[0].color,
  //secondaryDark: colors.Orange.akcent[3].color,

  secondary: colors.DeepOrange.akcent[2].color,
  secondaryLight: colors.DeepOrange.akcent[0].color,
  secondaryDark: colors.DeepOrange.akcent[3].color,

  //secondary: colors.Pink.akcent[2].color,
  //secondaryLight: colors.Pink.akcent[0].color,
  //secondaryDark: colors.Pink.akcent[3].color,
  disabledButtonBkgnd: textColors.Black.Dividers as any as string,
  disabledButtonColor: textColors.Black.Disabled as any as string,
  divider: textColors.Black.Dividers as any as string,

  text: textColors.Black.Primary as any as string,
  textSecondary: textColors.Black.Secondary as any as string,
}

//https://react-md.mlaursen.com/components/papers
export const boxShadows = {
  s1: '0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2)',
  s2: '0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.4)',
  s3: '0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12), 0 3px 5px -1px rgba(0,0,0,.4)',
  s4: '0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12), 0 5px 5px -3px rgba(0,0,0,.4)',
  s5: '0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.4);',
}

//https://medium.com/@Florian/freebie-google-material-design-shadow-helper-2a0501295a2d
export const boxShadows2 = {
  s1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  s2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  s3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  s4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  s5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
}

export const sizes = {
  button: 14,
  h1: 28,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
}

type ButtonTypes = 'primary' | 'primaryLight' | 'primaryDark' | 'secondary' | 'secondaryLight' | 'secondaryDark';

export const flexCenter: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const buttonTheme = (color: string = palette.primary, flat: boolean, disabled: boolean) => {
  //try {
  //  const textColor = textColor4Color[color].Primary;
  //} catch (msg) {
  //  debugger;
  //}
  return {
    ...flexCenter,
    minWidth: 88,
    height: 36,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 8,
    marginRight: 8,
    fontSize: sizes.button,
    fontWeight: 'bold',
    borderRadius: 2,
    boxSizing: 'border-box',
    extend: [{
      condition: disabled,
      style: {
        backgroundColor: flat ? 'white' : palette.disabledButtonBkgnd,
        color: palette.disabledButtonColor,
        cursor: 'default',
        outlineStyle: 'none',
      }
    },
    {
      condition: !flat && !disabled,
      style: {
        backgroundColor: color,
        color: textColor4Color[color].Primary,
        cursor: 'pointer',
        transition: 'box-shadow transform 150ms',
        boxShadow: boxShadows.s2,
        ':hover': {
          boxShadow: boxShadows.s3,
          transform: 'translateY(-1px)',
        },
        ':focus': {
          textDecoration: 'underline',
          outlineColor: 'black',
          outlineStyle: 'solid',
          outlineWidth: 'thin'
        },
        ':active': {
          boxShadow: boxShadows.s2,
          transform: 'translateY(0px)',
        }
      }
    },
    {
      condition: flat && !disabled,
      style: {
        backgroundColor: 'white',
        color: color,
        cursor: 'pointer',
        ':hover': {
          backgroundColor: palette.divider,
        },
        ':focus': {
          textDecoration: 'underline',
          outlineColor: 'lightGray',
          outlineStyle: 'solid',
          outlineWidth: 'thin'
        },
      }
    },
    ],
  } as CSSProperties
}

const toolbarTheme = () = ({
  height:64,
} as CSSProperties);