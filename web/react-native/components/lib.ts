export const ViewStyle: DFela.TCSS = {
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