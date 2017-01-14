import PTSComponent from '../Library.tsx';

export default {
  path: 'library',
  name: 'library',
  getComponent (nextState, cb) {
    cb(null, PTSComponent);
  }
};
