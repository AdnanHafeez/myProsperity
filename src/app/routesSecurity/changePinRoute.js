import CPWP from '../SecurityChangePinWithPin.tsx';

export default {
  path: 'changepin',
  getComponent (nextState, cb) {
    cb(null, CPWP);
  }
};
