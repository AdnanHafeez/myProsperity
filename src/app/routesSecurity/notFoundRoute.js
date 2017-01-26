import NotFound from '../SecurityNotFound.tsx';
export default {
  path: '*',
  getComponent (nextState, cb) {
    cb(null, NotFound);
  }
};
