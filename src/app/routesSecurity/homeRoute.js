import Home from '../SecurityHome.tsx';

export default {
  path: 'home',
  getComponent (nextState, cb) {
    cb(null, Home);
  }
}