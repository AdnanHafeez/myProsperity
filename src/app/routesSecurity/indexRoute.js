import Home from '../SecurityHome.tsx';

export default {
  path: '/',
  getComponent (nextState, cb) {
    cb(null, Home);
  }
}