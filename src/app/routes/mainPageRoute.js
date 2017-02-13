
import Main from '../Main.tsx';

export default {
  path: 'main',
  getComponent (nextState, cb) {
    cb(null, Main);
  },
  name: 'main',
  getChildRoutes (partialNextState, cb) {

    cb(null, [
      require('./forgotPinRoute.js').default,
      require('./setPinRoute.js').default,
      require('./changePinRoute.js').default,
      require('./changeQuestionsRoute.js').default,

      require('./introRoute.js').default,
      require('./homeRoute.js').default,
      require('./directorMessageRoute.js').default,
      require('./workbookRoute.js').default,
      require('./notesRoute.js').default,
      require('./debugRoute.js').default
    ]);
  }
};
