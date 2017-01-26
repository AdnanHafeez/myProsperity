import Main from '../MainSecurityContainer.ts';
export default {
  getComponent (nextState, cb) {
    console.log('quick Load comp called');
    cb(null, Main);
  },

  getChildRoutes (partialNextState, cb) {
    cb(null, [
      require('./indexRoute.js').default,
    ]);
  }
};
