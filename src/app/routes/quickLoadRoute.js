import MainContainer from '../MainContainer';
export default {
  getComponent (nextState, cb) {
    console.log('quick Load comp called');
    cb(null, MainContainer);
  },

  getChildRoutes (partialNextState, cb) {
    cb(null, [
      require('./introRoute.js').default,
      require('./defaultRoute.js').default,
      require('./splashRoute.js').default
    ]);
  }
};
