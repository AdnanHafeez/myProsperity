import * as Intro from '../Intro.tsx';

export default {
  path: 'intro',
  name: 'intro',
  getComponent (nextState, cb) {
    cb(null, Intro);
  }
};
