/**
 * Helper to ease constructing `apply` function for styles only.
 * @param { fuction } fn mapping from type and props to styles
 * @returns { function } apply function
 */
export const applyStyle = fn => (type, props) => {
  const style = fn(type, props)
  return { ...props, style: [style, props.style] }
}

/**
 * Apply function factory which merges props defined in arguments.
 * Prop definition is an object containing special key `$type` representing
 * component type and other keys which are properties to be passed to element.
 * @param { array } propsDefs array of prop definitions
 * @returns { function } apply function
 */
export const withProps: DReactNative.IThemeWithProc = propsDefs => (type, ownProps) => {
  const def = propsDefs.find(s => s.$type === type)
  if (!def) return ownProps;
  const { $type, $isProp, ...themeProps } = def
  if ($isProp || themeProps.style)
    return {
      ...themeProps,
      ...ownProps,
      style: { ...themeProps.style, ...ownProps.style },
    }
  else
    return { ...ownProps, style: { ...themeProps, ...ownProps.style } }
}

/**
 * Apply function factory which merges styles defined in arguments.
 * Style definition is an object containing special key `$type` representing
 * component type and other keys which are styles to be passed to element.
 * @param { array } stylesDefs array of style definitions
 * @returns { function } apply function
 */
//export const withStyles: DReactNativeTheme.IWithStylesProc = stylesDefs => (type, props) => {
//  const def = stylesDefs.find(s => s.$type === type)
//  if (def) {
//    const { $type, ...themeStyle } = def
//    return { ...props, style: { ...themeStyle, ...props.style } }
//  }
//  return props
//}

