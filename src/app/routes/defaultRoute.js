import SecurityHome from '../SecurityHome.tsx';

export default {
  path: '/',
  name: 'default',

  getComponent (nextState, cb) {
    cb(null, SecurityHome);
  }
};
