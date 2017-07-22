//export as namespace AnimatedProxy;

declare const animated: IAnimated;

export default animated;

interface ValueClass {
  new(value: number);
}
interface ValueXYClass {
  new(valueIn?: { x: number | ReactNative.Animated.AnimatedValue; y: number | ReactNative.Animated.AnimatedValue });
}


export interface IAnimated {
  Value: ValueClass;
  ValueXY: ValueXYClass;
  //decay: (value: RN.Animated.AnimatedValue | RN.Animated.AnimatedValueXY, config: RN.Animated.DecayAnimationConfig) => RN.Animated.CompositeAnimation;
  //timing: (value: RN.Animated.AnimatedValue | RN.Animated.AnimatedValueXY, config: RN.Animated.TimingAnimationConfig) => RN.Animated.CompositeAnimation;
  //add: (a: RN.Animated.Animated, b: RN.Animated.Animated) => RN.Animated.AnimatedAddition;

  //class AnimatedAddition extends AnimatedInterpolation { }

  ///**
  // * Creates a new Animated value composed from two Animated values multiplied
  // * together.
  // */
  //export function multiply(
  //  a: Animated,
  //  b: Animated
  //): AnimatedMultiplication;

  //class AnimatedMultiplication extends AnimatedInterpolation { }

  ///**
  // * Creates a new Animated value that is the (non-negative) modulo of the
  // * provided Animated value
  // */
  //export function modulo(
  //  a: Animated,
  //  modulus: number
  //): AnimatedModulo;

  //class AnimatedModulo extends AnimatedInterpolation { }

  ///**
  // * Create a new Animated value that is limited between 2 values. It uses the
  // * difference between the last value so even if the value is far from the bounds
  // * it will start changing when the value starts getting closer again.
  // * (`value = clamp(value + diff, min, max)`).
  // *
  // * This is useful with scroll events, for example, to show the navbar when
  // * scrolling up and to hide it when scrolling down.
  // */
  //export function diffClamp(a: Animated, min: number, max: number): AnimatedDiffClamp;

  //class AnimatedDiffClamp extends AnimatedInterpolation { }

  ///**
  // * Starts an animation after the given delay.
  // */
  //export function delay(time: number): CompositeAnimation;

  ///**
  // * Starts an array of animations in order, waiting for each to complete
  // * before starting the next.  If the current running animation is stopped, no
  // * following animations will be started.
  // */
  //export function sequence(
  //  animations: Array<CompositeAnimation>
  //): CompositeAnimation;

  ///**
  // * Array of animations may run in parallel (overlap), but are started in
  // * sequence with successive delays.  Nice for doing trailing effects.
  // */

  //export function stagger(
  //  time: number,
  //  animations: Array<CompositeAnimation>
  //): CompositeAnimation

  ///**
  // * Spring animation based on Rebound and Origami.  Tracks velocity state to
  // * create fluid motions as the `toValue` updates, and can be chained together.
  // */
  //export function spring(
  //  value: AnimatedValue | AnimatedValueXY,
  //  config: SpringAnimationConfig
  //): CompositeAnimation;

  //type ParallelConfig = {
  //  stopTogether?: boolean; // If one is stopped, stop all.  default: true
  //}

  ///**
  // * Starts an array of animations all at the same time.  By default, if one
  // * of the animations is stopped, they will all be stopped.  You can override
  // * this with the `stopTogether` flag.
  // */
  //export function parallel(
  //  animations: Array<CompositeAnimation>,
  //  config?: ParallelConfig
  //): CompositeAnimation;

  //type Mapping = { [key: string]: Mapping } | AnimatedValue;
  //interface EventConfig {
  //  listener?: ValueListenerCallback
  //}

  ///**
  // *  Takes an array of mappings and extracts values from each arg accordingly,
  // *  then calls `setValue` on the mapped outputs.  e.g.
  // *
  // *```javascript
  // *  onScroll={Animated.event(
  // *    [{nativeEvent: {contentOffset: {x: this._scrollX}}}]
  // *    {listener},          // Optional async listener
  // *  )
  // *  ...
  // *  onPanResponderMove: Animated.event([
  // *    null,                // raw event arg ignored
  // *    {dx: this._panX},    // gestureState arg
  // *  ]),
  // *```
  // */
  //export function event(
  //  argMapping: Mapping[],
  //  config?: EventConfig
  //): (...args: any[]) => void;

  ///**
  // * Make any React component Animatable.  Used to create `Animated.View`, etc.
  // */
  //export function createAnimatedComponent(component: any): any;

  ///**
  // * Animated variants of the basic native views. Accepts Animated.Value for
  // * props and style.
  // */
  //export var View: any;
  //export var Image: any;
  //export var Text: any;
}



declare namespace AnimatedProxy {

 
}