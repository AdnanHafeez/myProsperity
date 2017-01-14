import Assessment from '../Assessment2.tsx';

export default {
  path: 'assessment',
  getComponent (nextState, cb) {
    cb(null, Assessment);
  }
};
