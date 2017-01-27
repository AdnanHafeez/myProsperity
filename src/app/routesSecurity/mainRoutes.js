import Main from '../MainSecurityContainer.ts';

export default {
  path: 'security',
  getComponent (nextState, cb) {
    cb(null, Main);
  },
  getChildRoutes (partialNextState, cb) {
    //require.ensure([], function (require) {
      cb(null, [
        require('./indexRoute.js').default,
        require('./homeRoute.js').default,
        require('./forgotPinRoute.js').default,
        require('./setPinRoute.js').default
      ]);
    //});
  }
};