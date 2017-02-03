import NotFound from '../SecurityNotFound.tsx';
console.log(NotFound);
export default {
  path: '*',
  getComponent (nextState, cb) {
    cb(null, NotFound);
  }
};
