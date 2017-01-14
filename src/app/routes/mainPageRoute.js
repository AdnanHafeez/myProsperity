
import Main from '../Main.tsx';

export default {
  path: 'main',
  getComponent (nextState, cb) {
    cb(null, Main);
  },
  name: 'main',
  getChildRoutes (partialNextState, cb) {
    require.ensure([], function (require) {
      cb(null, [
        require('./homeRoute.js').default,
        require('./videosRoute.js').default,
        require('./resourcesRoute.js').default,
        require('./videoRoute.js').default,
        require('./libraryRoute.js').default,
        require('./assessmentRoute.js').default,
        require('./debugRoute.js').default,
        require('./assessmentResultRoute.js').default
      ]);
    });
  }
};
