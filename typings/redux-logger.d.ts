declare module 'redux-logger' {
  import Redux from 'redux';
  const createLogger: () => Redux.Middleware;
  export = createLogger;
}
