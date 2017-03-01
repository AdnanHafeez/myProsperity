import PinRecovery from '../SecurityPinRecoveryContainer.tsx';
export default {
  path: 'forgotpin',
  getComponent (nextState, cb) {
    cb(null, PinRecovery);
  }
};
