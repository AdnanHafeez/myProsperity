import ResourcesComponent from '../Resources.tsx';

export default {
  path: 'resources',
  name: 'resources',
  getComponent (nextState, cb) {
    cb(null, ResourcesComponent);
  }
};
